<?php
/**
 * VueTools build config
 *
 * @package VueTools
 */

$config = [
    'name' => 'VueTools',
    'name_lower' => 'vuetools',
    'version' => '1.0.1',
    'release' => 'pl',
    'author' => 'modx.pro',
    'email' => 'support@modx.pro',

    'description' => 'Vue core stack for MODX components (Vue, Pinia, PrimeVue)',

    // System settings
    'systemSettings' => [],

    // Menus
    'menus' => [],

    // Events for plugins
    'events' => [
        'OnManagerPageInit',
    ],
];

return $config;
