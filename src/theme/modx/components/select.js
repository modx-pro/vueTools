/**
 * Select tokens
 *
 * The trigger matches `--modx-mgr-field-trigger-width` (30px) so a Select
 * lines up with the manager combo boxes.
 */

export const dropdown = {
  width: '1.875rem',
  color: '{form.field.icon.color}'
}

export const checkmark = {
  color: '{list.option.color}',
  gutterStart: '-0.25rem',
  gutterEnd: '0.25rem'
}

export const emptyMessage = {
  padding: '{list.option.padding}'
}

export const css = () => `
.p-select-option {
    border-bottom: 1px solid #E4E4E4;
}

.p-select-list .p-select-option:last-child {
    border-bottom-color: transparent;
}
`

export default {
  dropdown,
  checkmark,
  emptyMessage,
  css
}
