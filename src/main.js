import { app, ipcMain } from 'electron'

import setAboutPanelOptions from './about.js'
import openSettingsWindow from './settingsWindow.js'
import createTray from './tray.js'
import addIpcHandlers from './ipcHandlers.js'
import { loadSettings, isConfigured } from './settings.js'
import { startListening } from './midi.js'

app.whenReady().then(() => {
  loadSettings()
  addIpcHandlers()
  createTray()
  setAboutPanelOptions()

  if (isConfigured()) {
    startListening()
  } else {
    openSettingsWindow()
  }
  
  app.on('activate', () => {
    openSettingsWindow()
  })

  app.on('window-all-closed', (event) => {
    event.preventDefault()
  })

})
