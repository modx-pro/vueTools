/**
 * Dark color scheme of the Modx preset
 *
 * MODX Revolution 3 ships no dark manager theme, so this scheme is an
 * extrapolation: the same navy hue, inverted lightness, with surfaces from the
 * navy tinted `slate` ramp. Only semantic values are redefined here; component
 * tokens stay shared between both schemes.
 */

export const dark = {
  surface: {
    0: '#ffffff',
    50: '{slate.50}',
    100: '{slate.100}',
    200: '{slate.200}',
    300: '{slate.300}',
    400: '{slate.400}',
    500: '{slate.500}',
    600: '{slate.600}',
    700: '{slate.700}',
    800: '{slate.800}',
    900: '{slate.900}',
    950: '{slate.950}'
  },

  primary: {
    color: '{primary.300}',
    contrastColor: '{surface.950}',
    hoverColor: '{primary.200}',
    activeColor: '{primary.100}'
  },

  highlight: {
    background: 'color-mix(in srgb, {primary.300}, transparent 84%)',
    focusBackground: 'color-mix(in srgb, {primary.300}, transparent 72%)',
    color: '{primary.100}',
    focusColor: '{primary.50}'
  },

  mask: {
    background: 'rgba(0, 0, 0, 0.6)',
    color: '{surface.200}'
  },

  formField: {
    background: '{surface.950}',
    disabledBackground: '{surface.800}',
    filledBackground: '{surface.800}',
    filledHoverBackground: '{surface.800}',
    filledFocusBackground: '{surface.950}',
    borderColor: '{surface.700}',
    hoverBorderColor: '{surface.600}',
    focusBorderColor: '{primary.color}',
    invalidBorderColor: '{red.400}',
    color: '{surface.50}',
    disabledColor: '{surface.500}',
    placeholderColor: '{surface.400}',
    invalidPlaceholderColor: '{red.400}',
    floatLabelColor: '{surface.400}',
    floatLabelFocusColor: '{primary.color}',
    floatLabelActiveColor: '{surface.400}',
    floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
    iconColor: '{surface.400}',
    shadow: 'none'
  },

  text: {
    color: '{surface.50}',
    hoverColor: '{surface.0}',
    mutedColor: '{surface.400}',
    hoverMutedColor: '{surface.300}'
  },

  content: {
    background: '{surface.900}',
    hoverBackground: '{surface.800}',
    borderColor: '{surface.700}',
    color: '{text.color}',
    hoverColor: '{text.hover.color}'
  },

  overlay: {
    select: {
      background: '{surface.900}',
      borderColor: '{surface.700}',
      color: '{text.color}'
    },
    popover: {
      background: '{surface.900}',
      borderColor: '{surface.700}',
      color: '{text.color}'
    },
    modal: {
      background: '{surface.900}',
      borderColor: '{surface.700}',
      color: '{text.color}'
    }
  },

  list: {
    option: {
      focusBackground: '{surface.800}',
      selectedBackground: '{highlight.background}',
      selectedFocusBackground: '{highlight.focus.background}',
      color: '{text.color}',
      focusColor: '{text.hover.color}',
      selectedColor: '{highlight.color}',
      selectedFocusColor: '{highlight.focus.color}',
      icon: {
        color: '{text.muted.color}',
        focusColor: '{text.hover.muted.color}'
      }
    },
    optionGroup: {
      background: 'transparent',
      color: '{text.muted.color}'
    }
  },

  navigation: {
    item: {
      focusBackground: '{surface.800}',
      activeBackground: '{highlight.background}',
      color: '{text.color}',
      focusColor: '{text.hover.color}',
      activeColor: '{highlight.color}',
      icon: {
        color: '{text.muted.color}',
        focusColor: '{text.hover.muted.color}',
        activeColor: '{highlight.color}'
      }
    },
    submenuLabel: {
      background: 'transparent',
      color: '{text.muted.color}'
    },
    submenuIcon: {
      color: '{text.muted.color}',
      focusColor: '{text.hover.muted.color}',
      activeColor: '{highlight.color}'
    }
  }
}

export default dark
