class OrderModel {
  constructor (id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items) {
    this.id = id
    this.date = date
    this.marketplace = marketplace
    this.orderNo = orderNo
    this.trackNo = trackNo
    this.orderStatus = orderStatus
    this.courier = courier
    this.deliveryBy = deliveryBy
    this.items = items
  }
}
export default OrderModel