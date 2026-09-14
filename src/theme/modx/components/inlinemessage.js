/**
 * InlineMessage tokens
 *
 * Same tinted palette as Message, kept for extras still using the legacy
 * component.
 */

import { colorScheme as messageColorScheme } from './message.js'

export const root = {
  padding: '{form.field.padding.y} {form.field.padding.x}',
  borderRadius: '{content.border.radius}',
  gap: '0.375rem'
}

export const text = {
  fontWeight: '400'
}

export const icon = {
  size: '1rem'
}

const pick = (scheme) =>
  Object.fromEntries(
    Object.entries(scheme).map(([severity, tokens]) => [
      severity,
      {
        background: tokens.background,
        borderColor: tokens.borderColor,
        color: tokens.color,
        shadow: 'none'
      }
    ])
  )

export const colorScheme = {
  light: pick(messageColorScheme.light),
  dark: pick(messageColorScheme.dark)
}

export default {
  root,
  text,
  icon,
  colorScheme
}
