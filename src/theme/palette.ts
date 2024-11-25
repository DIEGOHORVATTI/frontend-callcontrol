'use client'

import { alpha } from '@mui/material/styles'

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`
}

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    greenLemon: true
    blue: true
    purple: true
    pink: true
    salmon: true
  }
}

interface GradientsPaletteOptions {
  primary: string
  info: string
  success: string
  warning: string
  error: string
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string
  }
  interface SimplePaletteColorOptions {
    lighter: string
    darker: string
  }
  interface PaletteColor {
    lighter: string
    darker: string
  }
  interface Palette {
    gradients: GradientsPaletteOptions
    chart: typeof CHART_COLORS
  }
  interface PaletteOptions {
    gradients: GradientsPaletteOptions
    chart: typeof CHART_COLORS
  }
}

declare module '@mui/material' {
  interface Color {
    0: string
    500_8: string
    500_12: string
    500_16: string
    500_24: string
    500_32: string
    500_48: string
    500_56: string
    500_80: string
  }
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
}
const CYAN = {
  lighter: '#CCF4FE',
  light: '#68CDF9',
  main: '#078DEE',
  dark: '#0351AB',
  darker: '#012972',
}
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
}
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
}
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
}
const WARNING = {
  lighter: '#FFFDE7',
  light: '#FFD54F',
  main: '#FF9800',
  dark: '#F57C00',
  darker: '#E65100',
}
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
}
const GREENLEMON = {
  lighter: '#e6eaad',
  light: '#d1eaa1',
  main: '#a7ce55',
  dark: '#7f9d2b',
  darker: '#5f7420',
}
const BLUE = {
  lighter: '#e3f1ff',
  light: '#b3d4ff',
  main: '#0066cc',
  dark: '#004080',
  darker: '#002040',
}
const PURPLE = {
  lighter: '#e7e5ff',
  light: '#bcb8ff',
  main: '#716aca',
  dark: '#463fa1',
  darker: '#2c2677',
}
const PINK = {
  lighter: '#ffe3eb',
  light: '#ffa1b3',
  main: '#dc1db3',
  dark: '#a71b8c',
  darker: '#771156',
}
const SALMON = {
  lighter: '#FFC6B7',
  light: '#ff785b',
  main: '#ff5733',
  dark: '#b23c23',
  darker: '#8C1700',
}

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  cyan: ['#2CA8FF', '#6CDFFF', '#A4E3FF', '#CFF4FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
  purple: ['#9E63FF', '#C0A3FF', '#D8C3FF', '#F0E3FF'],
  orange: ['#FF8C00', '#FFA940', '#FFC576', '#FFE8C0'],
  pink: ['#FF0080', '#FF4D9D', '#FF7EB6', '#FFB8D2'],
}

export const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
}

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
}

export const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  greenLemon: { ...GREENLEMON, contrastText: '#fff' },
  blue: { ...BLUE, contrastText: '#fff' },
  purple: { ...PURPLE, contrastText: '#fff' },
  pink: { ...PINK, contrastText: '#fff' },
  salmon: { ...SALMON, contrastText: '#fff' },
  cyan: { ...CYAN, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
}

export const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: GREY[100], default: '#ebebeb', neutral: GREY[300] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON.action },
  },
} as const
