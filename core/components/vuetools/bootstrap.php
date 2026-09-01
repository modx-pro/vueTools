<?php
/**
 * VueTools bootstrap
 *
 * One shared Service under both container keys:
 * - `vuetools` (canonical; VueCoreManager and most extras)
 * - `vueTools` (camelCase from getService / $modx->vueTools)
 *
 * Without the alias, bootstrap and getService each get their own object and
 * separate importMapRegistered / stylesIncluded flags (#11).
 *
 * Autoload maps VueTools\* → src/. Service lives in model/vuetools/ for xPDO
 * getService path loading; that file requires VueCore itself.
 *
 * @var \MODX\Revolution\modX $modx
 * @var array $namespace
 */

// Register autoloader for VueTools namespace (src/ only; Service is model/)
spl_autoload_register(function ($class) {
    $prefix = 'VueTools\\';
    $baseDir = __DIR__ . '/src/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

// Ensure Service is loadable when the factory runs (autoload does not cover model/)
if (!class_exists(\VueTools\Service::class, false)) {
    require_once __DIR__ . '/model/vuetools/Service.php';
}

$modx->services->add('vuetools', function ($c) use ($modx, $namespace) {
    $service = new \VueTools\Service($modx, $namespace);
    // BC for extras that call getService('vueTools') and then check $modx->vueTools
    $modx->vueTools = $service;

    return $service;
});

$modx->services->add('vueTools', function ($c) {
    return $c->get('vuetools');
});
