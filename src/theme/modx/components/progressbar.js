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
      background: '#fdfefd'
    }
  }
}

export const css = () => `
html:not(.p-dark) .p-progressbar {
    border: 1px solid #6CB24A;
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
