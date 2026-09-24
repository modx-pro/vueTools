/**
 * Button tokens
 *
 * Mirrors the two manager button styles from
 * `sass/components/_secondary-button.scss` and `_primary-button.scss`:
 *
 *   default (primary)     $green fill, white label - MODX `.primary-button`
 *                         (Save, Create, Login). Same paint as severity="success"
 *   severity="secondary"  white fill, 1px ring #E4E4E4, #515151 label
 *   severity="success"    same green as primary; kept so existing Save buttons
 *                         do not change
 *
 * Navy `$colorSplash` is not a button fill. It stays on tabs, links and
 * selection through `semantic.primary`.
 *
 * Normal size matches toolbar `.x-btn`: 36px, 13px label, padding 10px 15px.
 * Secondary uses `border: 0` plus `box-shadow: 0 0 0 1px #E4E4E4`, not a CSS border.
 * Labels use the regular weight; the manager never bolds button text.
 * Severity fills other than secondary inherit the base preset and resolve to
 * MODX colors through the primitive ramps.
 */

export const root = {
  borderRadius: '{form.field.border.radius}',
  roundedBorderRadius: '2rem',
  gap: '0.375rem',
  paddingX: '15px',
  paddingY: '10px',
  iconOnlyWidth: '{modx.control.height}',
  sm: {
    fontSize: '{form.field.sm.font.size}',
    paddingX: '0.625rem',
    paddingY: '{form.field.sm.padding.y}',
    iconOnlyWidth: '1.75rem'
  },
  lg: {
    fontSize: '{form.field.lg.font.size}',
    paddingX: '1rem',
    paddingY: '{form.field.lg.padding.y}',
    iconOnlyWidth: '2.5rem'
  },
  label: {
    fontWeight: '400'
  },
  raisedShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
  badgeSize: '0.875rem',
  transitionDuration: '{form.field.transition.duration}'
}

/**
 * PrimeVue has no height token on Button. Pin Normal to the MODX toolbar size;
 * sm / lg keep their padding-driven sizes.
 */
export const css = ({ dt }) => `
.p-button:not(.p-button-sm):not(.p-button-lg) {
    font-size: ${dt('modx.font.size.base')};
    line-height: 1;
    min-height: ${dt('modx.control.height')};
    box-sizing: border-box;
}

/* .x-btn draws its edge as a 1px ring, not a border. */
.p-button-secondary:not(.p-button-outlined):not(.p-button-text):not(.p-button-link) {
    border-width: 0;
    box-shadow: 0 0 0 1px ${dt('button.secondary.border.color')};
}

.p-button-secondary:not(.p-button-outlined):not(.p-button-text):not(.p-button-link):hover {
    box-shadow: 0 0 0 1px ${dt('button.secondary.hover.border.color')};
}

.p-button-secondary:not(.p-button-outlined):not(.p-button-text):not(.p-button-link):active {
    box-shadow: 0 0 0 1px ${dt('button.secondary.active.border.color')};
}

.p-button.p-button-icon-only:not(.p-button-sm):not(.p-button-lg) {
    width: ${dt('modx.control.height')};
    height: ${dt('modx.control.height')};
    min-height: ${dt('modx.control.height')};
    padding: 0;
}
`

export const colorScheme = {
  light: {
    root: {
      primary: {
        background: '{green.600}',
        hoverBackground: '{green.700}',
        activeBackground: '{green.800}',
        borderColor: '{green.600}',
        hoverBorderColor: '{green.700}',
        activeBorderColor: '{green.800}',
        color: '#ffffff',
        hoverColor: '#ffffff',
        activeColor: '#ffffff',
        focusRing: {
          color: '{green.600}',
          shadow: 'none'
        }
      },
      secondary: {
        background: '{surface.0}',
        hoverBackground: '{surface.300}',
        activeBackground: '{surface.300}',
        borderColor: '{surface.300}',
        hoverBorderColor: '{surface.400}',
        activeBorderColor: '{surface.400}',
        color: '{surface.700}',
        hoverColor: '{surface.800}',
        activeColor: '{surface.900}',
        focusRing: {
          color: '{primary.color}',
          shadow: 'none'
        }
      },
      /**
       * $orange needs a dark label to stay readable, same as the manager
       * `.yellow` button which keeps $buttonColor
       */
      warn: {
        color: '{neutral.900}',
        hoverColor: '{neutral.900}',
        activeColor: '{neutral.900}'
      }
    },
    /**
     * Borders keep the vivid severity color; labels move down the ramp so
     * green and yellow text still clears 4.5:1 on white.
     */
    outlined: {
      primary: {
        hoverBackground: '{green.50}',
        activeBackground: '{green.100}',
        borderColor: '{green.600}',
        color: '{green.800}'
      },
      secondary: {
        hoverBackground: '{surface.100}',
        activeBackground: '{surface.200}',
        borderColor: '{surface.400}',
        color: '{surface.700}'
      },
      success: {
        borderColor: '{green.600}',
        color: '{green.800}'
      },
      warn: {
        borderColor: '{amber.600}',
        color: '{amber.950}'
      }
    },
    text: {
      primary: {
        hoverBackground: '{green.50}',
        activeBackground: '{green.100}',
        color: '{green.800}'
      },
      secondary: {
        hoverBackground: '{surface.100}',
        activeBackground: '{surface.200}',
        color: '{surface.700}'
      },
      success: {
        color: '{green.800}'
      },
      warn: {
        color: '{amber.950}'
      }
    },
    link: {
      color: '{primary.color}',
      hoverColor: '{primary.hover.color}',
      activeColor: '{primary.active.color}'
    }
  },
  dark: {
    root: {
      primary: {
        background: '{green.600}',
        hoverBackground: '{green.700}',
        activeBackground: '{green.800}',
        borderColor: '{green.600}',
        hoverBorderColor: '{green.700}',
        activeBorderColor: '{green.800}',
        color: '#ffffff',
        hoverColor: '#ffffff',
        activeColor: '#ffffff',
        focusRing: {
          color: '{green.600}',
          shadow: 'none'
        }
      },
      secondary: {
        background: '{surface.800}',
        hoverBackground: '{surface.700}',
        activeBackground: '{surface.600}',
        borderColor: '{surface.700}',
        hoverBorderColor: '{surface.600}',
        activeBorderColor: '{surface.500}',
        color: '{surface.100}',
        hoverColor: '{surface.50}',
        activeColor: '{surface.0}',
        focusRing: {
          color: '{primary.color}',
          shadow: 'none'
        }
      },
      warn: {
        color: '{neutral.900}',
        hoverColor: '{neutral.900}',
        activeColor: '{neutral.900}'
      }
    },
    outlined: {
      primary: {
        hoverBackground: 'color-mix(in srgb, {green.600}, transparent 88%)',
        activeBackground: 'color-mix(in srgb, {green.600}, transparent 76%)',
        borderColor: '{green.600}',
        color: '{green.400}'
      },
      secondary: {
        hoverBackground: '{surface.800}',
        activeBackground: '{surface.700}',
        borderColor: '{surface.600}',
        color: '{surface.200}'
      }
    },
    text: {
      primary: {
        hoverBackground: 'color-mix(in srgb, {green.600}, transparent 88%)',
        activeBackground: 'color-mix(in srgb, {green.600}, transparent 76%)',
        color: '{green.400}'
      },
      secondary: {
        hoverBackground: '{surface.800}',
        activeBackground: '{surface.700}',
        color: '{surface.200}'
      }
    },
    link: {
      color: '{primary.color}',
      hoverColor: '{primary.hover.color}',
      activeColor: '{primary.active.color}'
    }
  }
}

export default {
  root,
  colorScheme,
  css
}
