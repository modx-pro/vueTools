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
    public const VERSION = '1.0.0-beta1';

    protected modX $modx;
    protected array $namespace;
    protected string $assetsUrl;
    protected bool $importMapRegistered = false;
    protected bool $stylesIncluded = false;

    /**
     * Library versions
     */
    protected array $versions = [
        'vue' => '3.5.13',
        'pinia' => '3.0.1',
        'primevue' => '4.3.1',
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

        $importMap = [
            'imports' => [
                'vue' => $vendorUrl . 'vue.min.js',
                'pinia' => $vendorUrl . 'pinia.min.js',
                'primevue' => $vendorUrl . 'primevue.min.js',
                '@vuetools/useApi' => $composablesUrl . 'useApi.min.js',
                '@vuetools/useLexicon' => $composablesUrl . 'useLexicon.min.js',
                '@vuetools/useModx' => $composablesUrl . 'useModx.min.js',
                '@vuetools/usePermission' => $composablesUrl . 'usePermission.min.js',
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
        $this->modx->regClientCSS($vendorUrl . 'vuetools.css');

        $this->stylesIncluded = true;

        return true;
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
