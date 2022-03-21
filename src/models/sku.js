class SKUModel {
  constructor (id, productId, product, name, desc, price, amount, image, marketplaces) {
    this.id = id
    this.productId = productId
    this.product = product
    this.name = name
    this.desc = desc
    this.price = price
    this.amount = amount
    this.image = image
    this.marketplaces = marketplaces
  }
}
export default SKUModel