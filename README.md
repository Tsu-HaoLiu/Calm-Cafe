# Calm Café Sounds

This is a browser extension that plays ambient sounds to help you focus while working or studying. It is built with JavaScript, React, and Tailwind CSS.

## Features

- Choose from several ambient sounds: Campfire, Lofi, Rain, Printer, etc.
- Adjust the volume of the sounds
- Pause all sounds
- Reset/Mute all sounds
- Dark mode 

## Usage

- Click on the browser extension icon to open the ambient sounds panel
- Select a sound from the popup
- Use the volume slider to adjust the volume
- Click the pause button to pause all sounds
- Click the mute button to reset/mute all sounds

## Installation / Development

The extension is not yet published to the Chrome Web Store or Firefox Add-ons. To install it locally:

- Clone this repository
- Run `npm install` to install dependencies
- Run `npm run build` to build the extension
- Go to Chrome/Firefox Extensions page and enable Developer mode
- Click on "Load unpacked" and select the extension folder
- The extension should now be installed

## Adding more sounds

Please create an issue if you want more sounds to be added.

https://github.com/Tsu-HaoLiu/sound-of-success/issues


## Contributing

Suggestions and pull requests are welcomed!


## TODO
- Check compatibility for Chrome (V3)
- Add sounds without needing an extension update
- Find alternatives for `EventEmitter` might run into performance issues when more sounds are added
- Better logging
- Add hover effects to Header buttons
- Add footer w/ more info
- Custom audio uploads
