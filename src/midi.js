import { Input } from '@julusian/midi'
const midi_input = new Input()

export function getMidiPorts() {
  const port_count = midi_input.getPortCount();
  let ports = []
  for (let portIndex = 0; portIndex < port_count; portIndex++) {
    ports.push(midi_input.getPortName(portIndex))
  }
  return ports
}
