import { app } from 'electron'

import pkg from '../package.json' with { type: 'json' }

export default function setAboutPanelOptions() {
    app.setAboutPanelOptions({
      'applicationName': pkg.description,
      'applicationVersion': pkg.version,
      'copyright': '© 2024 ' + pkg.author,
      'authors': pkg.author
    })
}
