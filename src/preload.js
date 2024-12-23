const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getMidiPorts: () => ipcRenderer.invoke('getMidiPorts'),
  getSettings: () => ipcRenderer.invoke('getSettings'),
  saveSettings: (settings) => {ipcRenderer.invoke('saveSettings', settings)}
})
