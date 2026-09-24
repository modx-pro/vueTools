/**
 * DatePicker tokens
 *
 * The manager date picker is a dense square grid: cells are rectangular with
 * the subtle radius, not circles, and the trigger matches the field trigger.
 */

export const panel = {
  padding: '0.5rem'
}

export const header = {
  padding: '0 0 0.375rem 0'
}

export const title = {
  gap: '0.375rem',
  fontWeight: '700'
}

export const dropdown = {
  width: '1.875rem',
  sm: {
    width: '1.625rem'
  },
  lg: {
    width: '2.25rem'
  }
}

export const selectMonth = {
  padding: '0.1875rem 0.375rem',
  borderRadius: '{border.radius.sm}'
}

export const selectYear = {
  padding: '0.1875rem 0.375rem',
  borderRadius: '{border.radius.sm}'
}

export const dayView = {
  margin: '0.375rem 0 0 0'
}

export const weekDay = {
  padding: '0.1875rem',
  fontWeight: '700',
  color: '{surface.700}'
}

export const date = {
  width: '1.75rem',
  height: '1.75rem',
  borderRadius: '{border.radius.sm}',
  padding: '0.125rem',
  hoverBackground: '#DCDCDC',
  hoverColor: '{surface.700}',
  selectedBackground: '{primary.color}',
  selectedColor: '#ffffff'
}

/**
 * Light values mirror the manager calendar. Every key also has a dark value so
 * the tokens follow `darkModeSelector`, including a `.p-dark` subtree; the dark
 * values keep Nora's defaults. `navButton`, `weekDay.border*` and `otherMonth`
 * are MODX-only keys read by the CSS below.
 */
export const colorScheme = {
  light: {
    panel: {
      background: '#FBFBFB'
    },
    selectMonth: {
      color: '#515151'
    },
    selectYear: {
      color: '#515151'
    },
    weekDay: {
      borderWidth: '1px',
      borderColor: '#E4E4E4'
    },
    date: {
      color: '#999999'
    },
    today: {
      background: 'transparent',
      color: '#999999'
    },
    otherMonth: {
      color: '#DCDCDC',
      disabledOpacity: '1'
    },
    navButton: {
      color: '{primary.color}',
      hoverColor: '{primary.color}',
      hoverBackground: 'transparent',
      opacity: '0.6'
    }
  },
  dark: {
    panel: {
      background: '{content.background}'
    },
    selectMonth: {
      color: '{content.color}'
    },
    selectYear: {
      color: '{content.color}'
    },
    weekDay: {
      borderWidth: '0',
      borderColor: 'transparent'
    },
    date: {
      color: '{content.color}'
    },
    today: {
      background: 'transparent',
      color: '{surface.0}'
    },
    otherMonth: {
      color: '{content.color}',
      disabledOpacity: '{disabled.opacity}'
    },
    navButton: {
      color: '{button.text.secondary.color}',
      hoverColor: '{button.text.secondary.color}',
      hoverBackground: '{button.text.secondary.hover.background}',
      opacity: '1'
    }
  }
}

export const css = ({ dt }) => `
.p-datepicker-day-view,
.p-datepicker-weekday {
    font-size: 0.6875rem;
    font-weight: 700;
}

.p-datepicker-select-month,
.p-datepicker-select-year {
    font-size: 0.6875rem;
    font-weight: 400;
}

/* The nav arrows are text/secondary Buttons; the panel prefix outranks those. */
.p-datepicker-panel .p-datepicker-prev-button.p-datepicker-prev-button,
.p-datepicker-panel .p-datepicker-next-button.p-datepicker-next-button {
    color: ${dt('datepicker.nav.button.color')};
    opacity: ${dt('datepicker.nav.button.opacity')};
}

.p-datepicker-panel .p-datepicker-prev-button.p-datepicker-prev-button:not(:disabled):hover,
.p-datepicker-panel .p-datepicker-next-button.p-datepicker-next-button:not(:disabled):hover {
    color: ${dt('datepicker.nav.button.hover.color')};
    opacity: 1;
    background: ${dt('datepicker.nav.button.hover.background')};
}

.p-datepicker-weekday-cell {
    border-bottom: ${dt('datepicker.week.day.border.width')} solid ${dt('datepicker.week.day.border.color')};
}

/* :where() keeps this below the hover rule, so hovered days stay readable. */
.p-datepicker-day-cell[data-p-other-month='true'] > .p-datepicker-day:where(:not(.p-datepicker-day-selected)) {
    color: ${dt('datepicker.other.month.color')};
}

.p-datepicker-day-cell[data-p-other-month='true'] > .p-datepicker-day.p-disabled {
    opacity: ${dt('datepicker.other.month.disabled.opacity')};
}
`

export const monthView = {
  margin: '0.375rem 0 0 0'
}

export const month = {
  padding: '0.25rem',
  borderRadius: '{border.radius.sm}'
}

export const yearView = {
  margin: '0.375rem 0 0 0'
}

export const year = {
  padding: '0.25rem',
  borderRadius: '{border.radius.sm}'
}

export const buttonbar = {
  padding: '0.375rem 0 0 0',
  borderColor: '{content.border.color}'
}

export const timePicker = {
  padding: '0.375rem 0 0 0',
  borderColor: '{content.border.color}',
  gap: '0.375rem',
  buttonGap: '0.125rem'
}

export default {
  panel,
  header,
  title,
  dropdown,
  selectMonth,
  selectYear,
  dayView,
  weekDay,
  date,
  monthView,
  month,
  yearView,
  year,
  buttonbar,
  timePicker,
  colorScheme,
  css
}
