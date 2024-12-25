import Store from 'electron-store'

let settings = null

const schema = {
  companionHost: {
    type: 'string',
    pattern: '(^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$)',
    default: '127.0.0.1'
  },
  companionPort: {
    type: 'number',
    minimum: 1,
    maximum: 65535,
    default: 8000
  },
  midiPort: {
    type: 'string',
    default: ''
  },
  virtualMidiPortName: {
    type: 'string',
    default: 'CompanionMIDIButtonPresser'
  },
  pageOffset: {
    type: 'number',
    minimum: 0,
    maximum: 500,
    default: 0
  }
};

export function getSettings() {
  if (!settings) {
    loadSettings()
  }
  return settings
}

export function loadSettings() {
  const store = new Store( {schema} )

  settings = {
    companionHost: store.get('companionHost'),
    companionPort: store.get('companionPort'),
    midiPort: store.get('midiPort'),
    virtualMidiPortName: store.get('virtualMidiPortName'),
    pageOffset: store.get('pageOffset')
  }
}

export function saveSettings(newSettings) {
  const store = new Store( {schema} )
  store.set(newSettings)
  settings = newSettings
}

export function isConfigured() {
  const settings = getSettings()
  return (settings.companionHost != '') && (settings.midiPort != '')
}
