import { BrowserWindow, shell, dialog } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import getIcon from './icon.js'
import { isChanged } from './settings.js'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

let mainWindow = null

export function openWindow(page) {
  // If window already exists, make sure it is focussed, and load the required page
  if (mainWindow) {
    mainWindow.loadFile(`src/renderer/${page}`)
    mainWindow.focus()
    return
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    },
  })
  mainWindow.menuBarVisible = false

  mainWindow.setIcon(getIcon())

  mainWindow.loadFile(`src/renderer/${page}`)

  mainWindow.on('close', (e) => {
    if (isChanged()) {
      let response = dialog.showMessageBoxSync(this, {
        type: 'question',
        buttons: ['Discard changes', 'Cancel'],
        title: 'Confirm',
        message: 'Are you sure? You have unsaved changes.',
        noLink: true
      })

      if (response == 1) {
        e.preventDefault()
      }
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Open urls with target="_blank" in a browser
    shell.openExternal(url);
    return { action: 'deny' };
  });
}
