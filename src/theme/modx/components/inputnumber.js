/**
 * InputNumber tokens
 *
 * Spinner buttons reuse the manager field trigger width (30px).
 * Horizontal ± buttons must match `modx.control.height` (36px): the input
 * is pinned in preset.css, but Nora only pads the buttons, so they render
 * ~32px and look stepped next to the field.
 */

export const button = {
  width: '1.875rem',
  verticalPadding: '0'
}

export const css = ({ dt }) => `
/* Manager (and some UA) styles set button { margin: 2px }, which offsets ±
 * spinners relative to the pinned 36px input. */
.p-inputnumber .p-inputnumber-button {
    margin: 0;
}

.p-inputnumber:not(.p-inputnumber-sm):not(.p-inputnumber-lg).p-inputnumber-horizontal {
    align-items: stretch;
    height: ${dt('modx.control.height')};
}

.p-inputnumber:not(.p-inputnumber-sm):not(.p-inputnumber-lg).p-inputnumber-horizontal .p-inputnumber-button {
    height: ${dt('modx.control.height')};
    min-height: ${dt('modx.control.height')};
    box-sizing: border-box;
    padding-block: 0;
}

.p-inputnumber:not(.p-inputnumber-sm):not(.p-inputnumber-lg).p-inputnumber-stacked,
.p-inputnumber:not(.p-inputnumber-sm):not(.p-inputnumber-lg).p-inputnumber-vertical {
    height: ${dt('modx.control.height')};
}

.p-inputnumber:not(.p-inputnumber-sm):not(.p-inputnumber-lg).p-inputnumber-stacked .p-inputnumber-button-group,
.p-inputnumber:not(.p-inputnumber-sm):not(.p-inputnumber-lg).p-inputnumber-vertical .p-inputnumber-button-group {
    height: 100%;
}
`

export default {
  button,
  css
}
