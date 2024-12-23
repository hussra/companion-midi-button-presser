import { app, ipcMain } from 'electron'

import setAboutPanelOptions from './about.js'
import openSettingsWindow from './settingsWindow.js'
import createTray from './tray.js'
import addIpcHandlers from './ipc.js'

app.whenReady().then(() => {

  addIpcHandlers()
  createTray()
  openSettingsWindow()
  setAboutPanelOptions()

  app.on('activate', () => {
    openSettingsWindow()
  })

  app.on('window-all-closed', (event) => {
    event.preventDefault()
  })

  // app.setAboutPanelOptions({
  //   'applicationName': 'Companion MIDI Button Presser',
  //   'applicationVersion': '1.0.0',
  //   'copyright': '© 2024 Richard Huss',
  //   'authors': 'Richard Huss'
  // })
})
