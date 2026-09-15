## Что

<!-- Что меняется для автора Extra или для сборки VueTools. -->

## Почему

<!-- Зачем. Ссылка на issue, если есть. -->

Fixes #

## Public API

- [ ] Не меняет public surface
- [ ] Добавляет specifier / export / PHP-метод (обновить `docs/PUBLIC_API.md` и `docs/public-api.json`)
- [ ] Ломает существующий контракт (major + запись в changelog)

## Проверка

- [ ] `npm run check:public-api`
- [ ] `npm run build:all` (если менялись vendor, composables или тема)
