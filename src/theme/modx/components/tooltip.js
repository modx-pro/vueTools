/**
 * Tooltip tokens
 *
 * The manager `.x-tip` is a dark gray box with light text, 3px radius and 5px
 * padding, in both color schemes.
 */

export const root = {
  maxWidth: '25rem',
  gutter: '0.25rem',
  shadow: 'none',
  padding: '5px',
  borderRadius: '{border.radius.sm}'
}

const surface = {
  root: {
    background: '#575757',
    color: '#F0F0F0'
  }
}

export const css = () => `
.p-tooltip {
    font-size: 0.75rem;
}
`

export const colorScheme = {
  light: surface,
  dark: surface
}

export default {
  root,
  colorScheme,
  css
}
