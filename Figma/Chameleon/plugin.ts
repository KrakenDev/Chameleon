// Store secrets for GitHub Actions API
var apiURL: string
var apiSecret: string

// Define some classes for the Style Conversion code
class ColorToken {
    name: string
    value: RGB
}

class Colors {
    colors: ColorToken[] = []
}

// Start monitoring for messages from the ui.ts file
figma.ui.onmessage = (event) => {
    switch (event.type) {
        case 'notify':
            figma.notify(event.message)
            break
        case 'store':
            apiURL = event.message.url.replace(
                'https://github.com/', 'https://api.github.com/repos/'
            ) + '/dispatches'
            apiSecret = event.message.apiKey

            console.log('Sending API Key to URL: ' + apiURL)
            getStylesAndSendToGitHub()
            break
        case 'success':
            figma.notify('Successfully uploaded all styles!')
            figma.closePlugin()
            break
    }
}

function getStylesAndSendToGitHub() {
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

    // Post a message to ui.ts which will handle the upload to GitHub Actions
    if (payload.colors.length > 0) {
        figma.notify('Successfully found styles. Sending style information to GitHub...')
        figma.ui.postMessage({
            'type': 'save',
            'url': apiURL,
            'secret': apiSecret,
            'payload': {
                "event_type": "update_colors",
                "client_payload": payload
            }
        })
    } else {
        figma.notify('No color styles found in this document!')
    }
}

figma.showUI(__html__)
