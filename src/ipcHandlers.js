import { ipcMain } from 'electron'

import { getSettings, saveSettings } from './settings.js'
import { getMidiPorts, startListening, stopListening } from './midi.js'

export default function addIpcHandlers() {
  ipcMain.handle('getMidiPorts', () => {
    return getMidiPorts()
  })
  
  ipcMain.handle('getSettings', () => {
    return getSettings()
  })

  ipcMain.handle('saveSettings', async(event, settings) => {
    saveSettings(settings)
    stopListening()
    startListening()
    return true
  })
}
