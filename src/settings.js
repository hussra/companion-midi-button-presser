import Store from 'electron-store'

const schema = {
  companionHost: {
    type: 'string',
    format: 'ipv4',
    default: '127.0.0.1'
  },
  companionPort: {
    type: 'number',
    minimum: 1,
    maximum: 65535,
    default: 8000
  },
  midiPort: {
    type: 'string'
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
  const store = new Store( {schema} )

  let settings = {
    companionHost: store.get('companionHost'),
    companionPort: store.get('companionPort'),
    midiPort: store.get('midiPort'),
    virtualMidiPortName: store.get('virtualMidiPortName'),
    pageOffset: store.get('pageOffset')
  }

  return settings
}

export function saveSettings(settings) {
  const store = new Store( {schema} )
  store.set(settings)
}
