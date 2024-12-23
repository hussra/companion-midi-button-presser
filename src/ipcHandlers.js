import { ipcMain } from 'electron'

import getSettings from './settings.js'
import { getMidiPorts } from './midi.js'

export default function addIpcHandlers() {
  ipcMain.handle('getMidiPorts', () => {
    return getMidiPorts()
  })
  
  ipcMain.handle('getSettings', () => {
    return getSettings()
  })
}
