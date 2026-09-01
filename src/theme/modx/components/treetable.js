/**
 * TreeTable tokens
 *
 * Same density and grid colors as DataTable so both read as one table style.
 */

export const header = {
  borderWidth: '0 0 1px 0',
  padding: '0.5rem 0.625rem'
}

export const headerCell = {
  padding: '0.375rem 0.625rem',
  gap: '0.375rem'
}

export const columnTitle = {
  fontWeight: '700'
}

export const bodyCell = {
  padding: '0.375rem 0.625rem',
  gap: '0.375rem'
}

export const footerCell = {
  padding: '0.375rem 0.625rem'
}

export const footer = {
  padding: '0.5rem 0.625rem'
}

export const sortIcon = {
  size: '0.75rem'
}

export const nodeToggleButton = {
  size: '1.5rem',
  borderRadius: '{border.radius.sm}'
}

export const colorScheme = {
  light: {
    root: {
      borderColor: '{grid.border}'
    },
    headerCell: {
      color: '{grid.header}',
      hoverBackground: '{surface.100}',
      hoverColor: '{text.color}'
    },
    row: {
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
      color: '{text.muted.color}',
      hoverBackground: '{surface.800}',
      hoverColor: '{text.color}'
    },
    row: {
      hoverBackground: '{surface.800}',
      hoverColor: '{text.hover.color}'
    },
    bodyCell: {
      selectedBorderColor: '{primary.800}'
    }
  }
}

export const css = ({ dt }) => `
.p-treetable-table {
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
  nodeToggleButton,
  colorScheme,
  css
}
