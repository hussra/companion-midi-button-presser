import Store from 'electron-store'

const schema = {
  companion_host: {
    type: 'string',
    format: 'ipv4',
    default: '127.0.0.1'
  },
  companion_port: {
    type: 'number',
    minimum: 1,
    maximum: 65535,
    default: 8000
  },
  midi_port: {
    type: 'string'
  },
  virtual_midi_port_name: {
    type: 'string',
    default: 'CompanionMIDIButtonPresser'
  },
  page_offset: {
    type: 'number',
    minimum: 0,
    maximum: 500,
    default: 0
  }
};

export default function getSettings() {
  const store = new Store( {schema} )
  return store.get('companion_host')
}
