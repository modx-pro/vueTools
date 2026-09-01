/**
 * Tooltip tokens
 *
 * The manager `.x-tip` is a dark gray box with light text, 3px radius and 5px
 * padding, in both color schemes.
 */

export const root = {
  maxWidth: '18rem',
  gutter: '0.25rem',
  shadow: '{overlay.popover.shadow}',
  padding: '0.3125rem 0.5rem',
  borderRadius: '{border.radius.sm}'
}

const surface = {
  root: {
    background: '{neutral.700}',
    color: '{neutral.100}'
  }
}

export const colorScheme = {
  light: surface,
  dark: surface
}

export default {
  root,
  colorScheme
}
