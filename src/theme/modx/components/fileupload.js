/**
 * FileUpload tokens
 *
 * Padding follows the manager panel spacing scale
 * (--modx-mgr-block-el-spacing) instead of the roomier base preset.
 */

export const header = {
  padding: '0.625rem 0.75rem',
  gap: '0.375rem'
}

export const content = {
  padding: '0 0.75rem 0.75rem 0.75rem',
  gap: '0.75rem',
  highlightBorderColor: '{primary.color}'
}

export const file = {
  padding: '0.625rem',
  gap: '0.625rem',
  borderColor: '{content.border.color}',
  info: {
    gap: '0.25rem'
  }
}

export const fileList = {
  gap: '0.375rem'
}

export const progressbar = {
  height: '0.25rem'
}

export const basic = {
  gap: '0.375rem'
}

export default {
  header,
  content,
  file,
  fileList,
  progressbar,
  basic
}
