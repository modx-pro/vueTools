# VueTools Public API

Для extras, которые импортируют VueTools. Как модули ведут себя в рантайме, смотрите исходники. Здесь список поверхностей, которые мы обещаем не ломать без major.

Точный перечень ключей и exports: [`public-api.json`](public-api.json). Проверка: `npm run check:public-api`.

Как подключать стек в extra: [`DEVELOPER_GUIDE.md`](../DEVELOPER_GUIDE.md).

---

## Границы

### Public

| Поверхность | Что входит |
|-------------|------------|
| Import Map | Точные ключи из `VueCore::registerImportMap()` (кроме prefix `@vuetools/`) |
| JS modules | Named (и существующие default) exports из vendor barrels и `@vuetools/use*` |
| PHP | Service keys `vuetools` / `vueTools`, класс `\VueTools\Service`, публичные методы `VueCore` |
| Browser | `window.VueTools.theme`, `version`, `hasFeature()`, `checkCompatibility()` |
| Settings | `vuetools.theme` (`aura` \| `modx`) |
| CSS | `.vueApp` (изоляция), `.p-dark` (opt-in dark для `ModxTheme`) |

### Internal (без гарантии BC)

- Prefix Import Map `@vuetools/` (любой файл в `composables/` без точного specifier)
- Barrel `src/composables/index.js` / `index.min.js` и алиасы `*Default`
- Исходники темы `src/theme/modx/**` (токены `primitive`, `semantic`, `dark`, `components`), кроме того, что реэкспортирует vendor barrel
- `THEME_REGISTRY` внутри `useTheme.js`
- Demo (`src/demo/`), Vite/build configs, PHP `protected` методы
- Subpath-импорты `primevue/button`, `primevue/config` и т.п. в extras запрещены

---

## Import Map (public specifiers)

| Specifier | Модуль |
|-----------|--------|
| `vue` | `vendor/vue.min.js` |
| `pinia` | `vendor/pinia.min.js` |
| `primevue` | `vendor/primevue.min.js` |
| `vuetools` | тот же `primevue.min.js` |
| `vuetools/theme` | тот же `primevue.min.js` (сигнал темы с 1.2.0) |
| `@vuetools/useApi` | `composables/useApi.min.js` |
| `@vuetools/useLexicon` | `composables/useLexicon.min.js` |
| `@vuetools/useModx` | `composables/useModx.min.js` |
| `@vuetools/usePermission` | `composables/usePermission.min.js` |
| `@vuetools/usePrimeVueLocale` | `composables/usePrimeVueLocale.min.js` |
| `@vuetools/useTheme` | `composables/useTheme.min.js` |

В extra импортируйте только эти ключи. Prefix `@vuetools/` не входит в контракт.

---

## Naming conventions

| Тип | Правило | Пример |
|-----|---------|--------|
| Composable specifier | `@vuetools/` + имя файла без расширения | `@vuetools/useApi` |
| Composable function | `use` + PascalCase | `useModx` |
| Helper рядом с composable | `get` + PascalCase | `getActiveTheme`, `getPrimeVueLocale` |
| Component / preset | PascalCase named export | `Button`, `Modx`, `PrimeVue` |
| Import style | Named-first | `import { useApi } from '@vuetools/useApi'` |
| PHP service | `vuetools` канон, `vueTools` BC-алиас | `$modx->services->get('vuetools')` |
| Setting | `vuetools.<key>` | `vuetools.theme` |
| Package require | `vuetools` | `'vuetools' => '>=1.2.0'` |

Default export у composable уже есть и остаётся. Новый default не добавляем. Пишите named import.

---

## Правила composables

1. Один public specifier на файл: `@vuetools/useX`.
2. Фабрика `useX(options?)` возвращает plain object с методами/значениями.
3. Реактивные поля (`computed` в `useModx`) документируются как computed. В `<script setup>` читайте `.value`.
4. Helpers `getX` живут в том же модуле и входят в public API, если перечислены в manifest.
5. Stub-методы (`useLexicon.load`) остаются в return, пока не удалены через deprecation → major.
6. Не импортируйте composables через barrel `@vuetools` / `@vuetools/index`.

### Фактические return shapes (1.2.0)

| Модуль | Named exports | Return / helpers |
|--------|---------------|------------------|
| `useApi` | `useApi` (+ default) | `{ request, get, post, put, delete, buildUrl }` |
| `useLexicon` | `useLexicon` (+ default) | `{ _, has, getByPrefix, load }` |
| `useModx` | `useModx` (+ default) | `{ config, user, siteId, hasPermission, getManagerUrl, getAssetsUrl, getConnectorUrl, getSetting, getContextKey, isManager, fireEvent }` (`config`/`user`/`siteId` are computed) |
| `usePermission` | `usePermission` (+ default) | `{ can, canAny, canAll, getAll, canCreateResource, … }` |
| `usePrimeVueLocale` | `getPrimeVueLocale`, `usePrimeVueLocale` (+ default) | helper → locale object; composable → `{ locale, getPrimeVueLocale }` |
| `useTheme` | `getActiveTheme`, `getThemeName`, `useTheme` (default = `getActiveTheme`) | `getActiveTheme` → `{ theme }` |

---

## Правила components

Своих Vue SFC в пакете нет.

Под components здесь имеются named re-export из `primevue` / `vuetools` / `vuetools/theme` (список в manifest) и хелперы темы:

- `PrimeVue`, `Aura`, `Modx`, `ModxManagerTheme`, `ModxTheme`, `definePreset`
- Services: `ConfirmationService`, `ToastService`, `DialogService`
- Composables PrimeVue: `useConfirm`, `useToast`, `useDialog`
- UI-компоненты из barrel `src/vendor/primevue.js`

Если появятся свои компоненты:

1. First-party компонент: PascalCase named export через стабильный Import Map specifier.
2. Props, emits, slots и публичные методы входят в SemVer.
3. Добавление компонента в barrel = minor. Удаление или несовместимая смена API = major после deprecation.
4. Token-файлы темы (`src/theme/modx/components/*.js`) внутренние. Extra расширяет тему через `definePreset(Modx, …)`, не через импорт токенов.

---

## PHP public surface

| Элемент | Контракт |
|---------|----------|
| Canonical key | `$modx->services->get('vuetools')` |
| Alias | `vueTools`, `$modx->vueTools` (тот же объект) |
| Class | `\VueTools\Service` (`instanceof` допустим) |
| Запрет | `new \VueTools\Service` в extras |
| Methods | `include()`, `registerImportMap()`, `includeStyles()`, `includeManagerCombos()`, `isRegistered()`, `isStylesIncluded()`, `getVersions()`, `getVersion()`, `getAssetsUrl()` |
| Constant | `\VueTools\VueCore::VERSION` |

Плагин `VueCoreManager` вызывает `include()` на `OnManagerPageBeforeRender`. Extra на странице без этого события может вызвать `include()` / `registerImportMap()` сама.

---

## Browser / settings / CSS

| Контракт | Значение |
|----------|----------|
| `window.VueTools.theme` | строка setting (`aura`, `modx`, …) |
| `window.VueTools.version` | `\VueTools\VueCore::VERSION` (например `1.2.0-pl`) |
| `window.VueTools.hasFeature(name)` | `boolean`; неизвестное имя → `false` |
| `window.VueTools.checkCompatibility({ minVersion })` | `true` или throw `Error` |
| `vuetools.theme` | system setting, default `aura` |
| `.vueApp` | обязательный класс на mount-контейнере |
| `.p-dark` | dark opt-in для `ModxTheme` |

Каталог features для `hasFeature` не экспонируется как public map на `window.VueTools`
(только через методы). `window.VueToolsCompat` и `js/mgr/compat.min.js` — internal.

Без VueTools объект `window.VueTools` отсутствует. На сборках до Compatibility API
есть только `theme`: Extra проверяет `typeof VueTools?.checkCompatibility === 'function'`
или Import Map (`vuetools/theme`), как раньше.

---

## SemVer

| Изменение | Версия |
|-----------|--------|
| Удаление public specifier / named export / PHP method | **major** |
| Несовместимая смена сигнатуры или return shape | **major** |
| Смена default темы для уже мигрировавших extras | **major** |
| Новый public specifier, export, тема в реестре, компонент в barrel | **minor** |
| Deprecation без удаления | **minor** |
| Исправление без смены контракта | **patch** |
| Bump Vue / Pinia / PrimeVue внутри того же major VueTools | **minor** (или patch, если только security/bugfix без API-дельты); breaking upstream API → major VueTools |

Extra с `{ theme: { preset: Aura } }` или `ModxManagerTheme` продолжает работать. Экспорт `Aura` остаётся Aura, его не подменяем активной темой.

---

## Compatibility API

Реализовано в [#39](https://github.com/modx-pro/vueTools/issues/39). Sync API на
`window.VueTools` до ES modules (classic script `compat.min.js` + payload в
`registerImportMap()`).

```js
VueTools.version
// '1.2.0-pl'

VueTools.hasFeature('useTheme') // true
VueTools.hasFeature('noSuchThing') // false

VueTools.checkCompatibility({ minVersion: '1.2.0' }) // true
VueTools.checkCompatibility({ minVersion: '9.0.0' }) // throws Error
```

Стартовый каталог features (все `true` на текущем runtime):

| Feature | Смысл |
|---------|--------|
| `useApi`, `useLexicon`, `useModx`, `usePermission` | public composables |
| `usePrimeVueLocale` | локали PrimeVue |
| `useTheme`, `centralTheme` | центральная тема / ключ `vuetools/theme` |
| `dataTable` | named export `DataTable` в public barrel |

Правила:

1. Новый член `window.VueTools` добавляется в minor-релизе и в `public-api.json`.
2. `hasFeature(name)` предпочтительнее сравнения версий, когда Extra проверяет
   отдельную возможность.
3. Неизвестная feature возвращает `false`, а не бросает исключение.
4. `checkCompatibility({ minVersion })` при несовместимости кидает `Error` с
   установленной и требуемой версиями; при успехе возвращает `true`. Сравнение
   major.minor.patch, суффикс `-pl` / `-dev` игнорируется.
5. Удаление feature или смена результата для уже известного имени требует major.

Import Map fallback остаётся: `vuetools/theme` по-прежнему сигнал темы для ядер
без Compatibility API.

---

## Deprecation policy

1. Объявить в `docs/PUBLIC_API.md` и `changelog.txt` (раздел Deprecated).
2. Сохранить deprecated API минимум один **minor**-релиз.
3. Удалить только в следующем **major**.
4. Канал: changelog + этот документ. Package Manager `readme.txt` и README ссылаются сюда.

Если вызов можно перехватить, VueTools один раз за загрузку страницы пишет warning
в debug-режиме:

```text
[VueTools][deprecated] <api> deprecated since <version>. Use <replacement>. Removal in <major>.
```

Warning должен назвать API, версию deprecation, замену и major для удаления. Он
не содержит пользовательские данные и не выводится при выключенном debug.
Для exports и Import Map specifiers, которые нельзя перехватить, changelog и этот
документ служат единственным предупреждением.

Алиас `vueTools` и хардкод Aura/`ModxManagerTheme` не в deprecation. Убрать их можно только отдельным major, заранее объявив это в changelog.

---

## Decision Log

| Решение | Альтернативы | Почему |
|---------|--------------|--------|
| Документ + JSON + `check:public-api` | Только markdown; аннотации в исходниках | Рантайм не меняем, расхождение ловит скрипт |
| Public = JS + PHP + window + settings + CSS | Только JS | Extra опирается на сервис, setting и `.vueApp` |
| Prefix `@vuetools/` = internal | Directory import как public | Иначе любой новый файл в `composables/` выглядит как API |
| Default exports = public, named-first | Defaults internal; алиасы `has*` | В #41 не переименовываем методы, гайд правим под код |
| Components = PrimeVue barrel + theme exports | Ждать свои SFC | Своих компонентов нет |
| Require name = `vuetools` | `modxpro-vue-core` | Так называется пакет |
| Deprecation: ≥1 minor, remove in major | Без срока | Extra должна успеть переехать |

---

## Gate

```bash
npm run check:public-api
npm run build:all
```

Скрипт сверяет `public-api.json` с `VueCore.php` и JS entrypoints и падает, если список не совпал. Новый internal файл без записи в manifest контракт не меняет.
