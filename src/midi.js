import { Input } from '@julusian/midi'
import { getSettings, saveSettings } from './settings.js'

let midi_input

export function getMidiPorts() {
  const temp_midi_input = new Input()
  const port_count = temp_midi_input.getPortCount();
  let ports = []

  for (let portIndex = 0; portIndex < port_count; portIndex++) {
    ports.push(temp_midi_input.getPortName(portIndex))
  }

  temp_midi_input.destroy()
  return ports
}

export function startListening() {
  midi_input = new Input()
  const settings = getSettings()
	console.log(`Opening Midi port ${settings.midiPort}`)
  try {
    let val = midi_input.openPortByName(settings.midiPort)
  } catch (error) {
    let message = 'Unknown Error'
		if (error instanceof Error) message = error.message
    console.log(`Error connecting MIDI port: ${settings.midiPort}: ${message}`)
  }

  midi_input.removeAllListeners()

  midi_input.on('message', async (deltaTime, message) => {
    const midiMessageIsNoteon = (message[0] & 0x90) == 0x90
    const midiMessageChannel = message[0] & 0x0f
    const midiMessageNote = message[1]
    const midiMessageVelocity = message[2]

    console.log(`MIDI Message: Midi Channel: ${midiMessageChannel}, Is Note On?: ${midiMessageIsNoteon}, Note: ${midiMessageNote}, Velocity: ${midiMessageVelocity}`,
    )
    if (midiMessageIsNoteon) {
      pressCompanionButton(midiMessageChannel, midiMessageNote, midiMessageVelocity)
    }
  })
}

export function stopListening() {
  console.log('Closing Midi port')
  if (midi_input) {
    midi_input.destroy()
  }
}

export function isConnected() {
  let settings = getSettings()
  if (settings.midiPort == '') {
    return false
  } else {
    if (midi_input && midi_input.isPortOpen()) {
      return true
    } else {
      settings.midiPort = ''
      saveSettings(settings)
      return false
    }
  }
}

function pressCompanionButton(page, row, column) {
  const settings = getSettings()
  // api/location/<page>/<row>/<column>/press
  // page = channel
  // row = note
  // column = velocity
  const buttonPressURL = `http://${settings.companionHost}:${settings.companionPort}/api/location/${page + 1 + settings.pageOffset}/${row}/${column}/press`
  console.log(`Sending button press HTTP request to ${buttonPressURL}`)

  fetch(buttonPressURL, {
    signal: AbortSignal.timeout(2000),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    console.log(`Button press response: ${response.status}: ${response.statusText}`)
  })
  .catch((error) => {
    console.log(`Error fetching ${buttonPressURL}: ${error}`)
  })
}
