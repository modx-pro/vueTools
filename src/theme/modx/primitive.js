/**
 * Primitive tokens of the Modx preset
 *
 * Context-free values. Every color ramp is derived from the native
 * MODX Revolution 3 manager theme sources:
 * `_build/templates/default/sass/_colors-and-vars.scss` and `index.scss`.
 *
 * Ramp anchors (untouched MODX values):
 *   navy.600   #234368  $colorSplash
 *   navy.100   #D6E7F8  $treeBgSelected
 *   navy.900   #09121C  $colorSplashDark
 *   green.600  #6CB24A  $green
 *   green.700  #528738  $greener
 *   green.50   #EFFCF6  $lighterGreen
 *   red.600    #CF1124  $red
 *   red.50     #FFEEEE  $lighterRed
 *   orange.600 #F0B429  $orange
 *   amber.200  #FCE588  $yellow
 *   blue.500   #4A90E2  $blue
 *
 * Radius follows the manager custom properties, not the legacy Sass value:
 *   --modx-mgr-radius-min 2px, --modx-mgr-radius-subtle 3px,
 *   --modx-mgr-global-radius 4px
 */

export const primitive = {
  borderRadius: {
    none: '0',
    xs: '2px',
    sm: '3px',
    md: '4px',
    lg: '6px',
    xl: '8px'
  },

  /**
   * Brand ramp built around $colorSplash
   */
  navy: {
    50: '#EDF3FA',
    100: '#D6E7F8',
    200: '#B9D3EE',
    300: '#93B6DD',
    400: '#6B93C2',
    500: '#45607F',
    600: '#234368',
    700: '#1B3451',
    800: '#112133',
    900: '#09121C',
    950: '#04070B'
  },

  /**
   * Neutral ramp built from the manager surfaces and text colors
   */
  neutral: {
    0: '#FFFFFF',
    50: '#FBFBFB',
    100: '#F4F4F4',
    200: '#EEEEEE',
    300: '#E4E4E4',
    400: '#CCCCCC',
    500: '#999999',
    600: '#686868',
    700: '#515151',
    800: '#3B3B3B',
    900: '#2A2A2A',
    950: '#1A1A1A'
  },

  /**
   * Navy tinted neutrals for the dark color scheme
   */
  slate: {
    0: '#FFFFFF',
    50: '#F2F5F8',
    100: '#E2E8EF',
    200: '#C6D0DA',
    300: '#A3B0BE',
    400: '#7C8A99',
    500: '#5C6875',
    600: '#46505B',
    700: '#343C45',
    800: '#262C33',
    900: '#1B2027',
    950: '#12161B'
  },

  /**
   * Grid specific values from the manager theme; they do not belong to any
   * ramp but are used verbatim by DataTable and TreeTable.
   *   alt     $gridrowalt
   *   border  $gridBorderColor
   *   hover   .x-grid3-row-over
   *   header  .x-grid3-hd-row td
   */
  grid: {
    alt: '#F5F6F9',
    border: '#E4E9EE',
    hover: '#E0E8EF',
    header: '#696969'
  },

  green: {
    50: '#EFFCF6',
    100: '#DDEDD5',
    200: '#C6E1B9',
    300: '#B0D59D',
    400: '#99CA82',
    500: '#83BE66',
    600: '#6CB24A',
    700: '#528738',
    800: '#385C26',
    900: '#2A451C',
    950: '#1C2E13'
  },

  red: {
    50: '#FFEEEE',
    100: '#F4C7CC',
    200: '#ECA3AA',
    300: '#E57E89',
    400: '#DE5A67',
    500: '#D63546',
    600: '#CF1124',
    700: '#AE0E1E',
    800: '#8D0C19',
    900: '#6C0913',
    950: '#4A060D'
  },

  orange: {
    50: '#FDF3DD',
    100: '#FCEECD',
    200: '#F9E2AC',
    300: '#F7D78B',
    400: '#F5CB6B',
    500: '#F2C04A',
    600: '#F0B429',
    700: '#E5A510',
    800: '#C48D0E',
    900: '#A3750B',
    950: '#7C5808'
  },

  amber: {
    50: '#FFFDF2',
    100: '#FEF6D9',
    200: '#FCE588',
    300: '#FBDD65',
    400: '#FAD642',
    500: '#F9CE20',
    600: '#F0B429',
    700: '#E5A510',
    800: '#C48D0E',
    900: '#A3750B',
    950: '#7C5808'
  },

  blue: {
    50: '#EDF4FC',
    100: '#DBE9F9',
    200: '#B9D2F1',
    300: '#8FB7E7',
    400: '#6BA1DE',
    500: '#4A90E2',
    600: '#2171CE',
    700: '#1C60AF',
    800: '#174F90',
    900: '#123E72',
    950: '#0D2C51'
  },

  /**
   * Aliases so component tokens inherited from the base preset resolve to
   * MODX colors instead of the stock palette. `sky` feeds the info severity,
   * `yellow` feeds warn messages.
   */
  sky: {
    50: '{blue.50}',
    100: '{blue.100}',
    200: '{blue.200}',
    300: '{blue.300}',
    400: '{blue.400}',
    500: '{blue.500}',
    600: '{blue.600}',
    700: '{blue.700}',
    800: '{blue.800}',
    900: '{blue.900}',
    950: '{blue.950}'
  },

  yellow: {
    50: '{amber.50}',
    100: '{amber.100}',
    200: '{amber.200}',
    300: '{amber.300}',
    400: '{amber.400}',
    500: '{amber.500}',
    600: '{amber.600}',
    700: '{amber.700}',
    800: '{amber.800}',
    900: '{amber.900}',
    950: '{amber.950}'
  }
}

export default primitive
