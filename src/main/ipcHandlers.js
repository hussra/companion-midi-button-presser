import { app, ipcMain } from 'electron'

import { getSettings, saveSettings, setChanged } from './settings.js'
import { getMidiPorts } from './midi.js'

export default function addIpcHandlers() {
  ipcMain.handle('getMidiPorts', () => {
    return getMidiPorts()
  })

  ipcMain.handle('getSettings', () => {
    return getSettings()
  })

  ipcMain.handle('saveSettings', async (event, settings) => {
    saveSettings(settings)
  })

  ipcMain.handle('setChanged', async (event, newValue) => {
    setChanged(newValue)
  })

  ipcMain.handle('getVersion', async () => {
    return await app.getVersion()
  })
}
