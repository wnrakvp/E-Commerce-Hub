class OrderModel {
  constructor (id, date, marketplace, orderNo, trackNo, orderStatus, deliveryBy, courier, items) {
    this.id = id
    this.date = date
    this.marketplace = marketplace
    this.orderNo = orderNo
    this.trackNo = trackNo
    this.orderStatus = orderStatus
    this.deliveryBy = deliveryBy
    this.courier = courier
    this.items = items
  }
}
export default OrderModel