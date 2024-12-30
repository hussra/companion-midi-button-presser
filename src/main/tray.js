import { app, Tray, Menu, nativeImage } from 'electron'

import { openWindow } from './window.js'
import getIcon from './icon.js'
import pkg from '../../package.json' with { type: 'json' }

let tray

export default function createTray() {

  tray = new Tray(getIcon())

  const contextMenu = Menu.buildFromTemplate(
    [
      { label: 'Settings', type: 'normal', click: () => { openWindow('settings.html') } },
      { label: 'Help', type: 'normal', click: () => { openWindow('help.html') } },
      /*{ label: 'About', role: 'about' },*/
      { label: 'About', type: 'normal', click: () => { openWindow('about.html') } },
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
