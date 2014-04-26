var config = {}

config.twitter = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
    access_token: process.env.TWITTER_ACCESS_TOKEN || '',
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ''
};
config.cursing = {
    server: process.env.CURSING_SERVER || "",
    port: process.env.CURSING_PORT || ""
};
config.twitterbot = {
    twitterIdToInsultify: process.env.TWITTER_ID_TO_INSULTIFY || "2442767311",
    twitterUsernameToInsultify: process.env.TWITTER_USERNAME_TO_INSULTIFY || "darkcreatorbot"
}

config.validateConfig = function() {
    // for the moment all are required
    for (var namespace in config) {
        if (config.hasOwnProperty(namespace)) {
            for (var key in config[namespace]) {
                if (config[namespace].hasOwnProperty(key) && isEmpty(config[namespace][key])) {
                    throw new Error("Config option '" + key + "' is required");
                }
            }
        }
    }
}

module.exports = config;

function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    if (isNumber(obj)) return false;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function isNumber (o) {
    return ! isNaN (o-0) && o !== null && o !== false;
}