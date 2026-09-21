/**
 * Checkbox tokens
 *
 * Manager checks are an 18px Font Awesome glyph, not a filled chip:
 *   unchecked  \f0c8  color #515151
 *   checked    \f14a  same gray, not $green
 *   hover/focus        $colorSplash #234368
 *
 * PrimeVue draws a box plus a tick. Transparent fill, #515151 stroke and
 * tick, splash on hover. Grid row checkers use the same gray (#53595F).
 */

export const root = {
  borderRadius: '{border.radius.xs}',
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
  size: '0.75rem',
  color: '{surface.700}',
  checkedColor: '{surface.700}',
  checkedHoverColor: '{primary.color}',
  sm: {
    size: '0.625rem'
  },
  lg: {
    size: '0.875rem'
  }
}

export default {
  root,
  icon
}
