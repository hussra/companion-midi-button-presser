import { BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

let settingsWindow = null

export function openSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus()
    return
  }

  settingsWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  settingsWindow.menuBarVisible = false
  settingsWindow.loadFile('public/settingsPage.html')

  settingsWindow.on('closed', () => {
    settingsWindow = null
  })
}

export function openHelpWindow() {

}
