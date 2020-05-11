window.onmessage = async (event) => {
    let message = event.data.pluginMessage
    switch (message.type) {
        case "save":
            //make xml http request
            let request = new XMLHttpRequest()
            request.onreadystatechange = () => {
                if (request.readyState == XMLHttpRequest.DONE) {
                    console.log("Done! Here's the output: " + request.responseText)
                    window.parent.postMessage({ pluginMessage: {
                        type: 'success'
                    }}, '*')
                }
            }

            request.open("POST", message.url, true)
            request.setRequestHeader("Authorization", "token " + message.secret)
            request.setRequestHeader("Accept", "application/vnd.github.everest-preview+json")
            request.send(JSON.stringify(message.payload))
            break
    }
}

document.getElementById('save')!.onclick = () => {
    const urlInput = document.getElementById('apiURL')! as HTMLInputElement
    const apiKeyInput = document.getElementById('apiKey')! as HTMLInputElement

    parent.postMessage({ pluginMessage: {
        type: 'store',
        message: {
            url: urlInput.value,
            apiKey: apiKeyInput.value
        }
    } }, '*')
}
