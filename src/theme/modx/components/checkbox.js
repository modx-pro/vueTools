/**
 * Checkbox tokens
 *
 * The manager check controls sit on an 18px line box, so a 16px square with a
 * 2px radius reads correctly next to 13px labels.
 */

export const root = {
  borderRadius: '{border.radius.xs}',
  width: '1rem',
  height: '1rem',
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
