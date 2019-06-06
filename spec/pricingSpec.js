'use strict'

describe('Pricing', function () {
  var Pricing = require('../src/pricing')
  var pricing

  beforeEach(function () {
    var order = require('../lib/exampleOrder.json')
    var prices = require('../lib/pricingData.json')
    pricing = new Pricing(order, prices)
  })

  it('can access order info', function () {
    expect(pricing.order.order.id).toEqual(12345)
  })

  it('can access pricing info', function () {
    expect(pricing.priceDetails.prices[0].product_id).toEqual(1)
    expect(pricing.priceDetails.prices[0].price).toEqual(599)
    expect(pricing.priceDetails.prices[0].vat_band).toEqual('standard')
  })

  it('initializes with cost at zero', function () {
    expect(pricing.cost).toEqual(0)
  })

  it('has access to full details of all items in basket', function () {
    expect(pricing.items[0]['product_id']).toEqual(1)
    expect(pricing.items[0]['quantity']).toEqual(1)
  })

  describe('#createReceipt', function () {
    beforeEach(function () {
      pricing.createReceipt()
    })

    it('adds up the cost of all items in basket', function () {
      expect(pricing.cost).toEqual(2099)
      expect(pricing.vat).toEqual(120)
    })

    it('calculates price and VAT for each item', function () {
      expect(pricing.receipt.order[0]).toEqual(
        {
          product_id: 1,
          quantity: 1,
          price: 599,
          vat: 120
        }
      )
      expect(pricing.receipt.total).toEqual(2219)
    })
  })

  describe('#convertCurrency', function () {
    beforeEach(function () {
      pricing.createReceipt()
    })

    it('can convert currency to USD', function () {
      pricing.convertCurrency('USD')
      expect(pricing.receipt.total).toEqual(2819)
    })
  })
})
