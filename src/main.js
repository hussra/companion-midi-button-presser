import { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } from 'electron'
import { Input } from '@julusian/midi'
import getSettings from './settings.js'
import openSettingsWindow from './settingsWindow.js'

const midi_input = new Input()

let tray

app.whenReady().then(() => {

  ipcMain.handle('getMidiPorts', () => {
    const port_count = midi_input.getPortCount();
    let ports = []
    for (let portIndex = 0; portIndex < port_count; portIndex++) {
      ports.push(midi_input.getPortName(portIndex))
    }
    return ports
  })

  
  ipcMain.handle('getCompanionHost', () => {
    return getSettings()
  })

  const icon = nativeImage.createFromPath('assets/Black_question_mark.png')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Settings', type: 'normal', click: () => { openSettingsWindow() } },
    { label: 'Exit', type: 'normal', click: () => { app.quit() } }
  ])
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    tray.popUpContextMenu()
  })

  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')

  openSettingsWindow()

  app.on('activate', () => {
    openSettingsWindow()
  })

  app.on('window-all-closed', (event) => {
    //if (process.platform !== 'darwin') app.quit()
    event.preventDefault()
  })
})
