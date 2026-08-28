/**
 * Tabs tokens
 *
 * The manager tab strip (`_tabs.scss`) is not a pill row: the strip itself is
 * transparent, inactive tabs are flat with $darkestGray labels, hover fills
 * with $lightGray, and the active tab is a white panel-colored tab carrying
 * $colorSplashDark text that merges into the body below.
 *
 * Two things have no token: the 14px tab label ($tabFont) and the top-only
 * radius with the 1px overlap that joins the active tab to the panel. Both
 * live in the rule below.
 */

export const tablist = {
  background: 'transparent',
  borderWidth: '0 0 1px 0',
  borderColor: '{content.border.color}'
}

export const tab = {
  background: 'transparent',
  borderWidth: '0',
  borderColor: 'transparent',
  hoverBorderColor: 'transparent',
  activeBorderColor: 'transparent',
  padding: '0.375rem 0.75rem',
  fontWeight: '400',
  margin: '0',
  gap: '0.375rem',
  focusRing: {
    width: '{focus.ring.width}',
    style: '{focus.ring.style}',
    color: '{focus.ring.color}',
    offset: '-2px',
    shadow: '{focus.ring.shadow}'
  }
}

export const tabpanel = {
  background: '{content.background}',
  color: '{content.color}',
  padding: '0.75rem',
  focusRing: {
    width: '{focus.ring.width}',
    style: '{focus.ring.style}',
    color: '{focus.ring.color}',
    offset: '{focus.ring.offset}',
    shadow: 'inset {focus.ring.shadow}'
  }
}

export const navButton = {
  background: '{content.background}',
  color: '{text.muted.color}',
  hoverColor: '{text.color}',
  width: '1.75rem'
}

export const activeBar = {
  height: '0',
  bottom: '0',
  background: 'transparent'
}

export const colorScheme = {
  light: {
    tab: {
      hoverBackground: '{surface.300}',
      activeBackground: '{content.background}',
      color: '{surface.800}',
      hoverColor: '{surface.950}',
      activeColor: '{navy.900}'
    }
  },
  dark: {
    tab: {
      hoverBackground: '{surface.800}',
      activeBackground: '{content.background}',
      color: '{text.muted.color}',
      hoverColor: '{text.color}',
      activeColor: '{primary.color}'
    }
  }
}

export const css = ({ dt }) => `
.p-tab {
    font-size: ${dt('modx.font.size.lg')};
    border-top-left-radius: ${dt('border.radius.sm')};
    border-top-right-radius: ${dt('border.radius.sm')};
}

.p-tab-active {
    position: relative;
}

.p-tab-active::after {
    content: '';
    position: absolute;
    inset: auto 0 -1px 0;
    height: 1px;
    background: ${dt('tabs.tab.active.background')};
}
`

export default {
  tablist,
  tab,
  tabpanel,
  navButton,
  activeBar,
  colorScheme,
  css
}
