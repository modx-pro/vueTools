# VueTools - Руководство разработчика

## Обзор

**VueTools** — это базовый пакет, предоставляющий Vue 3 стек для MODX 3.x компонентов через ES Modules Import Map. Позволяет нескольким компонентам использовать общие библиотеки без дублирования кода.

### Состав пакета

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| Vue 3 | 3.5.x | Реактивный фреймворк |
| Pinia | 3.0.x | State management |
| PrimeVue | 4.3.x | UI компоненты |
| PrimeIcons | 7.0.x | Иконки |

### Composables (хелперы)

| Модуль | Назначение |
|--------|------------|
| `useLexicon` | Работа с лексиконами MODX |
| `useApi` | HTTP клиент для стандартного MODX API |
| `useModx` | Доступ к глобальному объекту MODx |
| `usePermission` | Проверка прав пользователя |

---

## Архитектура

### Import Map

VueTools регистрирует Import Map в `<head>` страницы менеджера MODX:

```json
{
  "imports": {
    "vue": "/assets/components/vuetools/vendor/vue.min.js",
    "pinia": "/assets/components/vuetools/vendor/pinia.min.js",
    "primevue": "/assets/components/vuetools/vendor/primevue.min.js",
    "@vuetools/useApi": "/assets/components/vuetools/composables/useApi.min.js",
    "@vuetools/useLexicon": "/assets/components/vuetools/composables/useLexicon.min.js",
    "@vuetools/useModx": "/assets/components/vuetools/composables/useModx.min.js",
    "@vuetools/usePermission": "/assets/components/vuetools/composables/usePermission.min.js"
  }
}
```

### Как это работает

1. Плагин `VueCoreManager` срабатывает на событие `OnManagerPageInit`
2. Регистрирует Import Map в начале `<head>` (до любых ES modules)
3. Подключает CSS стили PrimeVue (изолированы классом `.vueApp`)
4. Ваш компонент загружает свои ES modules, которые импортируют из Import Map

---

## Интеграция в компонент (на примере MiniShop3)

### Шаг 1: Настройка Vite

В `vite.config.js` укажите внешние зависимости:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prefixSelector from 'postcss-prefix-selector'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      // Эти модули НЕ бандлятся - берутся из Import Map
      external: [
        'vue',
        'pinia',
        'primevue',
        '@vuetools/useApi',
        '@vuetools/useLexicon',
        '@vuetools/useModx',
        '@vuetools/usePermission'
      ],
      output: {
        format: 'es',
        entryFileNames: '[name].min.js',
        chunkFileNames: '[name].min.js'
      }
    }
  },
  // Изоляция стилей от ExtJS
  css: {
    postcss: {
      plugins: [
        prefixSelector({
          prefix: '.vueApp',
          exclude: [/^:root/, /^\.p-/, /^\.pi/, /^\[data-p-/]
        })
      ]
    }
  }
})
```

**Ключевой момент:** Массив `external` указывает Vite НЕ включать эти зависимости в бандл. Браузер загрузит их из Import Map.

### Шаг 2: Загрузка скриптов в PHP контроллере

```php
<?php
class MyComponentManagerController extends modExtraManagerController
{
    public function loadCustomCssJs()
    {
        $assetsUrl = $this->myComponent->config['assetsUrl'];

        // CSS вашего компонента (идёт в <head>)
        $this->addCss($assetsUrl . 'css/mgr/vue-dist/my-widget.min.css');

        // ВАЖНО: ES modules ОБЯЗАТЕЛЬНО через regClientStartupHTMLBlock!
        // Это гарантирует загрузку ПОСЛЕ Import Map
        $this->modx->regClientStartupHTMLBlock(
            '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/my-widget.min.js"></script>'
        );
    }
}
```

**Критично:**
- Используйте `regClientStartupHTMLBlock()` для `<script type="module">`
- **НЕ** используйте `addJavascript()` или `addLastJavascript()` для ES modules
- Каждый скрипт добавляйте **отдельным** вызовом (не объединяйте в одну строку с переносами)

```php
// ✅ ПРАВИЛЬНО - отдельные вызовы
$this->modx->regClientStartupHTMLBlock('<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget1.min.js"></script>');
$this->modx->regClientStartupHTMLBlock('<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget2.min.js"></script>');

// ❌ НЕПРАВИЛЬНО - multiline строка с несколькими тегами
$this->modx->regClientStartupHTMLBlock('
    <script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget1.min.js"></script>
    <script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget2.min.js"></script>
');
```

### Шаг 3: Использование в Vue компонентах

```vue
<script setup>
// Vue импортируется из Import Map (не бандлится)
import { ref, computed, onMounted } from 'vue'

// Pinia из Import Map
import { createPinia } from 'pinia'

// PrimeVue компоненты из Import Map
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// Composables из VueTools
import { useLexicon } from '@vuetools/useLexicon'
import { useModx } from '@vuetools/useModx'
import { usePermission } from '@vuetools/usePermission'

const { _ } = useLexicon()
const { modx, config } = useModx()
const { hasPermission } = usePermission()

// Ваш код компонента
const items = ref([])
const canEdit = computed(() => hasPermission('my_component_edit'))
</script>

<template>
  <div class="my-component">
    <h1>{{ _('my_component_title') }}</h1>

    <Button
      v-if="canEdit"
      :label="_('my_component_add')"
      icon="pi pi-plus"
    />

    <DataTable :value="items">
      <Column field="name" :header="_('my_component_name')" />
    </DataTable>
  </div>
</template>
```

---

## API Composables

### useLexicon

Работа с лексиконами MODX.

```javascript
import { useLexicon } from '@vuetools/useLexicon'

const { _, has, getByPrefix } = useLexicon()

// Получить значение лексикона
const title = _('my_key')

// С параметрами подстановки
const message = _('my_key_with_params', { name: 'John', count: 5 })

// Проверить существование ключа
if (has('my_key')) { ... }

// Получить все ключи с префиксом
const allMyKeys = getByPrefix('my_component_')
```

**Важно:** Лексиконы ищутся в `window.MODx.lang`. Загрузите топик в контроллере:

```php
public function getLanguageTopics()
{
    return ['mycomponent:default', 'mycomponent:manager'];
}
```

### useModx

Доступ к глобальному объекту MODX.

```javascript
import { useModx } from '@vuetools/useModx'

const { modx, config, siteId } = useModx()

// Доступ к конфигурации
const assetsUrl = config.assets_url
const connectorUrl = config.connector_url

// MODX Site ID для авторизации API
console.log(siteId) // "modx123..."

// Полный объект MODx
modx.msg.alert('Title', 'Message')
```

### usePermission

Проверка прав пользователя.

```javascript
import { usePermission } from '@vuetools/usePermission'

const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()

// Проверить одно право
if (hasPermission('my_component_edit')) { ... }

// Проверить любое из прав
if (hasAnyPermission(['edit', 'save', 'delete'])) { ... }

// Проверить все права
if (hasAllPermissions(['view', 'edit'])) { ... }
```

### useApi (базовый)

HTTP клиент для **стандартного** MODX connector API.

```javascript
import { useApi } from '@vuetools/useApi'

const { get, post, put, delete: del } = useApi()

// GET запрос
const users = await get('security/user/getlist', { limit: 20 })

// POST запрос
const result = await post('security/user/create', {
  username: 'newuser',
  email: 'user@example.com'
})
```

**Примечание:** Этот API клиент работает со стандартным MODX connector форматом (`?action=processor/path`). Если ваш компонент использует собственный роутер, создайте свой `request.js` (см. ниже).

---

## Собственный API клиент (для компонентов с роутером)

MiniShop3 использует собственный роутер через connector.php, поэтому создан локальный `request.js`:

```javascript
// src/request.js
class Request {
  getConnectorUrl() {
    return window.ms3?.config?.connector_url
      || '/assets/components/minishop3/connector.php'
  }

  getModAuthToken() {
    return window.MODx?.siteId || null
  }

  buildUrl(route, params = {}) {
    const url = new URL(this.getConnectorUrl(), window.location.origin)

    // Ваш процессор-роутер
    url.searchParams.set('action', 'MyComponent\\Processors\\Api\\Index')
    url.searchParams.set('route', route)

    const token = this.getModAuthToken()
    if (token) {
      url.searchParams.set('HTTP_MODAUTH', token)
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value != null) url.searchParams.set(key, value)
    })

    return url.toString()
  }

  async request(method, route, data = null) {
    const options = {
      method,
      headers: { 'Accept': 'application/json' },
      credentials: 'same-origin'
    }

    let url
    if (method === 'GET' && data) {
      url = this.buildUrl(route, data)
    } else {
      url = this.buildUrl(route)
      if (data) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
      }
    }

    const response = await fetch(url, options)
    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Request failed')
    }

    return result.object || result.data || result
  }

  get(route, params) { return this.request('GET', route, params) }
  post(route, data) { return this.request('POST', route, data) }
  put(route, data) { return this.request('PUT', route, data) }
  delete(route, data) { return this.request('DELETE', route, data) }
}

export default new Request()
```

Использование:

```javascript
// Вместо useApi из vuetools
import request from '../request.js'

const products = await request.get('/api/products', { limit: 20 })
await request.post('/api/products', { name: 'New Product' })
```

---

## Изоляция стилей

PrimeVue стили изолированы с префиксом `.vueApp`. Все контейнеры Vue виджетов должны иметь этот класс:

```html
<!-- В ExtJS панели или HTML -->
<div id="my-vue-app" class="vueApp"></div>
```

```javascript
// Entry point
import { createApp } from 'vue'
import MyApp from './components/MyApp.vue'

const app = createApp(MyApp)
app.mount('#my-vue-app')
```

---

## Полный пример Entry Point

```javascript
// src/entries/my-widget.js
import '../scss/primevue.scss';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import MyWidget from '../components/MyWidget.vue'

let appInstance = null

function createVueApp(props = {}) {
  const app = createApp(MyWidget, props)

  app.use(createPinia())

  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: 'none'
      }
    }
  })

  app.use(ToastService)
  app.use(ConfirmationService)

  return app
}

export function init(selector = '#my-vue-widget', props = {}) {
  const el = document.querySelector(selector)

  if (!el) {
    console.warn(`[MyWidget] Element ${selector} not found`)
    return null
  }

  if (el.dataset.vApp === 'true') {
    return appInstance // Already mounted
  }

  appInstance = createVueApp(props)
  appInstance.mount(selector)
  el.dataset.vApp = 'true'

  return appInstance
}

export function destroy() {
  if (appInstance) {
    appInstance.unmount()
    appInstance = null
  }
}

// Export for global access (для вызова из ExtJS)
window.MyComponentWidget = { init, destroy }
```

---

## Интеграция в ExtJS вкладку

```javascript
// В ExtJS панели
{
  title: _('my_tab_title'),
  id: 'my-vue-tab',
  html: '<div id="my-vue-widget" class="vueApp"></div>',
  listeners: {
    activate: function() {
      // Инициализация при активации вкладки
      if (window.MyComponentWidget && !document.querySelector('#my-vue-widget[data-v-app="true"]')) {
        window.MyComponentWidget.init('#my-vue-widget', {
          someId: config.record.id
        })
      }
    }
  }
}
```

---

## Проверка наличия VueTools

При отсутствии VueTools на сайте Vue модули не загрузятся, а в консоли появятся ошибки. Для улучшения UX рекомендуется реализовать проверку наличия зависимости и показывать понятное сообщение пользователю.

### Принцип работы

VueTools регистрирует `<script type="importmap">` с ключом `vue`. Проверка ищет этот Import Map и, если он отсутствует:

1. Удаляет все Vue module скрипты (предотвращает ошибки в консоли)
2. Показывает MODX алерт с сообщением об установке зависимости
3. Устанавливает глобальный флаг `window.MY_COMPONENT_VUE_CORE_MISSING = true`

### Реализация в PHP контроллере

Создайте метод `addVueModule()` в базовом контроллере вашего компонента:

```php
<?php
class MyComponentManagerController extends modExtraManagerController
{
    /**
     * Флаг регистрации скрипта проверки (один раз на страницу)
     */
    protected static $vueCoreCheckRegistered = false;

    /**
     * Регистрация Vue ES module с проверкой зависимости VueTools
     *
     * @param string $src URL скрипта модуля
     * @return void
     */
    public function addVueModule($src)
    {
        // Регистрируем скрипт проверки только один раз на страницу
        if (!self::$vueCoreCheckRegistered) {
            $this->registerVueCoreCheck();
            self::$vueCoreCheckRegistered = true;
        }

        // Добавляем версию для сброса кэша (опционально)
        $src = $src . '?v=' . $this->myComponent->version;

        // Регистрируем модуль с атрибутом data-vue-module
        // Этот атрибут используется для удаления скриптов при отсутствии VueCore
        $this->modx->regClientStartupHTMLBlock(
            '<script type="module" data-vue-module src="' . $src . '"></script>'
        );
    }

    /**
     * Регистрация inline скрипта проверки Import Map
     * Если VueTools не установлен — показывает MODX алерт
     */
    protected function registerVueCoreCheck()
    {
        // Используйте лексиконы вашего компонента
        $alertTitle = $this->modx->lexicon('mycomponent_error') ?: 'Error';
        $alertMessage = $this->modx->lexicon('mycomponent_vuetools_required')
            ?: 'VueTools package is required. Please install it from Package Manager.';

        $script = <<<JS
<script>
(function() {
    // Ищем Import Map с ключом vue
    var importMap = document.querySelector('script[type="importmap"]');
    var hasVueCore = false;

    if (importMap) {
        try {
            var mapContent = JSON.parse(importMap.textContent);
            hasVueCore = mapContent.imports && mapContent.imports.vue;
        } catch (e) {
            hasVueCore = false;
        }
    }

    // Если VueCore не найден — удаляем Vue модули и показываем алерт
    if (!hasVueCore) {
        // Удаляем все скрипты с атрибутом data-vue-module
        document.querySelectorAll('script[type="module"][data-vue-module]').forEach(function(el) {
            el.remove();
        });

        // Показываем MODX алерт (ждём загрузки ExtJS)
        if (typeof Ext !== 'undefined') {
            Ext.onReady(function() {
                if (typeof MODx !== 'undefined' && MODx.msg) {
                    MODx.msg.alert('{$alertTitle}', '{$alertMessage}');
                } else {
                    alert('{$alertMessage}');
                }
            });
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                    if (typeof MODx !== 'undefined' && MODx.msg) {
                        MODx.msg.alert('{$alertTitle}', '{$alertMessage}');
                    } else {
                        alert('{$alertMessage}');
                    }
                }, 500);
            });
        }

        // Глобальный флаг для использования в других скриптах
        window.MY_COMPONENT_VUE_CORE_MISSING = true;
    }
})();
</script>
JS;

        $this->modx->regClientStartupHTMLBlock($script);
    }
}
```

### Использование

Вместо прямого вызова `regClientStartupHTMLBlock()` используйте новый метод:

```php
public function loadCustomCssJs()
{
    $assetsUrl = $this->myComponent->config['assetsUrl'];

    // CSS (как обычно)
    $this->addCss($assetsUrl . 'css/mgr/vue-dist/my-widget.min.css');

    // ✅ ПРАВИЛЬНО — с проверкой зависимости
    $this->addVueModule($assetsUrl . 'js/mgr/vue-dist/my-widget.min.js');
    $this->addVueModule($assetsUrl . 'js/mgr/vue-dist/another-widget.min.js');

    // ❌ НЕПРАВИЛЬНО — без проверки, ошибки в консоли если VueCore не установлен
    // $this->modx->regClientStartupHTMLBlock(
    //     '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/my-widget.min.js"></script>'
    // );
}
```

### Лексиконы

Добавьте лексиконы для сообщения об ошибке:

```php
// lexicon/ru/default.inc.php
$_lang['mycomponent_error'] = 'Ошибка';
$_lang['mycomponent_vuetools_required'] = 'Для работы MyComponent требуется пакет VueTools. Установите его через Менеджер пакетов.';

// lexicon/en/default.inc.php
$_lang['mycomponent_error'] = 'Error';
$_lang['mycomponent_vuetools_required'] = 'VueTools package is required for MyComponent. Please install it via Package Manager.';
```

### Результат

| Без проверки | С проверкой |
|--------------|-------------|
| Ошибки `Failed to resolve module specifier "vue"` в консоли | Чистая консоль |
| Vue виджеты не работают, пустые контейнеры | Понятный MODX алерт с инструкцией |
| Пользователь не понимает проблему | Пользователь знает что делать |

### Проверка в JavaScript

При необходимости можно проверить флаг в клиентском коде:

```javascript
// В ExtJS панели или другом скрипте
if (window.MY_COMPONENT_VUE_CORE_MISSING) {
    // Скрыть вкладки с Vue виджетами или показать заглушку
    Ext.getCmp('my-vue-tab').hide();
}
```

---

## Чеклист интеграции

- [ ] Добавить `vuetools` в зависимости пакета (setup options)
- [ ] Настроить `external` в vite.config.js
- [ ] Настроить postcss prefix selector для изоляции стилей
- [ ] **Реализовать `addVueModule()` с проверкой зависимости** (см. раздел выше)
- [ ] Добавить лексиконы для сообщения об ошибке (`_error`, `_vuetools_required`)
- [ ] Использовать `addVueModule()` вместо `regClientStartupHTMLBlock()` для ES modules
- [ ] Добавить `class="vueApp"` к контейнерам Vue
- [ ] Загрузить топики лексиконов в контроллере
- [ ] Создать локальный `request.js` если используете собственный роутер

---

## Примеры компонентов

- **MiniShop3** — полная интеграция с собственным роутером
- Репозиторий: https://github.com/modx-pro/MiniShop3

---

## Поддержка

- GitHub Issues: https://github.com/modx-pro/vuetools/issues
