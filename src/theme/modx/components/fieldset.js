/**
 * Fieldset tokens
 *
 * Follows the manager `.x-fieldset` blocks: hairline border, bold legend on
 * an 18px line box, content on the field spacing scale.
 */

export const root = {
  padding: '0 10px 10px 10px',
  borderRadius: '{border.radius.sm}'
}

export const legend = {
  padding: '0 5px 0 3px',
  borderRadius: '0',
  gap: '0.375rem',
  fontWeight: '700'
}

export const content = {
  padding: '0'
}

export const css = () => `
.p-fieldset-legend {
    margin-left: 10px;
    color: #515151;
    font-size: 0.6875rem;
    font-weight: 700;
    line-height: 18px;
}
`

export default {
  root,
  legend,
  content,
  css
}
