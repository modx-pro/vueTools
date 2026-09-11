<?php
/**
 * VueCoreManager Plugin
 *
 * Registers Import Map + window.VueTools = { theme } and includes CSS on
 * manager page load. Theme comes from system setting vuetools.theme.
 *
 * Events: OnManagerPageBeforeRender
 *
 * @var \MODX\Revolution\modX $modx
 * @var array $scriptProperties
 *
 * @package VueTools
 */

switch ($modx->event->name) {
    case 'OnManagerPageBeforeRender':
        // Get VueCore service
        if (!$modx->services->has('vuetools')) {
            $modx->log(modX::LOG_LEVEL_ERROR, '[VueCoreManager] Service not registered');
            break;
        }

        /** @var \VueTools\VueCore $vueCore */
        $vueCore = $modx->services->get('vuetools');

        $vueCore->include();

        break;
}
