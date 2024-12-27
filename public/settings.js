async function populateMidiPorts() {
  const midiPorts = await window.electronAPI.getMidiPorts();

  const midiPortSelect = document.getElementById('midiPort');
  for (let i in midiPorts) {
    let option = document.createElement('option');
    option.innerHTML = midiPorts[i];
    option.setAttribute('value', midiPorts[i]);
    midiPortSelect.append(option);
  }
} 

async function populateSettings() {
  const settings = await window.electronAPI.getSettings();
  document.getElementById('companionHost').value = settings.companionHost
  document.getElementById('companionPort').value = settings.companionPort
  document.getElementById('midiPort').value = settings.midiPort
  document.getElementById('pageOffset').value = settings.pageOffset
  document.getElementById('autoRun').checked = (settings.autoRun ? 'checked' : '')
}

const save = async (event) => {
  event.preventDefault()

  const settings = {
    companionHost: document.getElementById('companionHost').value,
    companionPort: parseInt(document.getElementById('companionPort').value),
    midiPort: document.getElementById('midiPort').value,
    pageOffset: parseInt(document.getElementById('pageOffset').value),
    autoRun: (document.getElementById('autoRun').checked)
  }

  window.electronAPI.saveSettings(settings)
  window.close()
}

const load = async () => {
  populateMidiPorts()
  populateSettings()
  document.getElementById('saveButton').addEventListener('click', save)
}
load()
