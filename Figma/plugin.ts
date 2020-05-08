// Store secrets for JSONbin API
let apiURL = "https://api.jsonbin.io/b/5eb5ba3f47a2266b14751a93"
let apiSecret = "$2b$10$zRxcPMOEJLjgbqOfxpYEy.s4WCijePfWZ4fY8lHKs9BTtT3V/DMHm"

// Show invisible UI for Figma plugin
figma.showUI(__html__, { visible: false })
figma.ui.onmessage = (event) => {
    switch (event.type) {
        case 'notify':
            figma.notify(event.message)
            break
        case 'success':
            figma.notify('Successfully uploaded all styles!')
            figma.closePlugin()
            break
    }
}

// Define some classes for the Style Conversion code
class ColorToken {
    name: string
    value: RGB
}

class Colors {
    colors: ColorToken[] = []
}

// Initialize the payload that we're going to send to ui.ts
var payload = new Colors()

// Setup styles and convert to JSON
let styles = figma.getLocalPaintStyles()
if (styles) {
    for (let color of styles) {
        for (let paint of color.paints) {
            if (paint.type == "SOLID") {
                var token = new ColorToken()
                token.name = color.name
                token.value = paint.color
                payload.colors.push(token)
            }
        }
    }
} else {
    figma.notify('There are no color styles in the document')
}

// Post a message to ui.ts which will handle the upload to JSONbin
if (payload.colors.length > 0) {
    figma.notify('Successfully found styles. Sending to JSONbin.io...')
    figma.ui.postMessage({
        'type': 'save',
        'url': apiURL,
        'secret': apiSecret,
        'payload': JSON.stringify(payload)
    })
} else {
    figma.notify('No color styles found in this document!')
}
