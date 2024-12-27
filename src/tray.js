import { app, Tray, Menu, nativeImage } from 'electron'

import { openSettingsWindow, openHelpWindow } from './settingsWindow.js'
import getIcon from './icon.js'
import pkg from '../package.json' with { type: 'json' }

let tray

export default function createTray() {

  tray = new Tray(getIcon())

  const contextMenu = Menu.buildFromTemplate(
    [
      { label: 'Settings', type: 'normal', click: () => { openSettingsWindow() } },
      { label: 'Help', type: 'normal', click: () => { openHelpWindow() }},
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
