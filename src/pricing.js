function Pricing (order, priceDetails) {
  this.order = order
  this.priceDetails = priceDetails
  this.products = priceDetails.prices
  this.vatRates = priceDetails.vat_bands
  this.cost = 0
  this.vat = 0
  this.items = order.order.items
}

Pricing.prototype.totalPriceAndVat = function () {
  var products = this.products
  var vatRates = this.vatRates
  var costOfBasket = 0
  var vatOfBasket = 0
  this.items.forEach(function (item) {
    products.forEach(function (product) {
      if (item.product_id === product.product_id) {
        var costOfItem = (product.price * item.quantity)
        costOfBasket += costOfItem
        vatOfBasket += (costOfItem * vatRates[product.vat_band])
      };
    })
  })
  this.cost += costOfBasket
  this.vat += Math.round(vatOfBasket)
}

module.exports = Pricing
