const populateSettings = async () => {
  const settings = await window.electronAPI.getSettings()

  document.getElementById('companionHost').value = settings.companionHost
  document.getElementById('companionPort').value = settings.companionPort
  document.getElementById('pageOffset').value = settings.pageOffset
  document.getElementById('autoRun').checked = (settings.autoRun ? 'checked' : '')
  document.getElementById('autoUpdate').checked = (settings.autoUpdate ? 'checked' : '')

  for (let i = 0; i < 16; i++) {
    document.getElementById('enableChannel' + (i + 1)).checked = (settings.channelEnabled[i] ? 'checked' : '')
  }
}

const populatePorts = async (event) => {
  // Remove all but '--Select MIDI In port--'
  for (const el of document.querySelectorAll('#midiPort option')) {
    if (el.value !== '') {
      el.remove()
    }
  }

  const midiPorts = await window.electronAPI.getMidiPorts()

  const midiPortSelect = document.getElementById('midiPort')
  if (midiPorts.length == 0) {
    document.getElementById('noMidiPorts').classList.remove("d-none")
  } else {
    document.getElementById('noMidiPorts').classList.add("d-none")
  }

  for (let i in midiPorts) {
    let option = document.createElement('option')
    option.innerHTML = midiPorts[i]
    option.setAttribute('value', midiPorts[i])
    midiPortSelect.append(option)
  }

  // Only set midi port if the existing value actually exists as a MIDI in port
  const settings = await window.electronAPI.getSettings()
  if (midiPorts.indexOf(settings.midiPort) != -1) {
    document.getElementById('midiPort').value = settings.midiPort
  }
}

const save = async (event) => {
  event.preventDefault()

  let channelEnabled = []
  for (let i = 0; i < 16; i++) {
    channelEnabled.push((document.getElementById('enableChannel' + (i + 1)).checked))
  }

  const settings = {
    companionHost: document.getElementById('companionHost').value,
    companionPort: parseInt(document.getElementById('companionPort').value),
    midiPort: document.getElementById('midiPort').value,
    pageOffset: parseInt(document.getElementById('pageOffset').value),
    autoRun: (document.getElementById('autoRun').checked),
    autoUpdate: (document.getElementById('autoUpdate').checked),
    channelEnabled: channelEnabled
  }

  window.electronAPI.saveSettings(settings)
  window.close()
}

const load = async () => {
  await populateSettings()
  await populatePorts()
  document.getElementById('saveButton').addEventListener('click', save)
  document.getElementById('refreshButton').addEventListener('click', populatePorts)
}
load()
