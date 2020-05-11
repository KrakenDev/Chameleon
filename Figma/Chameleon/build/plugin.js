/* Chameleon/build/plugin.js 0 */
(function(exports){

'use strict';

var VERSION = "0", DEBUG = false;
var global=void 0!==global?global:"undefined"!=typeof window?window:this;function _stackTrace(cons){const x={stack:""};if(Error.captureStackTrace){Error.captureStackTrace(x,cons);const p=x.stack.indexOf("\n");if(-1!=p)return x.stack.substr(p+1)}return x.stack}function _parseStackFrame(sf){let m=/^\s*at\s+([^\s]+)\s+\((?:.+\/(src\/[^\:]+)|([^\:]+))\:(\d+)\:(\d+)\)$/.exec(sf);return m?{func:m[1],file:m[2]||m[3],line:parseInt(m[4]),col:parseInt(m[5])}:null}function panic(msg){if(console.error.apply(console,["panic:",msg].concat(Array.prototype.slice.call(arguments,1))),"undefined"==typeof process){let e=new Error(msg);throw e.name="Panic",e}console.error(_stackTrace(panic)),process.exit(2)}function print(){console.log.apply(console,Array.prototype.slice.call(arguments))}const dlog=()=>{};function assert(){}function repr(obj){try{return JSON.stringify(obj,null,2)}catch(_){return String(obj)}}


var apiURL;
var apiSecret;
class ColorToken {
}
class Colors {
    constructor() {
        this.colors = [];
    }
}
figma.ui.onmessage = (event) => {
    switch (event.type) {
        case 'notify':
            figma.notify(event.message);
            break;
        case 'store':
            apiURL = event.message.url.replace('https://github.com/', 'https://api.github.com/repos/') + '/dispatches';
            apiSecret = event.message.apiKey;
            console.log('Sending API Key to URL: ' + apiURL);
            getStylesAndSendToGitHub();
            break;
        case 'success':
            figma.notify('Successfully uploaded all styles!');
            figma.closePlugin();
            break;
    }
};
function getStylesAndSendToGitHub() {
    var payload = new Colors();
    let styles = figma.getLocalPaintStyles();
    if (styles) {
        for (let color of styles) {
            for (let paint of color.paints) {
                if (paint.type == "SOLID") {
                    var token = new ColorToken();
                    token.name = color.name;
                    token.value = paint.color;
                    payload.colors.push(token);
                }
            }
        }
    }
    else {
        figma.notify('There are no color styles in the document');
    }
    if (payload.colors.length > 0) {
        figma.notify('Successfully found styles. Sending style information to GitHub...');
        figma.ui.postMessage({
            'type': 'save',
            'url': apiURL,
            'secret': apiSecret,
            'payload': {
                "event_type": "update_colors",
                "client_payload": payload
            }
        });
    }
    else {
        figma.notify('No color styles found in this document!');
    }
}
figma.showUI(__html__);
})(typeof exports != "undefined" ? exports : (typeof global != "undefined" ? global : typeof self != "undefined" ? self : this)["plugin"] = {});


//#sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLlVzZXJzLmtyYWtlbi5Eb2N1bWVudHMuS3Jha2VuRGV2LkNoYW1lbGVvbi5GaWdtYS5DaGFtZWxlb24uYnVpbGQucGx1Z2luLmpzLm1hcCIsInNvdXJjZXMiOlsiLi4vcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLElBQUksTUFBYyxDQUFBO0FBQ2xCLElBQUksU0FBaUIsQ0FBQTtBQUdyQixNQUFNLFVBQVU7Q0FHZjtBQUVELE1BQU0sTUFBTTtJQUFaO1FBQ0ksV0FBTSxHQUFpQixFQUFFLENBQUE7S0FDNUI7Q0FBQTtBQUdELEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSztJQUN2QixRQUFRLEtBQUssQ0FBQyxJQUFJO1FBQ2QsS0FBSyxRQUFRO1lBQ1QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDM0IsTUFBSztRQUNULEtBQUssT0FBTztZQUNSLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQzlCLHFCQUFxQixFQUFFLCtCQUErQixDQUN6RCxHQUFHLGFBQWEsQ0FBQTtZQUNqQixTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUE7WUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxNQUFNLENBQUMsQ0FBQTtZQUNoRCx3QkFBd0IsRUFBRSxDQUFBO1lBQzFCLE1BQUs7UUFDVCxLQUFLLFNBQVM7WUFDVixLQUFLLENBQUMsTUFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUE7WUFDakQsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ25CLE1BQUs7S0FDWjtBQUNMLENBQUMsQ0FBQTtBQUVELFNBQVMsd0JBQXdCO0lBRTdCLElBQUksT0FBTyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUE7SUFHMUIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDeEMsSUFBSSxNQUFNLEVBQUU7UUFDUixLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUN0QixLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQzVCLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUU7b0JBQ3ZCLElBQUksS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUE7b0JBQzVCLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQTtvQkFDdkIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO29CQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDN0I7YUFDSjtTQUNKO0tBQ0o7U0FBTTtRQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtLQUM1RDtJQUdELElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQzNCLEtBQUssQ0FBQyxNQUFNLENBQUMsbUVBQW1FLENBQUMsQ0FBQTtRQUNqRixLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNqQixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxNQUFNO1lBQ2IsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxFQUFFO2dCQUNQLFlBQVksRUFBRSxlQUFlO2dCQUM3QixnQkFBZ0IsRUFBRSxPQUFPO2FBQzVCO1NBQ0osQ0FBQyxDQUFBO0tBQ0w7U0FBTTtRQUNILEtBQUssQ0FBQyxNQUFNLENBQUMseUNBQXlDLENBQUMsQ0FBQTtLQUMxRDtBQUNMLENBQUM7QUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7OzsiLCJzb3VyY2VSb290IjoiLi4ifQ==
