/**
 * InputGroup tokens
 *
 * Nora pads addons with 0.5rem, which grows them past `modx.control.height`
 * and misaligns icon buttons next to Normal fields. Zero padding + control
 * min-width keeps the strip flush with the 36px input.
 */

export const addon = {
  padding: '0',
  minWidth: '{modx.control.height}'
}

export const css = ({ dt }) => `
.p-inputgroupaddon .p-button {
    margin: 0;
}

.p-inputgroupaddon {
    height: ${dt('modx.control.height')};
    box-sizing: border-box;
}
`

export default {
  addon,
  css
}
