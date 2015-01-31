
/* global describe, it */

/**
 * Dependencies
 */

var TradeOffers = require('../'),
    nock        = require('nock'),
    should      = require('should'),
    responses   = require('./responses');

var getOffersURL = nock('https://api.steampowered.com')
                    .get('/IEconService/GetTradeOffers/v1/?key=1234&get_sent_offers=1&get_received_offers=1')
                    .reply(200, responses.getOffersURL);

var getOfferURL = nock('https://api.steampowered.com')
                   .get('/IEconService/GetTradeOffer/v1/?key=1234&tradeofferid=296659365')
                   .reply(200, responses.getOfferURL);

describe('TradeOffers module', function () {

  it('._toSteamID should convert a account id to a 64-bit Steam id', function (done) {

    var tradeoffers = new TradeOffers();

    tradeoffers._toSteamID(109440403).should.eql('76561198069706131');

    return done();

  });

  it('.getOffers should return offers based on given options and include steamid_other with each offer', function (done) {

    var tradeoffers = new TradeOffers('1234');

    tradeoffers.getOffers({ get_sent_offers: 1, get_received_offers: 1 })
      .then(function (offers) {

        offers.trade_offers_sent.should.have.lengthOf(2);
        offers.trade_offers_received.should.have.lengthOf(1);

        offers.trade_offers_sent.forEach(function (offer) {

          offer.should.have.property('steamid_other').with.lengthOf(17);

        });

        offers.trade_offers_received.forEach(function (offer) {

          offer.should.have.property('steamid_other').with.lengthOf(17);

        });

        return done();

      })
      .catch(done);

  });

  it('.getOffer should return an offer based on given options and include steamid_other in the returned offer object', function (done) {

    var tradeoffers = new TradeOffers('1234');

    tradeoffers.getOffer({ tradeofferid: '296659365' })
      .then(function (offer) {

        offer.should.have.property('steamid_other').with.lengthOf(17);

        return done();

      })
      .catch(done);

  });

});
