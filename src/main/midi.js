import { Input } from '@julusian/midi'
import { getSettings, saveSettings } from './settings.js'

let midiInput

export function getMidiPorts() {
  const tempMidiInput = new Input()
  const portCount = tempMidiInput.getPortCount();
  let ports = []

  for (let portIndex = 0; portIndex < portCount; portIndex++) {
    ports.push(tempMidiInput.getPortName(portIndex))
  }

  tempMidiInput.destroy()
  return ports
}

export function startListening() {
  midiInput = new Input()
  const settings = getSettings()
	console.log(`Opening Midi port ${settings.midiPort}`)
  try {
    let val = midiInput.openPortByName(settings.midiPort)
  } catch (error) {
    let message = 'Unknown Error'
		if (error instanceof Error) message = error.message
    console.log(`Error connecting MIDI port: ${settings.midiPort}: ${message}`)
  }

  midiInput.removeAllListeners()

  midiInput.on('message', async (deltaTime, message) => {
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
  if (midiInput) {
    midiInput.destroy()
  }
}

export function isConnected() {
  let settings = getSettings()
  if (settings.midiPort == '') {
    return false
  } else {
    if (midiInput && midiInput.isPortOpen()) {
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
    signal: AbortSignal.timeout(5000),
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
