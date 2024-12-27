import { BrowserWindow, shell, app, nativeImage } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import getIcon from './icon.js'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

let mainWindow = null

export function openWindow(page) {
  // If window already exists, make sure it is focussed, and load the required page
  if (mainWindow) {
    mainWindow.loadFile(`public/${page}`)
    mainWindow.focus()
    return
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  mainWindow.menuBarVisible = false

  mainWindow.setIcon(getIcon())

  mainWindow.loadFile(`public/${page}`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Open urls with target="_blank" in a browser
    shell.openExternal(url);
    return { action: 'deny' };
  });
}
