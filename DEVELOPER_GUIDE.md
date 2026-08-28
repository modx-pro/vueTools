# VueTools: руководство разработчика

## Обзор

VueTools отдаёт стек Vue 3 для компонентов MODX 3.x через ES Modules Import Map. Несколько extras берут одни и те же библиотеки и не копируют их в свой бандл.

### Состав пакета

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| Vue 3 | 3.5.x | Реактивный фреймворк |
| Pinia | 3.0.x | State management |
| PrimeVue | 4.5.x | UI-компоненты (`Modx` и `Aura`) |
| PrimeIcons | 7.0.x | Иконки |

### Composables

| Модуль | Назначение |
|--------|------------|
| `useLexicon` | Лексиконы MODX |
| `useApi` | HTTP-клиент к стандартному connector API MODX |
| `useModx` | Глобальный объект `MODx` |
| `usePermission` | Проверка прав пользователя |
| `usePrimeVueLocale` | Локали PrimeVue для DataTable, DatePicker, Calendar (`de`, `en`, `es`, `fr`, `pl`, `ru`, `uk`) |

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
    "vuetools": "/assets/components/vuetools/vendor/primevue.min.js",
    "vuetools/theme": "/assets/components/vuetools/vendor/primevue.min.js",
    "@vuetools/useApi": "/assets/components/vuetools/composables/useApi.min.js",
    "@vuetools/useLexicon": "/assets/components/vuetools/composables/useLexicon.min.js",
    "@vuetools/useModx": "/assets/components/vuetools/composables/useModx.min.js",
    "@vuetools/usePermission": "/assets/components/vuetools/composables/usePermission.min.js",
    "@vuetools/usePrimeVueLocale": "/assets/components/vuetools/composables/usePrimeVueLocale.min.js"
  }
}
```

Алиасы `vuetools` и `vuetools/theme` ведут на тот же файл, что и `primevue`. Из них доступны named exports `Modx`, `ModxManagerTheme`, `ModxTheme` и остальной API PrimeVue.

### Как это работает

1. Плагин `VueCoreManager` срабатывает на `OnManagerPageInit`
2. Регистрирует Import Map в начале `<head>` (до любых ES modules)
3. Подключает CSS PrimeVue (изоляция через класс `.vueApp`)
4. Ваш компонент грузит свои ES modules и импортирует зависимости из Import Map

---

## Локализация PrimeVue

По умолчанию PrimeVue пишет подписи по-английски: фильтры DataTable («Starts with», «Contains», «Clear»), кнопки и заголовки DatePicker/Calendar («Today», месяцы, дни недели) и так далее.

VueTools кладёт готовые локали и хелпер, который подставляет язык менеджера:

```javascript
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale'
import { PrimeVue, ModxManagerTheme } from 'primevue'

// Локаль по текущему языку менеджера (MODx.cultureKey)
const locale = getPrimeVueLocale()
app.use(PrimeVue, { theme: ModxManagerTheme, locale })
```

Явно указать язык:

```javascript
const locale = getPrimeVueLocale('ru')
```

Коды: `de`, `en`, `es`, `fr`, `pl`, `ru`, `uk`. Неизвестный код даёт английскую локаль. Источник: [primelocale](https://github.com/primefaces/primelocale). Другой язык можно добавить в `usePrimeVueLocale.js` импортом из `primelocale/js/<код>.js`.

---

## Modx theme (PrimeVue 4)

Preset `Modx` повторяет менеджер MODX Revolution 3 в PrimeVue 4. База Nora (компактный прямоугольный preset), не Aura. Цвета и размеры из Sass менеджера: `$colorSplash: #234368`, radius 3px, body 13px.

### Импорт

```javascript
import { PrimeVue, Modx, ModxManagerTheme, ModxTheme, Button } from 'primevue'
// или
import { Modx, ModxManagerTheme } from 'vuetools/theme'
```

`Aura` по-прежнему экспортируется из `primevue`. Extras с `external: ['primevue']` менять не нужно: `Modx` лежит в том же `primevue.min.js`.

### Подключение в менеджере

У менеджера нет тёмной темы, ExtJS остаётся светлым. Если оставить `darkModeSelector: 'system'`, потемнеют только Vue-виджеты. Берите готовый хелпер:

```javascript
app.use(PrimeVue, {
  theme: ModxManagerTheme, // { preset: Modx, options: { darkModeSelector: 'none' } }
  locale: getPrimeVueLocale()
})
```

### Light / dark вне менеджера

Для showcase и отдельных приложений:

```javascript
app.use(PrimeVue, { theme: ModxTheme, locale: getPrimeVueLocale() })
// тёмный режим: class="p-dark" на предке (например .vueApp.p-dark)
```

### Кнопки менеджера

| Действие | Severity | Визуал |
|----------|----------|--------|
| Save / Create | `success` | зелёный `$green` `#6CB24A` |
| Toolbar / Cancel | `secondary` | белый + 1px border |
| Primary focus / selection | default (без severity) | splash navy `#234368` |

`semantic.primary` остаётся navy (focus ring, selected, tabs, checkbox). Зелёный Save только через `severity="success"`.

### Три яруса токенов

| Файл | Что править |
|------|-------------|
| `src/theme/modx/primitive.js` | Палитра, radius |
| `src/theme/modx/semantic.js` + `dark.js` | primary / surface / form / overlay; в dark только `colorScheme.dark` |
| `src/theme/modx/components/*.js` | Плотность и вид конкретного компонента |

CSS в `preset.js` или `component.css` пишите только когда токена не хватает (базовый шрифт 13px, стык tab strip). Без `!important`.

### Добавить component file

1. Файл `src/theme/modx/components/foo.js` по форме Nora (`root`, при необходимости `colorScheme`).
2. Экспорт из `src/theme/modx/components.js`.
3. Если отличий от Nora нет, файл не нужен.

### Расширение без форка

```javascript
import { definePreset, Modx } from 'primevue'

const MyExtra = definePreset(Modx, {
  semantic: {
    primary: { 500: '#1a3a5c' }
  }
})
```

### Demo

```bash
npm run demo          # http://localhost:5273
npm run build:demo    # статическая сборка showcase
```

Исходники: `src/demo/`. Конфиг: `vite.config.demo.js` (не перехватывает `npm run build`).

### Отличия от Aura

- База Nora
- Radius 3px, body 13px, высота полей около 32px
- Splash navy `#234368`, плотная таблица и tab strip как в менеджере
- Save = `severity="success"`, toolbar = `severity="secondary"`

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
        '@vuetools/usePermission',
        '@vuetools/usePrimeVueLocale'
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

**Важно:** массив `external` говорит Vite не класть эти пакеты в бандл. Браузер возьмёт их из Import Map.

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

**Важно:**
- Для `<script type="module">` используйте `regClientStartupHTMLBlock()`
- Не используйте `addJavascript()` или `addLastJavascript()` для ES modules
- Каждый скрипт отдельным вызовом (не склеивайте теги в одну multiline-строку)

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

Лексиконы MODX.

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

**Важно:** лексиконы читаются из `window.MODx.lang`. Топик нужно загрузить в контроллере:

```php
public function getLanguageTopics()
{
    return ['mycomponent:default', 'mycomponent:manager'];
}
```

### useModx

Глобальный объект MODX.

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

HTTP-клиент к стандартному connector API MODX.

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

**Примечание:** клиент рассчитан на стандартный connector MODX (`?action=processor/path`). Если у компонента свой роутер, заведите локальный `request.js` (см. ниже).

---

## Собственный API-клиент (свой роутер)

MiniShop3 ходит через свой роутер в connector.php, поэтому там лежит локальный `request.js`:

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

Стили PrimeVue живут под префиксом `.vueApp`. Контейнер Vue-виджета должен иметь этот класс:

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
import { PrimeVue, ModxManagerTheme, ToastService, ConfirmationService } from 'primevue'
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale'

import MyWidget from '../components/MyWidget.vue'

let appInstance = null

function createVueApp(props = {}) {
  const app = createApp(MyWidget, props)

  app.use(createPinia())

  app.use(PrimeVue, {
    theme: ModxManagerTheme,
    locale: getPrimeVueLocale() // русский/английский по MODx.cultureKey
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

Без VueTools Vue-модули не резолвятся, в консоли сыпятся ошибки. Имеет смысл проверить Import Map и показать понятный алерт.

### Принцип работы

VueTools регистрирует `<script type="importmap">` с ключом `vue`. Если карты нет:

1. Удаляет Vue module-скрипты (чтобы не шумела консоль)
2. Показывает MODX-алерт с просьбой установить зависимость
3. Ставит флаг `window.MY_COMPONENT_VUE_CORE_MISSING = true`

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

Вместо прямого `regClientStartupHTMLBlock()` вызывайте `addVueModule()`:

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
| В консоли `Failed to resolve module specifier "vue"` | Консоль чистая |
| Пустые контейнеры Vue | MODX-алерт с инструкцией |
| Неясно, чего не хватает | Понятно, что ставить |

### Проверка в JavaScript

Флаг можно читать из своего кода:

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
- [ ] Настроить `external` в vite.config.js (vue, pinia, primevue, все `@vuetools/*`)
- [ ] Настроить postcss prefix selector для изоляции стилей
- [ ] Реализовать `addVueModule()` с проверкой зависимости (см. раздел выше)
- [ ] Добавить лексиконы ошибки (`_error`, `_vuetools_required`)
- [ ] Для ES modules вызывать `addVueModule()`, а не голый `regClientStartupHTMLBlock()`
- [ ] Добавить `class="vueApp"` на контейнеры Vue
- [ ] Для DataTable / DatePicker / Calendar передать `locale: getPrimeVueLocale()` в `app.use(PrimeVue, { ... })`
- [ ] В менеджере: `ModxManagerTheme` (или `preset: Modx` + `darkModeSelector: 'none'`); Save = `severity="success"`
- [ ] Если импорт идёт из `primevue`, `external` менять не нужно (`Modx` уже в бандле)
- [ ] Загрузить топики лексиконов в контроллере
- [ ] При своём роутере завести локальный `request.js`

---

## Примеры компонентов

- MiniShop3: интеграция со своим роутером, https://github.com/modx-pro/MiniShop3

---

## Поддержка

GitHub Issues: https://github.com/modx-pro/vuetools/issues
