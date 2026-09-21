/**
 * RadioButton tokens
 *
 * Same 18px glyph as Checkbox: circle #515151, checked dot the same gray,
 * hover and focus $colorSplash. Not a navy or green fill.
 */

export const root = {
  width: '1.125rem',
  height: '1.125rem',
  background: '{form.field.background}',
  checkedBackground: '{form.field.background}',
  checkedHoverBackground: '{form.field.background}',
  borderColor: '{surface.700}',
  hoverBorderColor: '{primary.color}',
  focusBorderColor: '{primary.color}',
  checkedBorderColor: '{surface.700}',
  checkedHoverBorderColor: '{primary.color}',
  checkedFocusBorderColor: '{primary.color}',
  sm: {
    width: '1rem',
    height: '1rem'
  },
  lg: {
    width: '1.25rem',
    height: '1.25rem'
  }
}

export const icon = {
  size: '0.625rem',
  checkedColor: '{surface.700}',
  checkedHoverColor: '{primary.color}',
  sm: {
    size: '0.5rem'
  },
  lg: {
    size: '0.75rem'
  }
}

export default {
  root,
  icon
}
