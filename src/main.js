import { app, ipcMain } from 'electron'

import setAboutPanelOptions from './about.js'
import openSettingsWindow from './settingsWindow.js'
import createTray from './tray.js'
import addIpcHandlers from './ipcHandlers.js'
import { loadSettings, isConfigured } from './settings.js'

app.whenReady().then(() => {
  loadSettings()
  addIpcHandlers()
  createTray()
  setAboutPanelOptions()

  if (!isConfigured()) {
    openSettingsWindow()
  }
  
  app.on('activate', () => {
    openSettingsWindow()
  })

  app.on('window-all-closed', (event) => {
    event.preventDefault()
  })

})
