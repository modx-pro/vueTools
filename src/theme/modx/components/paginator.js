/**
 * Paginator tokens
 *
 * Rectangular nav buttons sized to the manager toolbar buttons instead of the
 * 2.5rem base preset squares.
 */

export const root = {
  padding: '0.375rem 0.5rem',
  gap: '0.125rem',
  borderRadius: '{content.border.radius}'
}

export const navButton = {
  width: '1.75rem',
  height: '1.75rem',
  borderRadius: '{border.radius.sm}'
}

export const jumpToPageInput = {
  maxWidth: '2.25rem'
}

export default {
  root,
  navButton,
  jumpToPageInput
}
