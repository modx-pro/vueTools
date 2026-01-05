<?php
/**
 * VueTools Build Script
 *
 * Builds a transport package for MODX Revolution 3.x
 *
 * @package VueTools
 */

set_time_limit(0);
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load config
$config = include __DIR__ . '/config.inc.php';

// Define package constants
define('PKG_NAME', $config['name']);
define('PKG_NAME_LOWER', $config['name_lower']);
define('PKG_VERSION', $config['version']);
define('PKG_RELEASE', $config['release']);

// Define paths
$root = dirname(__DIR__) . '/';
$sources = [
    'root' => $root,
    'build' => $root . '_build/',
    'elements' => $root . '_build/elements/',
    'resolvers' => $root . '_build/resolvers/',
    'source_core' => $root . 'core/components/' . PKG_NAME_LOWER . '/',
    'source_assets' => $root . 'assets/components/' . PKG_NAME_LOWER . '/',
];

// Check if running from CLI or browser
$isCli = php_sapi_name() === 'cli';

// Helper function for output
function out($message) {
    global $isCli;
    echo $message . ($isCli ? "\n" : "<br>\n");
    flush();
}

out('=== Building ' . PKG_NAME . ' ' . PKG_VERSION . '-' . PKG_RELEASE . ' ===');
out('');

// Try to find MODX
$modxPath = null;
$possiblePaths = [
    dirname(dirname(dirname(__DIR__))) . '/', // If build script is in modx/core/components/pkg/_build/
    'D:/laragon/www/ms3/',                     // Local dev path
    '/var/www/modx/',                          // Linux server
];

foreach ($possiblePaths as $path) {
    if (file_exists($path . 'config.core.php')) {
        $modxPath = $path;
        break;
    }
}

if (!$modxPath) {
    out('ERROR: Could not find MODX installation.');
    out('Please run this script from within a MODX installation,');
    out('or create config.core.php in the build directory pointing to MODX.');

    // Check for local config
    if (file_exists(__DIR__ . '/config.core.php')) {
        include __DIR__ . '/config.core.php';
        $modxPath = MODX_CORE_PATH . '../';
    } else {
        exit(1);
    }
}

out('MODX path: ' . $modxPath);

// Load MODX
require_once $modxPath . 'config.core.php';
require_once MODX_CORE_PATH . 'vendor/autoload.php';

use MODX\Revolution\modX;
use MODX\Revolution\Transport\modPackageBuilder;
use xPDO\Transport\xPDOTransport;
use xPDO\Transport\xPDOFileVehicle;

// Initialize MODX
$modx = new modX();
$modx->initialize('mgr');
$modx->setLogLevel(modX::LOG_LEVEL_INFO);
$modx->setLogTarget('ECHO');

out('MODX initialized: ' . $modx->version['full_version']);
out('');

// Create package builder
$builder = new modPackageBuilder($modx);
$builder->createPackage(PKG_NAME_LOWER, PKG_VERSION, PKG_RELEASE);
$builder->registerNamespace(PKG_NAME_LOWER, false, true, '{core_path}components/' . PKG_NAME_LOWER . '/');

out('Package created');

// === Add core files ===
out('Adding core files...');

$vehicle = $builder->createVehicle([
    'source' => $sources['source_core'],
    'target' => "return MODX_CORE_PATH . 'components/';",
], [
    'vehicle_class' => xPDOFileVehicle::class,
    xPDOTransport::ABORT_INSTALL_ON_VEHICLE_FAIL => true,
]);
$builder->putVehicle($vehicle);

// === Add assets files ===
out('Adding assets files...');

$vehicle = $builder->createVehicle([
    'source' => $sources['source_assets'],
    'target' => "return MODX_ASSETS_PATH . 'components/';",
], [
    'vehicle_class' => xPDOFileVehicle::class,
    xPDOTransport::ABORT_INSTALL_ON_VEHICLE_FAIL => true,
]);
$builder->putVehicle($vehicle);

// === Add plugins ===
out('Adding plugins...');

$plugins = include $sources['elements'] . 'plugins.php';

foreach ($plugins as $name => $data) {
    $pluginFile = $sources['source_core'] . 'elements/plugins/' . $data['file'] . '.php';

    if (!file_exists($pluginFile)) {
        out("  WARNING: Plugin file not found: {$pluginFile}");
        continue;
    }

    // Read plugin code and strip <?php tag
    $pluginCode = trim(file_get_contents($pluginFile));
    if (preg_match('#\<\?php(.*)#is', $pluginCode, $matches)) {
        $pluginCode = rtrim(rtrim(trim($matches[1] ?? ''), '?>'));
    }

    /** @var \MODX\Revolution\modPlugin $plugin */
    $plugin = $modx->newObject(\MODX\Revolution\modPlugin::class);
    $plugin->fromArray([
        'name' => $name,
        'description' => $data['description'] ?? '',
        'plugincode' => $pluginCode,
        'static' => false,
        'category' => 0,
    ], '', true, true);

    // Add plugin events
    $events = [];
    foreach ($data['events'] as $eventName => $eventData) {
        /** @var \MODX\Revolution\modPluginEvent $event */
        $event = $modx->newObject(\MODX\Revolution\modPluginEvent::class);
        $event->fromArray([
            'event' => $eventName,
            'priority' => $eventData['priority'] ?? 0,
            'propertyset' => $eventData['propertyset'] ?? 0,
        ], '', true, true);
        $events[] = $event;
    }

    if (!empty($events)) {
        $plugin->addMany($events);
    }

    $vehicle = $builder->createVehicle($plugin, [
        xPDOTransport::UNIQUE_KEY => 'name',
        xPDOTransport::PRESERVE_KEYS => false,
        xPDOTransport::UPDATE_OBJECT => true,
        xPDOTransport::RELATED_OBJECTS => true,
        xPDOTransport::RELATED_OBJECT_ATTRIBUTES => [
            'PluginEvents' => [
                xPDOTransport::PRESERVE_KEYS => true,
                xPDOTransport::UPDATE_OBJECT => true,
                xPDOTransport::UNIQUE_KEY => ['pluginid', 'event'],
            ],
        ],
    ]);
    $builder->putVehicle($vehicle);

    out("    Events: " . implode(', ', array_keys($data['events'])));

    out("  Added plugin: {$name}");
}

// Note: OnManagerPageInit is a standard MODX event, no need to create it

// === Add resolvers ===
out('Adding resolvers...');

$resolversPath = $sources['resolvers'];
if (is_dir($resolversPath)) {
    $resolverFiles = glob($resolversPath . 'resolver_*.php');
    sort($resolverFiles);

    foreach ($resolverFiles as $resolverFile) {
        $resolverName = basename($resolverFile);
        $vehicle->resolve('php', [
            'source' => $resolverFile,
        ]);
        out("  Added resolver: {$resolverName}");
    }
}

// === Set package attributes ===
out('Setting package attributes...');

$docsPath = $sources['source_core'] . 'docs/';
$builder->setPackageAttributes([
    'license' => file_exists($docsPath . 'license.txt') ? file_get_contents($docsPath . 'license.txt') : '',
    'readme' => file_exists($docsPath . 'readme.txt') ? file_get_contents($docsPath . 'readme.txt') : '',
    'changelog' => file_exists($docsPath . 'changelog.txt') ? file_get_contents($docsPath . 'changelog.txt') : '',
]);

// === Build package ===
out('');
out('Building package...');

$builder->pack();

$packageFile = $modx->getOption('core_path') . 'packages/' . PKG_NAME_LOWER . '-' . PKG_VERSION . '-' . PKG_RELEASE . '.transport.zip';

if (file_exists($packageFile)) {
    $size = round(filesize($packageFile) / 1024 / 1024, 2);
    out('');
    out('=== SUCCESS ===');
    out("Package built: {$packageFile}");
    out("Size: {$size} MB");
} else {
    out('');
    out('=== WARNING ===');
    out('Package file not found at expected location.');
    out('Check MODX packages directory.');
}

out('');
out('Build completed!');
