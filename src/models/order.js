class OrderModel {
  constructor (id, date, marketplace, orderNo, trackNo, orderStatus, deliveryBy, delivery, items) {
    this.id = id
    this.date = date
    this.marketplace = marketplace
    this.orderNo = orderNo
    this.trackNo = trackNo
    this.orderStatus = orderStatus
    this.deliveryBy = deliveryBy
    this.delivery = delivery
    this.items = items
  }
}
export default OrderModel