/**
 * InputGroup tokens
 *
 * Nora pads addons with 0.5rem, which grows them past `modx.field.height`
 * and misaligns icon buttons next to Normal fields. Zero padding + the
 * 32px field height keeps the strip flush with the input.
 */

export const addon = {
  padding: '0',
  minWidth: '{modx.field.height}'
}

export const css = ({ dt }) => `
.p-inputgroupaddon .p-button {
    margin: 0;
}

.p-inputgroupaddon {
    height: ${dt('modx.field.height')};
    box-sizing: border-box;
}
`

export default {
  addon,
  css
}
