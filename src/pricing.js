function Pricing (order, priceDetails) {
  this.order = order
  this.priceDetails = priceDetails
  this.products = priceDetails.prices
  this.vatRates = priceDetails.vat_bands
  this.cost = 0
  this.vat = 0
  this.items = order.order.items
  this.receipt = []
}

Pricing.prototype.createReceipt = function () {
  var receipt = this.receipt
  var products = this.products
  var vatRates = this.vatRates
  var basketCost = 0
  var basketVat = 0
  this.items.forEach(function (item) {
    var receiptItem = item
    products.forEach(function (product) {
      if (item.product_id === product.product_id) {
        receiptItem.price = product.price * item.quantity
        receiptItem.vat = Math.round(receiptItem.price * vatRates[product.vat_band])
        var itemCost = product.price * item.quantity
        basketCost += itemCost
        basketVat += itemCost * vatRates[product.vat_band]
      }
    })
    receipt.push(receiptItem)
  })
  this.cost += basketCost
  this.vat += Math.round(basketVat)
}

module.exports = Pricing
