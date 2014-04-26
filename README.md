twitterbot
----------
Twitter bot which insultifies all tweets from an account using the [Cursing API](http://cursingapi.com)

Configuration
====
- Create a twitter account which you want to insultify their tweets (e.g. [@angryCristiano](https://twitter.com/angryCristiano))
- Create a twitter app in that account in http://developers.twitter.com with read & write access.
- Modify `config.sample.sh` with the twitter API keys, the [Cursing API](http://cursingapi.com) server, and the account id of the user (e.g. `@ElonMusk`). Use [this service](http://www.idfromuser.com/) to get the user ids

Setup
====
- Install node and npm
- `npm install`
- `. config.sample.sh && node cursing-twitter-bot`
