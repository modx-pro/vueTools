<?php
/**
 * modxpro-vue-core build config
 *
 * @package ModxProVueCore
 */

$config = [
    'name' => 'ModxProVueCore',
    'name_lower' => 'modxprovuecore',
    'version' => '1.0.0',
    'release' => 'alpha1',
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
