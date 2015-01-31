Trade Offers
============
[![Build Status](https://travis-ci.org/alvinl/tradeoffers.svg?branch=master)](https://travis-ci.org/alvinl/tradeoffers)

A promise based library for Steams [trade offers API](https://developer.valvesoftware.com/wiki/Steam_Web_API/IEconService). Compatible with Node 0.11 and io.js.

## Install

```
npm install git://github.com/alvinl/tradeoffers.git
```

## Example
``` js

var TradeOffers = require('tradeoffers'),
    tradeOffers = new TradeOffers('steam api key');

var getOffersOpts = {

  get_received_offers:    1,
  get_sent_offers:        1,
  time_historical_cutoff: Date.now() / 1000 | 0

};

// Used with a generator
co(function* () {

  var offers = yield tradeOffers.getOffers(getOffersOpts);

  console.log('Offers:', offers);

}());

// Used as a promise
tradeOffers.getOffers(getOffersOpts)
            .then(function (offers) {

              console.log('Offers:', offers);

            })
            .catch(function (err) {

              console.error(err);

            });
```

## Methods
- All of the following methods return a promise.
- API options for each method can be found [here](https://developer.valvesoftware.com/wiki/Steam_Web_API/IEconService).

### getOffers(options)
### getOffer(options)
### declineOffer(tradeOfferID)
### cancelOffer(tradeOfferID)
