<?php

namespace VueTools;

use MODX\Revolution\modX;

/**
 * VueCore - Main service class for VueTools
 *
 * Provides Vue stack (Vue, Pinia, PrimeVue) via ES Modules Import Map.
 *
 * @package VueTools
 */
class VueCore
{
    public const VERSION = '1.1.3-pl';

    protected modX $modx;
    protected array $namespace;
    protected string $assetsUrl;
    protected bool $importMapRegistered = false;
    protected bool $stylesIncluded = false;

    /**
     * Library versions
     */
    protected array $versions = [
        'vue' => '3.5.32',
        'pinia' => '3.0.4',
        'primevue' => '4.5.5',
        'primeicons' => '7.0.0',
    ];

    public function __construct(modX $modx, array $namespace = [])
    {
        $this->modx = $modx;
        $this->namespace = $namespace;
        $this->assetsUrl = $modx->getOption(
            'vuetools.assets_url',
            null,
            MODX_ASSETS_URL . 'components/vuetools/'
        );
    }

    /**
     * Register Import Map in page head
     *
     * Should be called once per page load, typically on OnManagerPageInit
     *
     * @return bool True if registered, false if already registered
     */
    public function registerImportMap(): bool
    {
        if ($this->importMapRegistered) {
            return false;
        }

        $vendorUrl = $this->assetsUrl . 'vendor/';
        $composablesUrl = $this->assetsUrl . 'composables/';
        // Bust browser/HTTP cache when vendor or composable assets are rebuilt
        // (import maps without ?v= keep stale primevue.min.js and break new named exports).
        $vueQ = $this->assetQuery('vendor/vue.min.js');
        $piniaQ = $this->assetQuery('vendor/pinia.min.js');
        $primevueQ = $this->assetQuery('vendor/primevue.min.js');
        $useApiQ = $this->assetQuery('composables/useApi.min.js');
        $useLexiconQ = $this->assetQuery('composables/useLexicon.min.js');
        $useModxQ = $this->assetQuery('composables/useModx.min.js');
        $usePermissionQ = $this->assetQuery('composables/usePermission.min.js');
        $useLocaleQ = $this->assetQuery('composables/usePrimeVueLocale.min.js');

        $importMap = [
            'imports' => [
                'vue' => $vendorUrl . 'vue.min.js' . $vueQ,
                'pinia' => $vendorUrl . 'pinia.min.js' . $piniaQ,
                'primevue' => $vendorUrl . 'primevue.min.js' . $primevueQ,
                // Same bundle: the Modx preset ships with the PrimeVue exports
                'vuetools' => $vendorUrl . 'primevue.min.js' . $primevueQ,
                'vuetools/theme' => $vendorUrl . 'primevue.min.js' . $primevueQ,
                '@vuetools/useApi' => $composablesUrl . 'useApi.min.js' . $useApiQ,
                '@vuetools/useLexicon' => $composablesUrl . 'useLexicon.min.js' . $useLexiconQ,
                '@vuetools/useModx' => $composablesUrl . 'useModx.min.js' . $useModxQ,
                '@vuetools/usePermission' => $composablesUrl . 'usePermission.min.js' . $usePermissionQ,
                '@vuetools/usePrimeVueLocale' => $composablesUrl . 'usePrimeVueLocale.min.js' . $useLocaleQ,
                '@vuetools/' => $composablesUrl,
            ]
        ];

        $json = json_encode($importMap, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

        // Insert Import Map at the BEGINNING of controller head html (must be before any ES modules)
        $importMapHtml = '<script type="importmap">' . "\n" . $json . "\n" . '</script>';

        // In manager context, use controller's head array (renders before sjscripts)
        if (isset($this->modx->controller) && isset($this->modx->controller->head['html'])) {
            array_unshift($this->modx->controller->head['html'], $importMapHtml);
        } else {
            // Fallback for non-manager context
            array_unshift($this->modx->sjscripts, $importMapHtml);
        }

        $this->importMapRegistered = true;

        $this->modx->log(modX::LOG_LEVEL_DEBUG, '[VueTools] Import Map registered');

        return true;
    }

    /**
     * Include PrimeVue CSS styles
     *
     * Styles are prefixed with .vueApp for isolation from ExtJS
     *
     * @return bool
     */
    public function includeStyles(): bool
    {
        if ($this->stylesIncluded) {
            return false;
        }

        $vendorUrl = $this->assetsUrl . 'vendor/';

        // VueTools styles (PrimeVue theme + PrimeIcons)
        $this->modx->regClientCSS($vendorUrl . 'vuetools.css' . $this->assetQuery('vendor/vuetools.css'));

        $this->stylesIncluded = true;

        return true;
    }

    /**
     * Cache-bust query for a VueTools asset under assets/components/vuetools/.
     *
     * Uses filemtime when the file is readable, otherwise package VERSION.
     */
    protected function assetQuery(string $relativePath): string
    {
        $relativePath = ltrim(str_replace('\\', '/', $relativePath), '/');
        $candidates = [];

        $assetsPath = (string) $this->modx->getOption('assets_path', null, '');
        if ($assetsPath !== '') {
            $candidates[] = rtrim($assetsPath, '/') . '/components/vuetools/' . $relativePath;
        }
        if (defined('MODX_ASSETS_PATH')) {
            $candidates[] = rtrim(MODX_ASSETS_PATH, '/') . '/components/vuetools/' . $relativePath;
        }

        foreach ($candidates as $path) {
            if (is_file($path)) {
                return '?v=' . (string) filemtime($path);
            }
        }

        return '?v=' . self::VERSION;
    }

    /**
     * Include all Vue core resources (Import Map + CSS)
     *
     * Convenience method to include everything at once
     *
     * @return void
     */
    public function include(): void
    {
        $this->registerImportMap();
        $this->includeStyles();
    }

    /**
     * Check if Import Map is already registered
     *
     * @return bool
     */
    public function isRegistered(): bool
    {
        return $this->importMapRegistered;
    }

    /**
     * Check if styles are already included
     *
     * @return bool
     */
    public function isStylesIncluded(): bool
    {
        return $this->stylesIncluded;
    }

    /**
     * Get library versions
     *
     * @return array
     */
    public function getVersions(): array
    {
        return $this->versions;
    }

    /**
     * Get package version
     *
     * @return string
     */
    public function getVersion(): string
    {
        return self::VERSION;
    }

    /**
     * Get assets URL
     *
     * @return string
     */
    public function getAssetsUrl(): string
    {
        return $this->assetsUrl;
    }
}
