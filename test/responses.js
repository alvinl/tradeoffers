
exports.getOffersURL = {

  response: {

    trade_offers_sent: [

      { tradeofferid: '299073873',
        accountid_other: 109440403,
        message: '',
        expiration_time: 1423555088,
        trade_offer_state: 6,
        items_to_give: [{}, {}],
        is_our_offer: true,
        time_created: 1422345488,
        time_updated: 1422386295 },
      { tradeofferid: '295456306',
        accountid_other: 109440403,
        message: '',
        expiration_time: 1423338867,
        trade_offer_state: 3,
        items_to_give: [{}],
        is_our_offer: true,
        time_created: 1422129267,
        time_updated: 1422129350 }

    ],

    trade_offers_received: [

      { tradeofferid: '296659365',
        accountid_other: 86017933,
        message: '',
        expiration_time: 1423404515,
        trade_offer_state: 3,
        items_to_give: [{}],
        items_to_receive: [{}, {}],
        is_our_offer: false,
        time_created: 1422194915,
        time_updated: 1422206405 }

    ]

  }

};

exports.getOfferURL = {

  response: {

    offer: {

      tradeofferid: '296659365',
      accountid_other: 86017933,
      message: '',
      expiration_time: 1423404515,
      trade_offer_state: 3,
      items_to_give:
       [ { appid: '730',
           contextid: '2',
           assetid: '1313569126',
           classid: '329141045',
           instanceid: '188530139',
           amount: '1',
           missing: true } ],
      items_to_receive:
       [ { appid: '570',
           contextid: '2',
           assetid: '3791230429',
           classid: '506824105',
           instanceid: '57944754',
           amount: '1',
           missing: true } ],
      is_our_offer: false,
      time_created: 1422194915,
      time_updated: 1422206405

    }

  }

};
