const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    icon: "assets/CompanionMidiButtonPresser",
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "companion-midi-button-presser",
        productName: "Companion MIDI Button Presser",
        iconUrl: "https://raw.githubusercontent.com/hussra/companion-midi-button-presser/refs/heads/main/assets/CompanionMidiButtonPresser.ico",
        setupIcon: "./assets/CompanionMidiButtonPresser.ico"
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
