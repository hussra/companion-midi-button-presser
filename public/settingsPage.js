const func = async () => {
  const response = await window.electronAPI.getMidiPorts()

  const midiPorts = document.getElementById('midiPorts')
  midiPorts.innerText = JSON.stringify(response)

  const settings = await window.electronAPI.getSettings()
  document.querySelector('#companionHost').value = settings.companionHost
  document.querySelector('#companionPort').value = settings.companionPort
  document.querySelector('#midiPort').value = settings.midiPort
  document.querySelector('#virtualMidiPortName').value = settings.virtualMidiPortName
  document.querySelector('#pageOffset').value = settings.pageOffset

  const saveButton = document.querySelector('#saveButton')
  saveButton.addEventListener('click', async () => {
    const newSettings = {
      companionHost: document.querySelector('#companionHost').value,
      companionPort: parseInt(document.querySelector('#companionPort').value),
      midiPort: document.querySelector('#midiPort').value,
      virtualMidiPortName: document.querySelector('#virtualMidiPortName').value,
      pageOffset: parseInt(document.querySelector('#pageOffset').value)
    }

    window.electronAPI.saveSettings(newSettings)
  })
}

func()
