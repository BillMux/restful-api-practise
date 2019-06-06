const fetch = require('node-fetch')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

function Pricing(order, priceDetails) {
  this.order = order
  this.priceDetails = priceDetails
  this.products = priceDetails.prices
  this.vatRates = priceDetails.vat_bands
  this.cost = 0
  this.vat = 0
  this.items = order.order.items
  this.receipt = {
    order: [],
    total: 0
  }
}

Pricing.prototype.createReceipt = function() {
  var receipt = this.receipt
  var products = this.products
  var vatRates = this.vatRates
  var basketCost = 0
  var basketVat = 0
  this.items.forEach(function(item) {
    var receiptItem = item
    products.forEach(function(product) {
      if (item.product_id === product.product_id) {
        receiptItem.price = product.price * item.quantity
        receiptItem.vat = Math.round(
          receiptItem.price * vatRates[product.vat_band]
        )
        var itemCost = product.price * item.quantity
        basketCost += itemCost
        basketVat += itemCost * vatRates[product.vat_band]
      }
    })
    receipt.order.push(receiptItem)
  })
  this.calculateCostAndVat(basketCost, basketVat)
  this.totalCostWithVat()
}

Pricing.prototype.calculateCostAndVat = function(cost, vat) {
  this.cost += cost
  this.vat += Math.round(vat)
}

Pricing.prototype.totalCostWithVat = function() {
  this.receipt.total += this.cost + this.vat
}

Pricing.prototype.convertCurrency = function(currency) {
  var domain = 'https://free.currconv.com/api/v7/'
  var conversion = `convert?q=GBP_${currency}`
  var compact = '&compact=ultra'
  var api = '&apiKey=a179f97a2c6c58238742'
  var url = domain + conversion + compact + api
  console.log(url)

  var request = new XMLHttpRequest()

  request.open('GET', url, true)

  request.onload = function () {
    var data = JSON.parse(this.response)
    console.log(data)

    if (request.status >= 200 && request.status < 400) {
      console.log(data)
    } else {
      console.log('error')
    }
  }
  request.send()
}

module.exports = Pricing
