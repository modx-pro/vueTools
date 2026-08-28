/**
 * Message tokens
 *
 * Inline messages follow the manager invalid field treatment: a light tint
 * ($lighterRed / $lighterGreen) behind a 1px colored border, with text dark
 * enough to stay readable on the tint.
 */

export const root = {
  borderRadius: '{content.border.radius}',
  borderWidth: '1px'
}

export const content = {
  padding: '0.375rem 0.5rem',
  gap: '0.375rem',
  sm: {
    padding: '0.25rem 0.375rem'
  },
  lg: {
    padding: '0.5rem 0.75rem'
  }
}

export const text = {
  fontSize: '0.8125rem',
  fontWeight: '400',
  sm: {
    fontSize: '0.75rem'
  },
  lg: {
    fontSize: '0.875rem'
  }
}

export const icon = {
  size: '1rem',
  sm: {
    size: '0.875rem'
  },
  lg: {
    size: '1.125rem'
  }
}

export const closeButton = {
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '{border.radius.sm}'
}

export const closeIcon = {
  size: '0.875rem',
  sm: {
    size: '0.75rem'
  },
  lg: {
    size: '1rem'
  }
}

export const outlined = {
  root: {
    borderWidth: '1px'
  }
}

export const simple = {
  content: {
    padding: '0'
  }
}

export const colorScheme = {
  light: {
    info: {
      background: '{blue.50}',
      borderColor: '{blue.600}',
      color: '{blue.800}',
      shadow: 'none',
      closeButton: {
        hoverBackground: '{blue.100}',
        focusRing: {
          color: '{blue.800}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{blue.700}',
        borderColor: '{blue.600}'
      },
      simple: {
        color: '{blue.700}'
      }
    },
    success: {
      background: '{green.50}',
      borderColor: '{green.600}',
      color: '{green.800}',
      shadow: 'none',
      closeButton: {
        hoverBackground: '{green.100}',
        focusRing: {
          color: '{green.800}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{green.700}',
        borderColor: '{green.600}'
      },
      simple: {
        color: '{green.700}'
      }
    },
    warn: {
      background: '{amber.50}',
      borderColor: '{amber.600}',
      color: '{neutral.900}',
      shadow: 'none',
      closeButton: {
        hoverBackground: '{amber.100}',
        focusRing: {
          color: '{neutral.900}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{neutral.900}',
        borderColor: '{amber.600}'
      },
      simple: {
        color: '{neutral.900}'
      }
    },
    error: {
      background: '{red.50}',
      borderColor: '{red.600}',
      color: '{red.800}',
      shadow: 'none',
      closeButton: {
        hoverBackground: '{red.100}',
        focusRing: {
          color: '{red.800}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{red.700}',
        borderColor: '{red.600}'
      },
      simple: {
        color: '{red.700}'
      }
    },
    secondary: {
      background: '{surface.100}',
      borderColor: '{surface.300}',
      color: '{surface.700}',
      shadow: 'none',
      closeButton: {
        hoverBackground: '{surface.200}',
        focusRing: {
          color: '{surface.700}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{surface.700}',
        borderColor: '{surface.400}'
      },
      simple: {
        color: '{surface.700}'
      }
    },
    contrast: {
      background: '{surface.900}',
      borderColor: '{surface.900}',
      color: '{surface.0}',
      shadow: 'none',
      closeButton: {
        hoverBackground: '{surface.800}',
        focusRing: {
          color: '{surface.0}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{surface.900}',
        borderColor: '{surface.900}'
      },
      simple: {
        color: '{surface.900}'
      }
    }
  },
  dark: {
    info: {
      background: 'color-mix(in srgb, {blue.400}, transparent 88%)',
      borderColor: '{blue.500}',
      color: '{blue.200}',
      shadow: 'none',
      closeButton: {
        hoverBackground: 'color-mix(in srgb, {blue.400}, transparent 76%)',
        focusRing: {
          color: '{blue.200}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{blue.300}',
        borderColor: '{blue.500}'
      },
      simple: {
        color: '{blue.300}'
      }
    },
    success: {
      background: 'color-mix(in srgb, {green.400}, transparent 88%)',
      borderColor: '{green.500}',
      color: '{green.200}',
      shadow: 'none',
      closeButton: {
        hoverBackground: 'color-mix(in srgb, {green.400}, transparent 76%)',
        focusRing: {
          color: '{green.200}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{green.300}',
        borderColor: '{green.500}'
      },
      simple: {
        color: '{green.300}'
      }
    },
    warn: {
      background: 'color-mix(in srgb, {amber.400}, transparent 88%)',
      borderColor: '{amber.500}',
      color: '{amber.200}',
      shadow: 'none',
      closeButton: {
        hoverBackground: 'color-mix(in srgb, {amber.400}, transparent 76%)',
        focusRing: {
          color: '{amber.200}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{amber.300}',
        borderColor: '{amber.500}'
      },
      simple: {
        color: '{amber.300}'
      }
    },
    error: {
      background: 'color-mix(in srgb, {red.400}, transparent 88%)',
      borderColor: '{red.500}',
      color: '{red.200}',
      shadow: 'none',
      closeButton: {
        hoverBackground: 'color-mix(in srgb, {red.400}, transparent 76%)',
        focusRing: {
          color: '{red.200}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{red.300}',
        borderColor: '{red.500}'
      },
      simple: {
        color: '{red.300}'
      }
    },
    secondary: {
      background: '{surface.800}',
      borderColor: '{surface.700}',
      color: '{surface.100}',
      shadow: 'none',
      closeButton: {
        hoverBackground: '{surface.700}',
        focusRing: {
          color: '{surface.100}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{surface.200}',
        borderColor: '{surface.600}'
      },
      simple: {
        color: '{surface.200}'
      }
    },
    contrast: {
      background: '{surface.0}',
      borderColor: '{surface.0}',
      color: '{surface.950}',
      shadow: 'none',
      closeButton: {
        hoverBackground: '{surface.200}',
        focusRing: {
          color: '{surface.950}',
          shadow: 'none'
        }
      },
      outlined: {
        color: '{surface.0}',
        borderColor: '{surface.0}'
      },
      simple: {
        color: '{surface.0}'
      }
    }
  }
}

export default {
  root,
  content,
  text,
  icon,
  closeButton,
  closeIcon,
  outlined,
  simple,
  colorScheme
}
