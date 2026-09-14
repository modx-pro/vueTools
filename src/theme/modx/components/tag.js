/**
 * Tag tokens
 *
 * Tags mostly appear inside grids, where the manager keeps chips at 12px with
 * 4px padding (`.x-superboxselect-item`). The base preset size would drive the
 * table row height up.
 */

export const root = {
  fontSize: '{modx.font.size.sm}',
  fontWeight: '700',
  padding: '0.125rem 0.375rem',
  gap: '0.25rem',
  borderRadius: '{border.radius.xs}',
  roundedBorderRadius: '{border.radius.xl}'
}

export const icon = {
  size: '0.6875rem'
}

export default {
  root,
  icon
}
