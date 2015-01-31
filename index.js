
/**
 * Dependencies
 */

var qs      = require('querystring'),
    request = require('request'),
    Long    = require('long');

/**
 * Expose `TradeOffers`
 */

module.exports = TradeOffers;

/**
 * Creates a new `TradeOffers` instance
 *
 * @param {String} apiKey Steam api key
 */
function TradeOffers (apiKey) {

  this.req = request.defaults({ json: true });
  this.apiKey = apiKey;

}

/**
 * Converts a users account id to a 64-bit steamID
 *
 * @param  {String} accountID Users account id
 * @return {String}           Users 64-bit steam id
 */
TradeOffers.prototype._toSteamID = function(accountID) {

  return new Long(parseInt(accountID, 10), 0x1100001).toString();

};

/**
 * Make requests to the trade offers API
 *
 * @param  {String}   method  API method to call
 * @param  {Object}   options Options to call the API with
 * @param  {Function} cb      Callback
 */
TradeOffers.prototype._callAPI = function(method, options, cb) {

  var self = this;

  var requestOptions = {

    uri:    'https://api.steampowered.com/IEconService/%method/v1/?key=%apiKey%query'
              .replace('%method', method)
              .replace('%apiKey', self.apiKey)
              .replace('%query', options.query ? '&'  + qs.stringify(options.query) : ''),

    method: options.query ? 'GET' : 'POST'

  };

  if (options.tradeOfferID)
    requestOptions.form = { tradeofferid: options.tradeOfferID };

  self.req(requestOptions, function (err, response, body) {

    if (err || response.statusCode !== 200)
      return cb(err || new Error('Bad response - ' + response.statusCode));

    return cb(null, body);

  });

};

/**
 * Get trade offers
 * - https://developer.valvesoftware.com/wiki/Steam_Web_API/IEconService#GetTradeOffers_.28v1.29
 *
 * @param  {Object}  options API options
 * @return {Promise}
 */
TradeOffers.prototype.getOffers = function(options) {

  var self = this;

  return new Promise(function (resolve, reject) {

    self._callAPI('GetTradeOffers', { query: options }, function (err, apiResponse) {

      if (err)
        return reject(err);

      if (apiResponse.response.hasOwnProperty('trade_offers_sent')) {

        apiResponse.response.trade_offers_sent = apiResponse.response.trade_offers_sent.map(function (offer) {

          offer.steamid_other = self._toSteamID(offer.accountid_other);

          return offer;

        });

      }

      if (apiResponse.response.hasOwnProperty('trade_offers_received')) {

        apiResponse.response.trade_offers_received = apiResponse.response.trade_offers_received.map(function (offer) {

          offer.steamid_other = self._toSteamID(offer.accountid_other);

          return offer;

        });

      }

      return resolve(apiResponse.response);

    });

  });

};

/**
 * Get details for a given offerID
 * - https://developer.valvesoftware.com/wiki/Steam_Web_API/IEconService#GetTradeOffer_.28v1.29
 *
 * @param  {String}  options API options
 * @return {Promise}
 */
TradeOffers.prototype.getOffer = function(options) {

  var self = this;

  return new Promise(function (resolve, reject) {

    self._callAPI('GetTradeOffer', { query: options }, function (err, apiResponse) {

      if (err)
        return reject(err);

      if (apiResponse.response.hasOwnProperty('offer'))
        apiResponse.response.offer.steamid_other = self._toSteamID(apiResponse.response.offer.accountid_other);

      return resolve(apiResponse.response.offer || null);

    });

  });

};

/**
 * Decline a received trade offer
 * - https://developer.valvesoftware.com/wiki/Steam_Web_API/IEconService#DeclineTradeOffer.28v1.29
 *
 * @param  {String}  tradeOfferID Trade offer to decline
 * @return {Promise}
 */
TradeOffers.prototype.declineOffer = function(tradeOfferID) {

  var self = this;

  return new Promise(function (resolve, reject) {

    self._callAPI('DeclineTradeOffer', { tradeOfferID: tradeOfferID }, function (err, apiResponse) {

      if (err)
        return reject(err);

      return resolve(apiResponse);

    });

  });

};

/**
 * Cancel a trade offer that we sent
 * - https://developer.valvesoftware.com/wiki/Steam_Web_API/IEconService#CancelTradeOffer_.28v1.29
 *
 * @param  {String}  tradeOfferID Trade offer to cancel
 * @return {Promise}
 */
TradeOffers.prototype.cancelOffer = function(tradeOfferID) {

  var self = this;

  return new Promise(function (resolve, reject) {

    self._callAPI('CancelTradeOffer', { tradeOfferID: tradeOfferID }, function (err, apiResponse) {

      if (err)
        return reject(err);

      return resolve(apiResponse);

    });

  });

};
