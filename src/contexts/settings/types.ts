export type SettingsValueProps = {
  themeStretch: boolean
  themeMode: 'light' | 'dark'
  themeContrast: 'default' | 'bold'
  themeLayout: 'vertical' | 'horizontal' | 'mini'
  themeColorPresets: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
}

export type SettingsContextProps = SettingsValueProps & {
  onUpdate: (value: SettingsValueProps) => void
  onToggleMode: () => void
}
