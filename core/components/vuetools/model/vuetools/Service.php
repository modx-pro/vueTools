<?php
/**
 * VueTools Service
 *
 * Entry point for MODX service container. Extends VueCore so that
 * getService('vuetools') / $modx->services->get('vuetools') resolve correctly.
 *
 * @package VueTools
 */

namespace VueTools;

// VueCore lives in src/; ensure it is loadable when this file is loaded from model/
if (!class_exists(VueCore::class, false)) {
    require_once dirname(__DIR__, 2) . '/src/VueCore.php';
}

class Service extends VueCore
{
}
