/**
 * ToggleSwitch tokens
 *
 * `.display-switch` on a 13px label: track 3em × 1.6em (39 × 20.8),
 * knob 1.3em (16.9), off fill #E4E4E4, on fill #6CB24A, knob white.
 */

export const root = {
  width: '39px',
  height: '20.8px',
  borderRadius: '15.6px',
  gap: '2px',
  borderWidth: '0',
  background: '{surface.300}',
  hoverBackground: '{surface.300}',
  checkedBackground: '{green.600}',
  checkedHoverBackground: '{green.700}',
  checkedBorderColor: '{green.600}',
  checkedHoverBorderColor: '{green.700}'
}

export const handle = {
  borderRadius: '50%',
  size: '16.9px',
  background: '#ffffff',
  hoverBackground: '#ffffff',
  checkedBackground: '#ffffff',
  checkedHoverBackground: '#ffffff',
  checkedColor: '{green.600}',
  checkedHoverColor: '{green.700}'
}

export default {
  root,
  handle
}
