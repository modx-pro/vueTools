<?php
/**
 * VueCoreManager Plugin
 *
 * Registers Vue Import Map and includes CSS on manager page load.
 *
 * Events: OnManagerPageBeforeRender
 *
 * @var \MODX\Revolution\modX $modx
 * @var array $scriptProperties
 *
 * @package ModxProVueCore
 */

switch ($modx->event->name) {
    case 'OnManagerPageBeforeRender':
        // Get VueCore service
        if (!$modx->services->has('modxprovuecore')) {
            $modx->log(modX::LOG_LEVEL_ERROR, '[VueCoreManager] Service not registered');
            break;
        }

        /** @var \ModxProVueCore\VueCore $vueCore */
        $vueCore = $modx->services->get('modxprovuecore');

        // Register Import Map and include CSS
        $vueCore->include();

        break;
}
