/* Figma/build/plugin.js 0 */
(function(exports){

'use strict';

var VERSION = "0", DEBUG = false;
var global=void 0!==global?global:"undefined"!=typeof window?window:this;function _stackTrace(cons){const x={stack:""};if(Error.captureStackTrace){Error.captureStackTrace(x,cons);const p=x.stack.indexOf("\n");if(-1!=p)return x.stack.substr(p+1)}return x.stack}function _parseStackFrame(sf){let m=/^\s*at\s+([^\s]+)\s+\((?:.+\/(src\/[^\:]+)|([^\:]+))\:(\d+)\:(\d+)\)$/.exec(sf);return m?{func:m[1],file:m[2]||m[3],line:parseInt(m[4]),col:parseInt(m[5])}:null}function panic(msg){if(console.error.apply(console,["panic:",msg].concat(Array.prototype.slice.call(arguments,1))),"undefined"==typeof process){let e=new Error(msg);throw e.name="Panic",e}console.error(_stackTrace(panic)),process.exit(2)}function print(){console.log.apply(console,Array.prototype.slice.call(arguments))}const dlog=()=>{};function assert(){}function repr(obj){try{return JSON.stringify(obj,null,2)}catch(_){return String(obj)}}


let apiURL = "https://api.jsonbin.io/b/5eb5ba3f47a2266b14751a93";
let apiSecret = "$2b$10$zRxcPMOEJLjgbqOfxpYEy.s4WCijePfWZ4fY8lHKs9BTtT3V/DMHm";
figma.showUI(__html__, { visible: false });
figma.ui.onmessage = (event) => {
    switch (event.type) {
        case 'notify':
            figma.notify(event.message);
            break;
        case 'success':
            figma.notify('Successfully uploaded all styles!');
            figma.closePlugin();
            break;
    }
};
class ColorToken {
}
class Colors {
    constructor() {
        this.colors = [];
    }
}
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
    figma.notify('Successfully found styles. Sending to JSONbin.io...');
    figma.ui.postMessage({
        'type': 'save',
        'url': apiURL,
        'secret': apiSecret,
        'payload': JSON.stringify(payload)
    });
}
else {
    figma.notify('No color styles found in this document!');
}
})(typeof exports != "undefined" ? exports : (typeof global != "undefined" ? global : typeof self != "undefined" ? self : this)["plugin"] = {});


//#sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLlVzZXJzLmtyYWtlbi5Eb3dubG9hZHMuQ2hhbWVsZW9uLkZpZ21hLmJ1aWxkLnBsdWdpbi5qcy5tYXAiLCJzb3VyY2VzIjpbIi4uL3BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxJQUFJLE1BQU0sR0FBRyxtREFBbUQsQ0FBQTtBQUNoRSxJQUFJLFNBQVMsR0FBRyw4REFBOEQsQ0FBQTtBQUc5RSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0FBQzFDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSztJQUN2QixRQUFRLEtBQUssQ0FBQyxJQUFJO1FBQ2QsS0FBSyxRQUFRO1lBQ1QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDM0IsTUFBSztRQUNULEtBQUssU0FBUztZQUNWLEtBQUssQ0FBQyxNQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtZQUNqRCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDbkIsTUFBSztLQUNaO0FBQ0wsQ0FBQyxDQUFBO0FBR0QsTUFBTSxVQUFVO0NBR2Y7QUFFRCxNQUFNLE1BQU07SUFBWjtRQUNJLFdBQU0sR0FBaUIsRUFBRSxDQUFBO0tBQzVCO0NBQUE7QUFHRCxJQUFJLE9BQU8sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFBO0FBRzFCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0FBQ3hDLElBQUksTUFBTSxFQUFFO0lBQ1IsS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7UUFDdEIsS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzVCLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUU7Z0JBQ3ZCLElBQUksS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUE7Z0JBQzVCLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQTtnQkFDdkIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO2dCQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUM3QjtTQUNKO0tBQ0o7Q0FDSjtLQUFNO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO0NBQzVEO0FBR0QsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7SUFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxxREFBcUQsQ0FBQyxDQUFBO0lBQ25FLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ2pCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsS0FBSyxFQUFFLE1BQU07UUFDYixRQUFRLEVBQUUsU0FBUztRQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7S0FDckMsQ0FBQyxDQUFBO0NBQ0w7S0FBTTtJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMseUNBQXlDLENBQUMsQ0FBQTs7Ozs7Iiwic291cmNlUm9vdCI6Ii4uIn0=
