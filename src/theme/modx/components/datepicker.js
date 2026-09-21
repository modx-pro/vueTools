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

export const colorScheme = {
  light: {
    today: {
      background: 'transparent',
      color: '#000000'
    }
  },
  dark: {
    today: {
      background: 'transparent',
      color: '{surface.0}'
    }
  }
}

export const css = () => `
.p-datepicker-day-view,
.p-datepicker-weekday {
    font-size: 0.6875rem;
    font-weight: 700;
}

html:not(.p-dark) .p-datepicker-panel {
    background: #FBFBFB;
}

html:not(.p-dark) .p-datepicker-select-month,
html:not(.p-dark) .p-datepicker-select-year {
    color: #515151;
    font-size: 0.6875rem;
    font-weight: 400;
}

html:not(.p-dark) .p-datepicker-prev-button,
html:not(.p-dark) .p-datepicker-next-button {
    color: #234368;
    opacity: 0.6;
}

html:not(.p-dark) .p-datepicker-prev-button:not(:disabled):hover,
html:not(.p-dark) .p-datepicker-next-button:not(:disabled):hover {
    color: #234368;
    opacity: 1;
    background: transparent;
}

html:not(.p-dark) .p-datepicker-weekday-cell {
    border-bottom: 1px solid #E4E4E4;
}

html:not(.p-dark) .p-datepicker-day:not(.p-datepicker-day-selected) {
    color: #999999;
}

html:not(.p-dark) .p-datepicker-today > .p-datepicker-day:not(.p-datepicker-day-selected) {
    border-color: #234368;
    color: #999999;
}

html:not(.p-dark) .p-datepicker-day-selected {
    border-color: #ffffff;
}

html:not(.p-dark) .p-datepicker-day-cell[data-p-other-month='true'] > .p-datepicker-day {
    color: #DCDCDC;
    opacity: 1;
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
