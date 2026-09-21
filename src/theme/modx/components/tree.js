/**
 * Tree tokens
 *
 * The manager resource tree uses 14px type on a 2.25 line box, 0 8px
 * padding, and a rectangular selection band in $treeBgSelected.
 */

export const root = {
  padding: '0.375rem',
  gap: '1px',
  indent: '0.875rem'
}

export const node = {
  padding: '0 8px',
  borderRadius: '{border.radius.sm}',
  gap: '0.25rem',
  color: '#383838'
}

export const css = () => `
.p-tree-node-content {
    font-size: 0.875rem;
    line-height: 2.25;
}
`

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
  filter,
  css
}
