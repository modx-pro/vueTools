/**
 * Paginator tokens
 *
 * Rectangular nav buttons sized to the manager paging toolbar
 * (`.x-toolbar .x-btn` ≈ 44×34, padding 8px 13px, ring `0 0 0 1px #E4E4E4`),
 * not Aura’s 2.5rem circles. Selected page = white + splash label/border
 * (no primary.100 fill — that reads as “Aura highlight”, not MODX).
 */

export const root = {
  padding: '0.375rem 0.5rem',
  gap: '0.375rem',
  borderRadius: '{content.border.radius}'
}

export const navButton = {
  width: '2.75rem',
  height: '2.125rem',
  borderRadius: '{border.radius.sm}',
  background: '{content.background}',
  hoverBackground: '{content.hover.background}',
  selectedBackground: '{content.background}',
  color: '{text.muted.color}',
  hoverColor: '{text.color}',
  selectedColor: '{primary.color}'
}

export const currentPageReport = {
  color: '{text.muted.color}'
}

export const jumpToPageInput = {
  maxWidth: '2.25rem'
}

export const css = ({ dt }) => `
.p-paginator {
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    border-top: 1px solid ${dt('content.border.color')};
}

.p-paginator-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${dt('paginator.gap')};
}

.p-paginator-first,
.p-paginator-prev,
.p-paginator-next,
.p-paginator-last,
.p-paginator-page {
    box-shadow: 0 0 0 1px ${dt('content.border.color')};
    background: ${dt('paginator.nav.button.background')};
    padding: 8px 13px;
    box-sizing: border-box;
}

/* .x-tbar-page-* glyph box is 18x18 (prev/next font-size 18px). */
.p-paginator-first-icon,
.p-paginator-prev-icon,
.p-paginator-next-icon,
.p-paginator-last-icon {
    width: 18px;
    height: 18px;
}

.p-paginator-page-selected {
    background: ${dt('content.background')};
    color: ${dt('primary.color')};
    box-shadow: 0 0 0 1px ${dt('primary.color')};
}

/* Keep RPP Select on the same row height as nav buttons (not modx.control 36px). */
.p-paginator-rpp-dropdown.p-select,
.p-paginator .p-paginator-rpp-dropdown {
    height: ${dt('paginator.nav.button.height')};
    min-height: ${dt('paginator.nav.button.height')};
    width: auto;
    min-width: 4.5rem;
    box-sizing: border-box;
}

.p-paginator-rpp-dropdown .p-select-label {
    padding-block: 0;
    display: flex;
    align-items: center;
    line-height: 1;
}

.p-paginator-rpp-dropdown .p-select-dropdown {
    width: 1.75rem;
}

.p-paginator-current {
    margin-inline-start: auto;
    font-size: ${dt('modx.font.size.base')};
}

.p-paginator-rpp-dropdown {
    margin-inline-start: 0.25rem;
}
`

export default {
  root,
  navButton,
  currentPageReport,
  jumpToPageInput,
  css
}
