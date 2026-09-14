/**
 * Tree tokens
 *
 * The manager resource tree is tight: 20px rows, small indent, rectangular
 * selection band in $treeBgSelected (mapped to the highlight tokens).
 */

export const root = {
  padding: '0.375rem',
  gap: '1px',
  indent: '0.875rem'
}

export const node = {
  padding: '0.1875rem 0.375rem',
  borderRadius: '{border.radius.sm}',
  gap: '0.25rem'
}

export const nodeToggleButton = {
  borderRadius: '{border.radius.sm}',
  size: '1.25rem'
}

export const loadingIcon = {
  size: '1.5rem'
}

export const filter = {
  margin: '0 0 0.375rem 0'
}

export default {
  root,
  node,
  nodeToggleButton,
  loadingIcon,
  filter
}
