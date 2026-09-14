<?php
/**
 * VueTools plugins
 *
 * @package VueTools
 */

return [
    'VueCoreManager' => [
        'file' => 'vuecoremanager',
        'description' => 'Registers Vue Import Map and window.VueTools theme on manager pages',
        'events' => [
            'OnManagerPageBeforeRender' => [],
        ],
    ],
];
