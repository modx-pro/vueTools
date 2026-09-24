/**
 * Modx preset
 *
 * Built on Nora rather than Aura: Nora is already rectangular and dense, which
 * is the direction the MODX manager needs, so the diff stays small and future
 * PrimeVue updates keep flowing through.
 *
 * Three custom token groups live under `modx.*` and are consumed by the
 * component rules that PrimeVue does not tokenize (base type scale, dialog and
 * drawer header surfaces).
 */

import { definePreset } from '@primeuix/themes'
import Nora from '@primeuix/themes/nora'

import { primitive } from './primitive.js'
import { semantic } from './semantic.js'
import { components } from './components.js'

/**
 * $bodyfonts, $codefonts and the 11/12/13/14px steps from
 * `_colors-and-vars.scss`.
 *
 * Two heights, matching the live manager:
 *   `field.height`   2rem    `.x-form-text` (32px, 13px type, 5px padding)
 *   `control.height` 2.25rem toolbar `.x-btn` (Save / Copy, 36px)
 */
export const extend = {
  modx: {
    font: {
      family:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      codeFamily:
        'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      size: {
        xs: '0.6875rem',
        sm: '0.75rem',
        base: '0.8125rem',
        lg: '0.875rem'
      },
      lineHeight: '1.4'
    },
    control: {
      height: '2.25rem'
    },
    field: {
      height: '2rem'
    },
    space: {
      /** Matches `#modx-resource-main-left` panel padding (15px). */
      panel: '15px'
    }
  },
  colorScheme: {
    light: {
      modx: {
        window: {
          header: {
            background: '{surface.100}',
            borderColor: '{surface.100}'
          }
        }
      }
    },
    dark: {
      modx: {
        window: {
          header: {
            background: '{surface.800}',
            borderColor: '{surface.700}'
          }
        }
      }
    }
  }
}

/**
 * PrimeVue hardcodes `font-size: 1rem` on component roots and on the handful of
 * inner elements listed below, and exposes no token for it. This is where the
 * manager 13px base is applied. Selectors are doubled so they win over those
 * component rules whatever the stylesheet order is.
 */
export const css = ({ dt }) => `
.p-component.p-component {
    font-family: ${dt('modx.font.family')};
    font-size: ${dt('modx.font.size.base')};
    line-height: ${dt('modx.font.line.height')};
}

.p-select-label.p-select-label,
.p-datepicker-time-picker.p-datepicker-time-picker span,
.p-autocomplete-input-chip.p-autocomplete-input-chip input,
.p-inputchips-input-item.p-inputchips-input-item input,
.p-terminal-prompt-value.p-terminal-prompt-value {
    font-size: ${dt('modx.font.size.base')};
}

/* Fields use the Ext 13px face. Tabs and a few chrome bits stay on size.lg. */
.p-inputtext:not(.p-inputtext-sm):not(.p-inputtext-lg),
.p-select:not(.p-select-sm):not(.p-select-lg),
.p-multiselect:not(.p-multiselect-sm):not(.p-multiselect-lg),
.p-datepicker:not(.p-datepicker-sm):not(.p-datepicker-lg) .p-datepicker-input,
.p-autocomplete:not(.p-autocomplete-sm):not(.p-autocomplete-lg) .p-autocomplete-input,
.p-inputnumber:not(.p-inputnumber-sm):not(.p-inputnumber-lg) .p-inputnumber-input,
.p-textarea:not(.p-textarea-sm):not(.p-textarea-lg) {
    font-size: ${dt('modx.font.size.base')};
}

/* Single-line fields match .x-form-text (32px). Buttons stay on control.height. */
.p-inputtext:not(.p-inputtext-sm):not(.p-inputtext-lg),
.p-select:not(.p-select-sm):not(.p-select-lg),
.p-multiselect:not(.p-multiselect-sm):not(.p-multiselect-lg),
.p-datepicker:not(.p-datepicker-sm):not(.p-datepicker-lg) .p-datepicker-input,
.p-autocomplete:not(.p-autocomplete-sm):not(.p-autocomplete-lg) .p-autocomplete-input,
.p-inputnumber:not(.p-inputnumber-sm):not(.p-inputnumber-lg) .p-inputnumber-input {
    height: ${dt('modx.field.height')};
    min-height: ${dt('modx.field.height')};
    box-sizing: border-box;
}

.p-menu.p-menu,
.p-tieredmenu.p-tieredmenu,
.p-contextmenu.p-contextmenu {
    border-color: #C7C7C7;
}

.p-multiselect-option,
.p-autocomplete-option {
    border-bottom: 1px solid #E4E4E4;
}

.p-multiselect-list .p-multiselect-option:last-child,
.p-autocomplete-list .p-autocomplete-option:last-child {
    border-bottom-color: transparent;
}
`

export const Modx = definePreset(Nora, {
  primitive,
  semantic,
  components,
  extend,
  css
})

export default Modx
