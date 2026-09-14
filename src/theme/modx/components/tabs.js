/**
 * Tabs tokens
 *
 * Matches the MODX manager horizontal strip from `index.scss` / `_tabs.scss`
 * and live `#modx-container` (#F1F1F1):
 *
 *   .x-tab-panel-header ul.x-tab-strip { background: transparent }
 *     → parent #modx-container #F1F1F1 shows through
 *   li                 { color: #53595f; padding: 0 12px; line-height: 2.2 }
 *   li:hover           { background: #e4e4e4; color: #000 }
 *   li.x-tab-strip-active { background: #fff }
 *   .x-tab-strip-text (active) → splash / primary #234368
 *
 * Top-level Ext tabs have no colored accent bar — active state is white fill
 * + splash label only. Nested Ext / ms3-window strips with box-shadow are a
 * different pattern and must not leak into page-level Vue Tabs.
 *
 * Nested Ext panels use #FBFBFB for the strip; page-level Vue tabs must use
 * the container gray so the white active tab reads (surface.50 / #FBFBFB is
 * too close to white and collapses the hierarchy).
 *
 * Top-only radius and the 1px overlap that joins the active tab to the panel
 * live in the CSS rule below.
 */

export const tablist = {
  background: '#F1F1F1',
  borderWidth: '0 0 1px 0',
  borderColor: '{content.border.color}'
}

export const tab = {
  background: 'transparent',
  borderWidth: '0',
  borderColor: 'transparent',
  hoverBorderColor: 'transparent',
  activeBorderColor: 'transparent',
  // Ext `.x-tab-strip li` → padding 0 12px; wrap adds 2px top.
  // Keep a little vertical pad so line-height 2.2 still reads ~39px tall.
  padding: '0.25rem 0.75rem',
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
  padding: '0.9375rem',
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
    tablist: {
      background: '#F1F1F1'
    },
    tab: {
      // Ext inactive label #53595F
      color: '#53595F',
      hoverBackground: '{surface.300}',
      hoverColor: '{surface.950}',
      // White active tab on #F1F1F1 + splash label (matches Ext .x-tab-strip-text)
      activeBackground: '{content.background}',
      activeColor: '{primary.color}'
    }
  },
  dark: {
    tablist: {
      background: '{surface.900}'
    },
    tab: {
      color: '{text.muted.color}',
      hoverBackground: '{surface.800}',
      hoverColor: '{text.color}',
      activeBackground: '{content.background}',
      activeColor: '{primary.color}'
    }
  }
}

export const css = ({ dt }) => `
.p-tablist {
    background: ${dt('tabs.tablist.background')};
    border-bottom: 1px solid ${dt('content.border.color')};
    padding-top: 2px;
}

.p-tablist-tab-list {
    background: transparent;
    border: 0;
    gap: 0;
}

.p-tab {
    font-size: ${dt('modx.font.size.lg')};
    line-height: 2.2;
    border-top-left-radius: ${dt('border.radius.sm')};
    border-top-right-radius: ${dt('border.radius.sm')};
}

.p-tab-active {
    position: relative;
    z-index: 1;
}

/* Cover the tablist border so the white tab joins the panel body. */
.p-tab-active::after {
    content: '';
    position: absolute;
    inset: auto 0 -1px 0;
    height: 1px;
    background: ${dt('tabs.tab.active.background')};
}

.p-tabpanels {
    background: ${dt('tabs.tabpanel.background')};
    border-radius: 0 0 ${dt('border.radius.sm')} ${dt('border.radius.sm')};
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
