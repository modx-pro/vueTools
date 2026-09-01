/**
 * Drawer tokens
 *
 * Same header treatment as Dialog so panels sliding in from an edge read as
 * manager windows.
 */

export const header = {
  padding: '0.5rem 0.75rem'
}

export const title = {
  fontSize: '0.9375rem',
  fontWeight: '700'
}

export const content = {
  padding: '{overlay.modal.padding}'
}

export const footer = {
  padding: '0.5rem 0.75rem'
}

export const css = ({ dt }) => `
.p-drawer-header {
    background: ${dt('modx.window.header.background')};
    border-bottom: 1px solid ${dt('modx.window.header.border.color')};
}

.p-drawer-footer {
    border-top: 1px solid ${dt('modx.window.header.border.color')};
}
`

export default {
  header,
  title,
  content,
  footer,
  css
}
