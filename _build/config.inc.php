<?php
/**
 * VueTools build config
 *
 * @package VueTools
 */

$config = [
    'name' => 'VueTools',
    'name_lower' => 'vuetools',
    'version' => '1.2.1',
    'release' => 'pl',
    'author' => 'Nikolay Savin',
    'telegram' => 'biz87',

    'description' => 'Vue core stack for MODX components (Vue, Pinia, PrimeVue)',

    // System settings live in _build/elements/settings.php (packaged by build.php)

    // Menus
    'menus' => [],

    // Events for plugins
    'events' => [
        'OnManagerPageInit',
    ],
];

return $config;
