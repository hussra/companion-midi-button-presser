import { app, Tray, Menu, nativeImage } from 'electron'
import openSettingsWindow from './settingsWindow.js'

let tray

export default function createTray() {

  const icon = nativeImage.createFromPath('assets/Black_question_mark.png')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Settings', type: 'normal', click: () => { openSettingsWindow() } },
    { role: 'quit' }
  ])
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    tray.popUpContextMenu()
  })

  tray.setToolTip('Companion Midi Button Presser')
  tray.setTitle('Companion Midi Button Presser')
}
