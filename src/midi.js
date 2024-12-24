import { Input } from '@julusian/midi'
import { getSettings } from './settings.js';

const midi_input = new Input()

export function getMidiPorts() {
  const port_count = midi_input.getPortCount();
  let ports = []
  for (let portIndex = 0; portIndex < port_count; portIndex++) {
    ports.push(midi_input.getPortName(portIndex))
  }
  return ports
}

export function startListening() {
  const settings = getSettings()
  try {
    console.log('Opening MIDI port ' + settings.midiPort)
    midi_input.openPortByName(settings.midiPort)
  } catch (error) {
    let message = 'Unknown Error'
		if (error instanceof Error) message = error.message
    console.log('Error connecting MIDI post: ')
  }

  midi_input.removeAllListeners()

  midi_input.on('message', async (deltaTime, message) => {
    const midiMessageIsNoteon = (message[0] & 0x90) == 0x90
    const midiMessageChannel = message[0] & 0x0f
    const midiMessageNote = message[1]
    const midiMessageVelocity = message[2]
    console.log(
      'debug',
      `MIDI Message: Midi Channel: ${midiMessageChannel}, Is Note On?: ${midiMessageIsNoteon}, Note: ${midiMessageNote}, Velocity: ${midiMessageVelocity}, Delta Time: ${deltaTime}`,
    )
  })
}

export function stopListening() {
  if (midi_input.isPortOpen()) {
		console.log('debug', 'Closing Midi port')
    midi_input.closePort()
    midi_input.destroy()
    midi_input = new Input()
  }
}
