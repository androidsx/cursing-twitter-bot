require('log-timestamp');

var config = require('./config')

config.validateConfig();

var twitlib = require('twit');
var twit = new twitlib(config.twitter);

var Cursing = require('./cursing-api-client');
var cursing = new Cursing(config.cursing.server, config.cursing.port);

// For heroku or similar services that requires a web server
var express = require('express')
var app = express();
app.get('/', function (req, res) {
    res.send('YAY');
}).listen(54321);

function insultifyTweets(twitterUserId, twitterUsername) {
    console.log("Waiting for tweets to insultify them from account " + twitterUsername + "...")

    var stream = twit.stream('statuses/filter', {'follow' : twitterUserId})
    stream.on('tweet', function (tweet) {
        if (tweet.user.id == twitterUserId) {
            console.log("New tweet from user @" + twitterUsername);
            cursing.insultify(tweet.text, function(err, output, input) {
                if (err) {
                    console.error('Error requesting insultify:', err);
                } else {
                    console.log("Cursing API response successful for tweet: ", input);

                    var insultifiedText = (output.length > 140) ? output.substring(0, 137) + '...' : output;
                    twit.post('statuses/update', {status: insultifiedText}, function (err, reply) {
                        if (err != null) {
                            console.log("Error during creation of the tweet: ", err);
                        } else {
                            console.log("Insultified tweet created: ", insultifiedText);
                        }
                    });
                }
            });
        } else {
            console.log("Tweet about @" + twitterUsername + " but not from him, skip it")
        }

    });
}

insultifyTweets(config.twitterbot.twitterIdToInsultify, config.twitterbot.twitterUsernameToInsultify);