/**
 * ProgressBar tokens
 *
 * `.x-progress-wrap` is green, not splash navy:
 *   border 1px #6CB24A, inner #fdfefd, bar #6CB24A, label 11px bold white.
 * Inner track height is 18px; the border sits outside that.
 */

export const root = {
  borderRadius: '0',
  height: '20px'
}

export const value = {
  background: '{green.600}'
}

export const label = {
  color: '#ffffff',
  fontSize: '0.6875rem',
  fontWeight: '700'
}

export const colorScheme = {
  light: {
    root: {
      background: '#fdfefd',
      borderWidth: '1px',
      borderColor: '{green.600}'
    }
  },
  dark: {
    root: {
      borderWidth: '0',
      borderColor: 'transparent'
    }
  }
}

/**
 * `root.border*` are MODX keys with a dark value, so the green frame follows
 * `darkModeSelector` (including a `.p-dark` subtree) instead of `html`.
 */
export const css = ({ dt }) => `
.p-progressbar {
    border: ${dt('progressbar.border.width')} solid ${dt('progressbar.border.color')};
    box-sizing: border-box;
}
`

export default {
  root,
  value,
  label,
  colorScheme,
  css
}
