const func = async () => {
  const response = await window.versions.getMidiPorts()

  const midiPorts = document.getElementById('midiPorts')
  midiPorts.innerText = JSON.stringify(response)

  const information = document.getElementById('info')
  information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

  const settings = await window.versions.getSettings()
  document.querySelector('#companionHost').value = settings.companionHost
  document.querySelector('#companionPort').value = settings.companionPort
  document.querySelector('#midiPort').value = settings.midiPort
  document.querySelector('#virtualMidiPortName').value = settings.virtualMidiPortName
  document.querySelector('#pageOffset').value = settings.pageOffset
}

func()
