import Store from 'electron-store'

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
  pageOffset: {
    type: 'number',
    minimum: 0,
    maximum: 500,
    default: 0
  },
  autoRun: {
    type: 'boolean',
    default: false
  },
  autoUpdate: {
    type: 'boolean',
    default: false
  },
  channelEnabled: {
    type: 'array',
    items: {
      type: 'boolean'
    },
    minItems: 16,
    maxItems: 16,
    default: new Array(16).fill(true)
  }
};

const store = new Store({ schema })

export function onSettingsSaved(func) {
  store.onDidAnyChange(func)
}

export function getSettings() {
  return {
    companionHost: store.get('companionHost'),
    companionPort: store.get('companionPort'),
    midiPort: store.get('midiPort'),
    pageOffset: store.get('pageOffset'),
    autoRun: store.get('autoRun'),
    autoUpdate: store.get('autoUpdate'),
    channelEnabled: store.get('channelEnabled')
  }
}

export function saveSettings(newSettings) {
  store.set(newSettings)
}

// Are we sufficiently configured to start listening for MIDI notes?
export function isConfigured() {
  const settings = getSettings()
  return (settings.companionHost != '') && (settings.midiPort != '')
}

export function isAutoUpdateEnabled() {
  const settings = getSettings()
  return settings.autoUpdate
}
