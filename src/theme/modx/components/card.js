/**
 * Card tokens
 *
 * Restrained elevation: the manager only lifts overlays, so a card gets the
 * subtle radius and a hairline shadow rather than a floating surface.
 *
 * Body padding matches the resource form panel (`#modx-resource-main-left`:
 * 15px). Page shells should not add a second outer pad on the tpl / root.
 */

export const root = {
  borderRadius: '{border.radius.sm}',
  shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)'
}

export const body = {
  padding: '{modx.space.panel}',
  gap: '{modx.space.panel}'
}

export const caption = {
  gap: '0.5rem'
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
