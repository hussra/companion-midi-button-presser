import { ipcMain } from 'electron'

import { getSettings, saveSettings } from './settings.js'
import { getMidiPorts } from './midi.js'

export default function addIpcHandlers() {
  ipcMain.handle('getMidiPorts', () => {
    return getMidiPorts()
  })
  
  ipcMain.handle('getSettings', () => {
    return getSettings()
  })

  ipcMain.handle('saveSettings', async(event, settings) => {
    console.log('saving ' + JSON.stringify(settings))
    saveSettings(settings)
    return true
  })
}
