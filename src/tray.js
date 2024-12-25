import { app, Tray, Menu, nativeImage } from 'electron'
import path from 'path'

import openSettingsWindow from './settingsWindow.js'
import pkg from '../package.json' with { type: 'json' }

let tray

export default function createTray() {

  const assetsPath = app.isPackaged ? path.join(process.resourcesPath, "app", "assets") : "assets";
  const icon = nativeImage.createFromPath(path.join(assetsPath, 'Black_question_mark.png'))
  
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate(
    [
      { label: 'Settings', type: 'normal', click: () => { openSettingsWindow() } },
      { label: 'About', role: 'about' },
      { role: 'quit' }
    ]
  )
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    tray.popUpContextMenu()
  })

  tray.setToolTip(pkg.description)
  tray.setTitle(pkg.description)
}
