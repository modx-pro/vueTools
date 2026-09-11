<?php
/**
 * VueTools Service
 *
 * MODX 3 getService('vueTools', 'VueTools\Service', …) entry.
 * Empty VueCore subclass so extras can use `instanceof \VueTools\Service`.
 *
 * bootstrap.php creates one instance and shares it under `vuetools` and
 * `vueTools` (#11). Prefer the container; do not `new Service` in extras.
 *
 * File path is model/vuetools/ for xPDO. Package autoload only maps
 * VueTools\* → src/, so VueCore is required below.
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
