/**
 * Panel tokens
 *
 * Manager panels are plain boxes: 1px border, bold 13px header separated by a
 * rule, content on the panel spacing scale.
 */

export const header = {
  background: 'transparent',
  color: '{text.color}',
  padding: '0.5rem 0.75rem',
  borderWidth: '0 0 1px 0',
  borderColor: '{content.border.color}',
  borderRadius: '0'
}

export const toggleableHeader = {
  padding: '0.25rem 0.75rem'
}

export const title = {
  fontWeight: '700'
}

export const content = {
  padding: '0.75rem'
}

export const footer = {
  padding: '0 0.75rem 0.75rem 0.75rem'
}

export default {
  header,
  toggleableHeader,
  title,
  content,
  footer
}
