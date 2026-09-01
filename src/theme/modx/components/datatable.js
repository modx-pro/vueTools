/**
 * DataTable tokens
 *
 * Density and colors follow the manager grid from `_xtheme-modx.scss`:
 * white header with a $gridBorderColor rule, bold $gridHeaderTxtColor titles,
 * $gridrowalt striping, a blue tinted hover row and 12px cell text.
 *
 * Cell text size is not exposed as a token in PrimeVue, so the one rule below
 * carries it.
 */

export const header = {
  background: '{content.background}',
  borderColor: '{datatable.border.color}',
  color: '{content.color}',
  borderWidth: '0 0 1px 0',
  padding: '0.5rem 0.625rem',
  sm: {
    padding: '0.375rem 0.5rem'
  },
  lg: {
    padding: '0.625rem 0.875rem'
  }
}

export const headerCell = {
  padding: '0.375rem 0.625rem',
  gap: '0.375rem',
  sm: {
    padding: '0.25rem 0.375rem'
  },
  lg: {
    padding: '0.625rem 0.875rem'
  }
}

export const columnTitle = {
  fontWeight: '700'
}

export const bodyCell = {
  borderColor: '{datatable.border.color}',
  padding: '0.375rem 0.625rem',
  sm: {
    padding: '0.25rem 0.375rem'
  },
  lg: {
    padding: '0.625rem 0.875rem'
  }
}

export const footerCell = {
  padding: '0.375rem 0.625rem',
  sm: {
    padding: '0.25rem 0.375rem'
  },
  lg: {
    padding: '0.625rem 0.875rem'
  }
}

export const footer = {
  padding: '0.5rem 0.625rem',
  sm: {
    padding: '0.375rem 0.5rem'
  },
  lg: {
    padding: '0.625rem 0.875rem'
  }
}

export const sortIcon = {
  size: '0.75rem'
}

export const rowToggleButton = {
  size: '1.5rem',
  borderRadius: '{border.radius.sm}'
}

export const filter = {
  inlineGap: '0.375rem',
  constraintList: {
    padding: '{list.padding}',
    gap: '{list.gap}'
  }
}

export const colorScheme = {
  light: {
    root: {
      borderColor: '{grid.border}'
    },
    headerCell: {
      background: '{content.background}',
      hoverBackground: '{surface.100}',
      color: '{grid.header}',
      hoverColor: '{text.color}'
    },
    row: {
      stripedBackground: '{grid.alt}',
      hoverBackground: '{grid.hover}',
      hoverColor: '{text.color}'
    },
    bodyCell: {
      selectedBorderColor: '{primary.200}'
    }
  },
  dark: {
    root: {
      borderColor: '{surface.700}'
    },
    headerCell: {
      background: '{content.background}',
      hoverBackground: '{surface.800}',
      color: '{text.muted.color}',
      hoverColor: '{text.color}'
    },
    row: {
      stripedBackground: '{surface.950}',
      hoverBackground: '{surface.800}',
      hoverColor: '{text.hover.color}'
    },
    bodyCell: {
      selectedBorderColor: '{primary.800}'
    }
  }
}

export const css = ({ dt }) => `
.p-datatable-table {
    font-size: ${dt('modx.font.size.sm')};
}
`

export default {
  header,
  headerCell,
  columnTitle,
  bodyCell,
  footerCell,
  footer,
  sortIcon,
  rowToggleButton,
  filter,
  colorScheme,
  css
}
