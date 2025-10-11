import { app } from 'electron'
import path from 'path'
import { existsSync } from 'fs'

import { openWindow } from './window.js'
import createTray from './tray.js'
import addIpcHandlers from './ipcHandlers.js'
import { isConfigured, isAutoUpdateEnabled, onSettingsSaved, getSettings } from './settings.js'
import { startListening, stopListening, isConnected } from './midi.js'

import started from 'electron-squirrel-startup'
import { updateElectronApp } from 'update-electron-app'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

// Auto update from GitHub releases (disabled by default)
if (isAutoUpdateEnabled()) {
  updateElectronApp()
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {

  if ((process.platform == 'win32') && (getSettings().autoRun) && (app.isPackaged)) {
    // Check the autoRun path is correct - was wrong in <= 1.2.0
    let launchItemsV100 = app.getLoginItemSettings({ path: getAutorunLauncherPathV100() }).launchItems

    if (launchItemsV100.length > 0) {
      setAutoRun(true)
    }
  }

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
      stopListening()

      if (isConfigured()) {
        startListening()
      }

      setAutoRun(newValue.autoRun)
    })

    app.on('activate', () => {
      openWindow('settings.html')
    })

    app.on('window-all-closed', (event) => {
      event.preventDefault()
    })

  })
}

function setAutoRun(enable) {
  app.setLoginItemSettings({
    openAtLogin: enable,
    path: getAutorunLauncherPath()
  })
}

function getAutorunLauncherPath() {
  const appFolder = path.dirname(process.execPath)
  const ourExeName = path.basename(process.execPath)
  const stubLauncher = path.resolve(appFolder, '..', ourExeName)

  return existsSync(stubLauncher) ? stubLauncher : process.execPath
}

function getAutorunLauncherPathV100() {
  const appFolder = path.dirname(process.execPath)
  const ourExeName = path.basename(process.execPath)
  return path.resolve(appFolder, '..', 'app-1.0.0', ourExeName)
}
