<?php
/**
 * modxpro-vue-core plugins
 *
 * @package ModxProVueCore
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
