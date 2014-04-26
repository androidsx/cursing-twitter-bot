/**
 * Cursing API basic client.
 *
 * Usage:
 *  var Cursing = require('./cursing-api-client')
 *  var cursing = new Cursing("http://server.com", 12345)
 *
 *  cursing.insultify("Hell yeah", function(err, output) {
 *      // your code
 *  })
 */
var rest = require('restler');

var Cursing = module.exports = function(server, port) {
    this.apiUrl = server + ":" + port + "/";
};

Cursing.prototype.insultify = function (text, callback) {
    if(typeof text !== 'string') {
        return callback(new Error('the text must be of type String'));
    }

    rest.get(this.apiUrl, {
        query: {
            'input': text
        }
    }).on('complete', function(data) {
        if (data instanceof Error) {
            console.log('Error:', data.message);
            callback(new Error('HTTP error: ' + data.message));
        } else {
            if (data.status !== 'ok') {
                console.log("API error:", data.status);
                callback(new Error('The API returned status: ' + data.status));
            } else {
                callback(null, data.output, data.input, data.id)
            }
        }
    });
};