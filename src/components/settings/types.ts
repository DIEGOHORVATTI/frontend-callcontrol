export type SettingsValueProps = {
  themeStretch: boolean
  themeMode: 'light' | 'dark'
  themeContrast: 'default' | 'bold'
  themeLayout: 'vertical' | 'horizontal' | 'mini'
  themeColorPresets: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
}

export type SettingsContextProps = SettingsValueProps & {
  // Update
  onUpdate: (name: string, value: string | boolean) => void
  // Direction by lang
  onChangeDirectionByLang: (lang: string) => void
  // Drawer
  open: boolean
  onToggle: VoidFunction
  onClose: VoidFunction
}
