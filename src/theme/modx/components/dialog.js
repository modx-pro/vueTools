/**
 * Dialog tokens
 *
 * Header text is 13px / 700 / #515151, centered, padding 8px, on #F4F4F4.
 * The header rule is the same color as the fill, so it does not read as a line.
 * Footer border is white on white. Body padding is 15px.
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
  padding: '8px',
  gap: '0.375rem'
}

export const title = {
  fontSize: '{modx.font.size.base}',
  fontWeight: '700'
}

export const content = {
  padding: '15px'
}

export const footer = {
  padding: '5px 15px 15px',
  gap: '0.375rem'
}

export const css = ({ dt }) => `
.p-dialog-header {
    background: ${dt('modx.window.header.background')};
    border-bottom: 1px solid ${dt('modx.window.header.background')};
    border-top-left-radius: ${dt('dialog.border.radius')};
    border-top-right-radius: ${dt('dialog.border.radius')};
    color: ${dt('surface.700')};
    text-align: center;
}

.p-dialog-title {
    font-size: ${dt('modx.font.size.base')};
    font-weight: 700;
}

.p-dialog-footer {
    border-top: 1px solid ${dt('overlay.modal.background')};
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
