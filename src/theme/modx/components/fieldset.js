/**
 * Fieldset tokens
 *
 * Follows the manager `.x-fieldset` blocks: hairline border, bold legend on
 * an 18px line box, content on the field spacing scale.
 */

export const root = {
  padding: '0.5rem 0.75rem 0.75rem 0.75rem'
}

export const legend = {
  padding: '0.25rem 0.5rem',
  borderRadius: '{border.radius.sm}',
  gap: '0.375rem',
  fontWeight: '700'
}

export const content = {
  padding: '0'
}

export default {
  root,
  legend,
  content
}
