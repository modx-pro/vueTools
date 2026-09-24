/**
 * Semantic tokens of the Modx preset
 *
 * Density and geometry come from the manager custom properties in
 * `_build/templates/default/sass/index.scss`:
 *
 *   --modx-mgr-field-height-min   2rem      Ext form field floor
 *   --modx-mgr-field-padding      0.45rem   inner field padding
 *   --modx-mgr-field-trigger-width 30px     select / spinner trigger
 *   --modx-mgr-global-spacing     1rem      panel spacing
 *   --modx-mgr-radius-subtle      3px       fields, buttons, tabs
 *   --modx-mgr-global-radius      4px       panels, overlays
 *
 * Toolbar `.x-btn` (Save / Copy) renders at 36px (`modx.control.height`).
 * Single-line fields stay on the Ext floor (`modx.field.height` = 2rem):
 * 13px type, 5px padding, 1px border. Do not pin fields to the button height.
 */

import { dark } from './dark.js'

export const semantic = {
  transitionDuration: '0.2s',
  disabledOpacity: '0.6',
  iconSize: '0.875rem',
  anchorGutter: '2px',

  focusRing: {
    width: '2px',
    style: 'solid',
    color: '{primary.color}',
    offset: '2px',
    shadow: 'none'
  },

  primary: {
    50: '{navy.50}',
    100: '{navy.100}',
    200: '{navy.200}',
    300: '{navy.300}',
    400: '{navy.400}',
    500: '{navy.500}',
    600: '{navy.600}',
    700: '{navy.700}',
    800: '{navy.800}',
    900: '{navy.900}',
    950: '{navy.950}'
  },

  formField: {
    paddingX: '5px',
    paddingY: '5px',
    borderRadius: '{border.radius.sm}',
    transitionDuration: '{transition.duration}',
    sm: {
      fontSize: '0.6875rem',
      paddingX: '0.375rem',
      paddingY: '0.25rem'
    },
    lg: {
      fontSize: '0.875rem',
      paddingX: '0.75rem',
      paddingY: '0.5625rem'
    },
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{primary.color}',
      offset: '-1px',
      shadow: 'none'
    }
  },

  content: {
    borderRadius: '{border.radius.md}'
  },

  mask: {
    transitionDuration: '0.25s'
  },

  list: {
    padding: '0.125rem 0',
    gap: '0',
    header: {
      padding: '0.375rem 0.5rem 0.25rem 0.5rem'
    },
    option: {
      padding: '6px 8px',
      borderRadius: '0'
    },
    optionGroup: {
      padding: '0.3125rem 0.5rem',
      fontWeight: '700'
    }
  },

  navigation: {
    list: {
      padding: '0.125rem 0',
      gap: '0'
    },
    item: {
      padding: '3px 21px',
      borderRadius: '0',
      gap: '0.5rem'
    },
    submenuLabel: {
      padding: '0.3125rem 0.625rem',
      fontWeight: '700'
    },
    submenuIcon: {
      size: '0.75rem'
    }
  },

  /**
   * MODX overlays are flat: a 1px border plus a restrained drop shadow
   * ($boxShadow / $boxShadowBig from _colors-and-vars.scss).
   */
  overlay: {
    select: {
      borderRadius: '{border.radius.sm}',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
    },
    popover: {
      borderRadius: '{border.radius.sm}',
      padding: '0.625rem',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
    },
    modal: {
      borderRadius: '{border.radius.sm}',
      padding: '0.75rem',
      shadow: '0 0 15px 0 rgba(0, 0, 0, 0.2)'
    },
    navigation: {
      shadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
    }
  },

  colorScheme: {
    light: {
      surface: {
        0: '#ffffff',
        50: '{neutral.50}',
        100: '{neutral.100}',
        200: '{neutral.200}',
        300: '{neutral.300}',
        400: '{neutral.400}',
        500: '{neutral.500}',
        600: '{neutral.600}',
        700: '{neutral.700}',
        800: '{neutral.800}',
        900: '{neutral.900}',
        950: '{neutral.950}'
      },

      primary: {
        color: '{primary.600}',
        contrastColor: '#ffffff',
        hoverColor: '{primary.700}',
        activeColor: '{primary.800}'
      },

      /**
       * $treeBgSelected with splash text: the manager selection color
       */
      highlight: {
        background: '{primary.100}',
        focusBackground: '{primary.200}',
        color: '{primary.700}',
        focusColor: '{primary.800}'
      },

      mask: {
        background: 'rgba(0, 0, 0, 0.4)',
        color: '{surface.200}'
      },

      formField: {
        background: '{surface.0}',
        disabledBackground: '{surface.100}',
        filledBackground: '{surface.100}',
        filledHoverBackground: '{surface.100}',
        filledFocusBackground: '{surface.0}',
        borderColor: '{surface.300}',
        hoverBorderColor: '{surface.500}',
        focusBorderColor: '{neutral.500}',
        invalidBorderColor: '{red.600}',
        color: '#000000',
        disabledColor: '{surface.500}',
        placeholderColor: '{surface.600}',
        invalidPlaceholderColor: '{red.600}',
        floatLabelColor: '{surface.600}',
        floatLabelFocusColor: '{primary.color}',
        floatLabelActiveColor: '{surface.600}',
        floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
        iconColor: '{surface.600}',
        shadow: 'none'
      },

      text: {
        color: '{surface.900}',
        hoverColor: '{surface.950}',
        mutedColor: '{surface.600}',
        hoverMutedColor: '{surface.700}'
      },

      content: {
        background: '{surface.0}',
        hoverBackground: '{surface.100}',
        borderColor: '{surface.300}',
        color: '{text.color}',
        hoverColor: '{text.hover.color}'
      },

      overlay: {
        select: {
          background: '{surface.0}',
          borderColor: '{neutral.500}',
          color: '{text.color}'
        },
        popover: {
          background: '{surface.0}',
          borderColor: '{surface.300}',
          color: '{text.color}'
        },
        modal: {
          background: '{surface.0}',
          borderColor: '{surface.300}',
          color: '{text.color}'
        }
      },

      list: {
        option: {
          focusBackground: '#F0F0F0',
          selectedBackground: '{surface.300}',
          selectedFocusBackground: '{surface.300}',
          color: '{surface.700}',
          focusColor: '{surface.700}',
          selectedColor: '{primary.700}',
          selectedFocusColor: '{primary.700}',
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
          focusBackground: '#F0F0F0',
          activeBackground: '#F0F0F0',
          color: '{surface.700}',
          focusColor: '{surface.700}',
          activeColor: '{surface.700}',
          icon: {
            color: '{text.muted.color}',
            focusColor: '{text.hover.muted.color}',
            activeColor: '{surface.700}'
          }
        },
        submenuLabel: {
          background: 'transparent',
          color: '{text.muted.color}'
        },
        submenuIcon: {
          color: '{text.muted.color}',
          focusColor: '{text.hover.muted.color}',
          activeColor: '{surface.700}'
        }
      }
    },

    dark
  }
}

export default semantic
