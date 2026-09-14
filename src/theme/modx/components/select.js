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

export default {
  dropdown,
  checkmark,
  emptyMessage
}
