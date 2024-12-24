import { app, Tray, Menu, nativeImage } from 'electron'

import openSettingsWindow from './settingsWindow.js'
import pkg from '../package.json' with { type: 'json' }

let tray

export default function createTray() {

  const icon = nativeImage.createFromPath('assets/Black_question_mark.png')
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
