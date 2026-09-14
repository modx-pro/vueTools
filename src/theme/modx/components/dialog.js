/**
 * Dialog tokens
 *
 * Modeled on the manager window (`_windows.scss`): $winHeaderBg header with a
 * rule under it, bold title, white compact body, footer actions above a rule,
 * and $boxShadowBig instead of a deep drop shadow.
 *
 * PrimeVue exposes no background or border token for the dialog header and
 * footer, so those two surfaces come from the rule below.
 */

export const root = {
  borderRadius: '{overlay.modal.border.radius}',
  background: '{overlay.modal.background}',
  borderColor: '{overlay.modal.border.color}',
  color: '{overlay.modal.color}',
  shadow: '{overlay.modal.shadow}'
}

export const header = {
  padding: '0.5rem 0.75rem',
  gap: '0.375rem'
}

export const title = {
  fontSize: '0.875rem',
  fontWeight: '700'
}

export const content = {
  padding: '{overlay.modal.padding}'
}

export const footer = {
  padding: '0.5rem 0.75rem',
  gap: '0.375rem'
}

export const css = ({ dt }) => `
.p-dialog-header {
    background: ${dt('modx.window.header.background')};
    border-bottom: 1px solid ${dt('modx.window.header.border.color')};
    border-top-left-radius: ${dt('dialog.border.radius')};
    border-top-right-radius: ${dt('dialog.border.radius')};
}

.p-dialog-footer {
    border-top: 1px solid ${dt('modx.window.header.border.color')};
}
`

export default {
  root,
  header,
  title,
  content,
  footer,
  css
}
