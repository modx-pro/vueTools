<?php
/**
 * ModxProVueCore bootstrap
 *
 * @var \MODX\Revolution\modX $modx
 * @var array $namespace
 */

// Register autoloader for ModxProVueCore namespace
spl_autoload_register(function ($class) {
    $prefix = 'ModxProVueCore\\';
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

$modx->services->add('modxprovuecore', function ($c) use ($modx, $namespace) {
    return new \ModxProVueCore\VueCore($modx, $namespace);
});
