/**
 * Card tokens
 *
 * Restrained elevation: the manager only lifts overlays, so a card gets the
 * subtle radius and a hairline shadow rather than a floating surface.
 */

export const root = {
  borderRadius: '{border.radius.sm}',
  shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)'
}

export const body = {
  padding: '0.75rem',
  gap: '0.5rem'
}

export const caption = {
  gap: '0.25rem'
}

export const title = {
  fontSize: '0.9375rem',
  fontWeight: '700'
}

export const subtitle = {
  color: '{text.muted.color}'
}

export default {
  root,
  body,
  caption,
  title,
  subtitle
}
