/**
 * Panel tokens
 *
 * Manager panels are plain boxes: 1px border, bold 13px header separated by a
 * rule, content on the panel spacing scale (same inset as Card body /
 * `#modx-resource-main-left`: 15px / `{modx.space.panel}`).
 */

export const header = {
  background: 'transparent',
  color: '{text.color}',
  padding: '{modx.space.panel}',
  borderWidth: '0 0 1px 0',
  borderColor: '{content.border.color}',
  borderRadius: '0'
}

export const toggleableHeader = {
  padding: '{modx.space.panel}'
}

export const title = {
  fontWeight: '700'
}

export const content = {
  padding: '{modx.space.panel}'
}

export const footer = {
  padding: '0 {modx.space.panel} {modx.space.panel} {modx.space.panel}'
}

export default {
  header,
  toggleableHeader,
  title,
  content,
  footer
}
