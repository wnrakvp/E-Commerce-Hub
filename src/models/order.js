class OrderModel {
  constructor (id, date, marketplace, orderNo, trackNo, orderStatus, delivery, items) {
    this.id = id
    this.date = date
    this.marketplace = marketplace
    this.orderNo = orderNo
    this.trackNo = trackNo
    this.orderStatus = orderStatus
    this.delivery = delivery
    this.items = items
  }
}
export default OrderModel