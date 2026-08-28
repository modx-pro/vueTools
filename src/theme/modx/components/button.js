/**
 * Button tokens
 *
 * Mirrors the two manager button styles from
 * `sass/components/_secondary-button.scss` and `_primary-button.scss`:
 *
 *   severity="secondary"  white fill, 1px $borderColor, $darkGray label,
 *                         $lightGray on hover - the default toolbar button
 *   severity="success"    $green fill, white label - the Save action
 *   default (primary)     $colorSplash fill
 *
 * Labels use the regular weight; the manager never bolds button text.
 * Severity fills other than secondary inherit the base preset and resolve to
 * MODX colors through the primitive ramps.
 */

export const root = {
  borderRadius: '{form.field.border.radius}',
  roundedBorderRadius: '2rem',
  gap: '0.375rem',
  paddingX: '0.875rem',
  paddingY: '{form.field.padding.y}',
  iconOnlyWidth: '2rem',
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

export const colorScheme = {
  light: {
    root: {
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
      secondary: {
        hoverBackground: '{surface.800}',
        activeBackground: '{surface.700}',
        borderColor: '{surface.600}',
        color: '{surface.200}'
      }
    },
    text: {
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
  colorScheme
}
