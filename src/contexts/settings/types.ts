import { CHART_COLORS } from '@/theme/palette'

export type SettingsValueProps = {
  themeStretch: boolean
  themeMode: 'light' | 'dark'
  themeContrast: 'default' | 'bold'
  themeLayout: 'vertical' | 'horizontal' | 'mini'
  themeColorPresets: keyof typeof CHART_COLORS
}

export type SettingsContextProps = SettingsValueProps & {
  onUpdate: (value: SettingsValueProps) => void
  onToggleMode: () => void
  onPresetsChange: (value: SettingsValueProps['themeColorPresets']) => void
}
