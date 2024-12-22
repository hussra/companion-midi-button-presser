const func = async () => {
  const response = await window.versions.getMidiPorts()

  const midiPorts = document.getElementById('midiPorts')
  midiPorts.innerText = JSON.stringify(response)

  const information = document.getElementById('info')
  information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
}

func()
