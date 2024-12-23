import { app, ipcMain } from 'electron'

import openSettingsWindow from './settingsWindow.js'
import createTray from './tray.js'
import addIpcHandlers from './ipc.js'

app.whenReady().then(() => {

  addIpcHandlers()
  createTray()
  openSettingsWindow()

  app.on('activate', () => {
    openSettingsWindow()
  })

  app.on('window-all-closed', (event) => {
    event.preventDefault()
  })
})
