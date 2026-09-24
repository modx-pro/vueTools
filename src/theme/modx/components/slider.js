/**
 * Slider tokens
 *
 * Ext `.x-slider` is a gray sprite, not `{primary.color}`:
 *   groove  slider-bg.png  #DBDBDB, 2px inside a 22px hit area
 *   thumb   slider-thumb.png  14×15, light face, 1px #B0B0B0 edge, dark grip
 * There is no filled range. Nora paints range and handle with primary (navy).
 */

export const track = {
  borderRadius: '1px',
  size: '2px'
}

export const range = {
  background: '{surface.300}'
}

export const handle = {
  width: '14px',
  height: '15px',
  borderRadius: '2px',
  background: '{surface.100}',
  hoverBackground: '{surface.0}',
  content: {
    borderRadius: '0',
    background: '{surface.500}',
    hoverBackground: '{surface.500}',
    width: '1px',
    height: '9px',
    shadow: 'none'
  },
  focusRing: {
    width: '{focus.ring.width}',
    style: '{focus.ring.style}',
    color: '{focus.ring.color}',
    offset: '{focus.ring.offset}',
    shadow: '{focus.ring.shadow}'
  }
}

export const colorScheme = {
  light: {
    track: {
      background: '#DBDBDB'
    },
    range: {
      background: '#DBDBDB'
    },
    handle: {
      background: '#E7E7E7',
      hoverBackground: '#F6F6F6',
      content: {
        background: '#9E9E9E',
        hoverBackground: '#9E9E9E'
      }
    }
  },
  dark: {
    range: {
      background: '{surface.600}'
    },
    handle: {
      content: {
        background: '{surface.300}',
        hoverBackground: '{surface.300}'
      }
    }
  }
}

export const css = () => `
html:not(.p-dark) .p-slider-handle {
    border: 1px solid #B0B0B0;
    box-sizing: border-box;
}
`

export default {
  track,
  range,
  handle,
  colorScheme,
  css
}
