/**
 * Toast tokens
 *
 * The manager status message is a solid colored bar: $statusMessageBg with
 * white text. Toasts keep that filled treatment; inline Message stays tinted
 * so the two never compete.
 */

export const root = {
  width: '22rem',
  borderRadius: '{border.radius.sm}',
  borderWidth: '0',
  blur: '0'
}

export const icon = {
  size: '1rem'
}

export const content = {
  padding: '0.625rem 0.75rem',
  gap: '0.5rem'
}

export const text = {
  gap: '0.25rem'
}

export const summary = {
  fontWeight: '700',
  fontSize: '0.8125rem'
}

export const detail = {
  fontWeight: '400',
  fontSize: '0.75rem'
}

export const closeButton = {
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '{border.radius.sm}'
}

export const closeIcon = {
  size: '0.875rem'
}

const filled = {
  info: {
    background: '{blue.600}',
    borderColor: '{blue.600}',
    color: '#ffffff',
    detailColor: '#ffffff',
    shadow: '{overlay.popover.shadow}',
    closeButton: {
      hoverBackground: 'rgba(255, 255, 255, 0.2)',
      focusRing: {
        color: '#ffffff',
        shadow: 'none'
      }
    }
  },
  success: {
    background: '{green.600}',
    borderColor: '{green.600}',
    color: '#ffffff',
    detailColor: '#ffffff',
    shadow: '{overlay.popover.shadow}',
    closeButton: {
      hoverBackground: 'rgba(255, 255, 255, 0.2)',
      focusRing: {
        color: '#ffffff',
        shadow: 'none'
      }
    }
  },
  warn: {
    background: '{amber.600}',
    borderColor: '{amber.600}',
    color: '{neutral.900}',
    detailColor: '{neutral.900}',
    shadow: '{overlay.popover.shadow}',
    closeButton: {
      hoverBackground: 'rgba(0, 0, 0, 0.12)',
      focusRing: {
        color: '{neutral.900}',
        shadow: 'none'
      }
    }
  },
  error: {
    background: '{red.600}',
    borderColor: '{red.600}',
    color: '#ffffff',
    detailColor: '#ffffff',
    shadow: '{overlay.popover.shadow}',
    closeButton: {
      hoverBackground: 'rgba(255, 255, 255, 0.2)',
      focusRing: {
        color: '#ffffff',
        shadow: 'none'
      }
    }
  },
  secondary: {
    background: '{surface.200}',
    borderColor: '{surface.300}',
    color: '{surface.700}',
    detailColor: '{surface.600}',
    shadow: '{overlay.popover.shadow}',
    closeButton: {
      hoverBackground: '{surface.300}',
      focusRing: {
        color: '{surface.700}',
        shadow: 'none'
      }
    }
  },
  contrast: {
    background: '{surface.900}',
    borderColor: '{surface.900}',
    color: '{surface.0}',
    detailColor: '{surface.100}',
    shadow: '{overlay.popover.shadow}',
    closeButton: {
      hoverBackground: 'rgba(255, 255, 255, 0.15)',
      focusRing: {
        color: '{surface.0}',
        shadow: 'none'
      }
    }
  }
}

export const colorScheme = {
  light: filled,
  dark: filled
}

export default {
  root,
  icon,
  content,
  text,
  summary,
  detail,
  closeButton,
  closeIcon,
  colorScheme
}
