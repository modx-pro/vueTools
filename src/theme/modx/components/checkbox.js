/**
 * Checkbox tokens
 *
 * The manager check controls sit on an 18px line box, so a 16px square with a
 * 2px radius reads correctly next to 13px labels. Checked fill uses MODX
 * `$green` (`green.600`), not the navy primary splash.
 */

export const root = {
  borderRadius: '{border.radius.xs}',
  width: '1rem',
  height: '1rem',
  checkedBackground: '{green.600}',
  checkedHoverBackground: '{green.700}',
  checkedBorderColor: '{green.600}',
  checkedHoverBorderColor: '{green.700}',
  checkedFocusBorderColor: '{green.600}',
  sm: {
    width: '0.875rem',
    height: '0.875rem'
  },
  lg: {
    width: '1.25rem',
    height: '1.25rem'
  }
}

export const icon = {
  size: '0.75rem',
  checkedColor: '{surface.0}',
  checkedHoverColor: '{surface.0}',
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
