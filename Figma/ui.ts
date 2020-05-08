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

            request.open("PUT", message.url, true)
            request.setRequestHeader("Content-Type", "application/json")
            request.setRequestHeader("secret-key", message.secret)
            request.send(message.payload)
            break
    }
}
