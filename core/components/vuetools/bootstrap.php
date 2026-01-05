<?php
/**
 * VueTools bootstrap
 *
 * @var \MODX\Revolution\modX $modx
 * @var array $namespace
 */

// Register autoloader for VueTools namespace
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

$modx->services->add('vuetools', function ($c) use ($modx, $namespace) {
    return new \VueTools\VueCore($modx, $namespace);
});
