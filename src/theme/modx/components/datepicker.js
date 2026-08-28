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
  color: '{text.muted.color}'
}

export const date = {
  width: '1.75rem',
  height: '1.75rem',
  borderRadius: '{border.radius.sm}',
  padding: '0.125rem'
}

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
  timePicker
}
