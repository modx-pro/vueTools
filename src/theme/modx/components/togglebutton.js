/**
 * ToggleButton / SelectButton tokens
 *
 * SelectButton renders a group of ToggleButtons. Nora checked state uses
 * `{highlight.*}` (navy tint for tree/list selection). Segmented controls in
 * the manager should read like secondary buttons with a success checked fill —
 * same language as Checkbox and severity="success" CTAs.
 *
 * Height pinned to `{modx.control.height}` (36px) to match toolbar buttons.
 */

export const root = {
  padding: '0 0.75rem',
  borderRadius: '{form.field.border.radius}',
  gap: '0.375rem',
  fontWeight: '400',
  background: '{form.field.background}',
  borderColor: '{form.field.border.color}',
  color: '{form.field.color}',
  hoverColor: '{form.field.color}',
  checkedBackground: '{green.600}',
  checkedColor: '#ffffff',
  checkedBorderColor: '{green.600}',
  disabledBackground: '{form.field.disabled.background}',
  disabledBorderColor: '{form.field.disabled.background}',
  disabledColor: '{form.field.disabled.color}',
  invalidBorderColor: '{form.field.invalid.border.color}',
  focusRing: {
    width: '{form.field.focus.ring.width}',
    style: '{form.field.focus.ring.style}',
    color: '{form.field.focus.ring.color}',
    offset: '{form.field.focus.ring.offset}',
    shadow: '{form.field.focus.ring.shadow}'
  },
  transitionDuration: '{form.field.transition.duration}',
  sm: {
    fontSize: '{form.field.sm.font.size}',
    padding: '0 0.625rem'
  },
  lg: {
    fontSize: '{form.field.lg.font.size}',
    padding: '0 0.875rem'
  }
}

export const icon = {
  color: '{text.muted.color}',
  hoverColor: '{text.muted.color}',
  checkedColor: '#ffffff',
  disabledColor: '{form.field.disabled.color}'
}

export const content = {
  checkedBackground: 'transparent',
  checkedShadow: 'none',
  padding: '0',
  borderRadius: '0',
  sm: {
    padding: '0'
  },
  lg: {
    padding: '0'
  }
}

export const colorScheme = {
  light: {
    root: {
      hoverBackground: '{surface.300}'
    }
  },
  dark: {
    root: {
      hoverBackground: '{surface.700}'
    }
  }
}

/**
 * PrimeVue ToggleButton has no height token. Pin Normal to the MODX control
 * height so SelectButton segments align with InputText / Button.
 */
export const css = ({ dt }) => `
.p-togglebutton:not(.p-togglebutton-sm):not(.p-togglebutton-lg) {
    font-size: ${dt('modx.font.size.lg')};
    min-height: ${dt('modx.control.height')};
    box-sizing: border-box;
}

.p-selectbutton .p-togglebutton:not(.p-togglebutton-sm):not(.p-togglebutton-lg) {
    min-height: ${dt('modx.control.height')};
}
`

export default {
  root,
  icon,
  content,
  colorScheme,
  css
}
