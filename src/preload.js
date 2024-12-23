const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,

  getMidiPorts: () => ipcRenderer.invoke('getMidiPorts'),
  getCompanionHost: () => ipcRenderer.invoke('getCompanionHost')
})
