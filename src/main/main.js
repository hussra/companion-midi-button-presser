import { app, ipcMain } from 'electron'

import { openWindow } from './window.js'
import createTray from './tray.js'
import addIpcHandlers from './ipcHandlers.js'
import { isConfigured, onSettingsSaved } from './settings.js'
import { startListening, stopListening, isConnected } from './midi.js'

import started from 'electron-squirrel-startup'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    openWindow('settings.html')
  })

  app.whenReady().then(() => {
    addIpcHandlers()
    createTray()

    if (isConfigured()) {
      startListening()
    }
    
    if (!isConnected()) {
      openWindow('settings.html')
    }

    onSettingsSaved((newValue, oldValue) => {
      console.log('onSettingsSaved')
      stopListening()

      if (isConfigured()) {
        startListening()
      }

      app.setLoginItemSettings({
        openAtLogin: newValue.autoRun
      })
    })

    app.on('activate', () => {
      openWindow('settings.html')
    })

    app.on('window-all-closed', (event) => {
      event.preventDefault()
    })

  })
}
