import { ipcMain } from 'electron'
import { Input } from '@julusian/midi'

import getSettings from './settings.js'

const midi_input = new Input()

export default function addIpcHandlers() {
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
}
