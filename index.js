'use strict';

let clientAlreadyLoaded = false;

function loadHowxmClient() {
    clientAlreadyLoaded = true;
    new Promise(function(resolve, reject) {

        const script = document.createElement('script');
        script.src = 'https://static.howxm.com/sdk.js';

        script.onload = function() {
            resolve();
        }

        script.onerror = function() {
            reject(new Error('Could not load Howxm client.'));
        }

        document.head.appendChild(script);
    });
}

window._howxmQueue = window._howxmQueue || []

window._howxm = function() {
    if (!clientAlreadyLoaded) {
        loadHowxmClient();
    }
    _howxmQueue.push(arguments)
}

module.exports = window._howxm;
