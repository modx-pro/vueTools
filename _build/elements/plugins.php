<?php
/**
 * VueTools plugins
 *
 * @package VueTools
 */

return [
    'VueCoreManager' => [
        'file' => 'vuecoremanager',
        'description' => 'Registers Vue Import Map on manager pages',
        'events' => [
            'OnManagerPageBeforeRender' => [],
        ],
    ],
];
