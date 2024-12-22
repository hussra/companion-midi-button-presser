import { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } from 'electron'
import Store from 'electron-store'
import { Input } from '@julusian/midi'

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const storeSchema = {
  companion_host: {
    type: 'string',
    format: 'ipv4',
    default: '127.0.0.1'
  },
  companion_port: {
    type: 'number',
    minimum: 1,
    maximum: 65535,
    default: 8000
  },
  midi_port: {
    type: 'string'
  },
  virtual_midi_port_name: {
    type: 'string',
    default: 'CompanionMIDIButtonPresser'
  },
  page_offset: {
    type: 'number',
    minimum: 0,
    maximum: 500,
    default: 0
  }
}

const store = new Store({storeSchema});

const midi_input = new Input()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  win.menuBarVisible = false
  win.loadFile('public/index.html')
}

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

  const icon = nativeImage.createFromPath('assets/Black_question_mark.png')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Settings', type: 'normal', click: () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      } else {
        BrowserWindow.getAllWindows()[0].show();
      }}
    },
    { label: 'Exit', type: 'normal', click: () => { app.quit() } }
  ])
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    tray.popUpContextMenu()
  })

  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    } else {
      BrowserWindow.getAllWindows()[0].show()
    }
  })

  app.on('window-all-closed', (event) => {
    //if (process.platform !== 'darwin') app.quit()
    event.preventDefault()
  })
})
