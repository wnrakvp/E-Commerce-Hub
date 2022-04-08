import api from '../../api'
import OrderModel from '../../models/order'
import OrderLineItemModel from '../../models/orderLineItem'
import SKUModel from '../../models/sku'
export default {
  namespaced: true,
  state () {
    return {
      all: [],
    }
  },
  getters: {
    all: state => state.all
  },
  mutations: {
    SET_ALL (state, value) {
      state.all = value
    },
    EDIT_ALL (state, value) {
      const item = state.all.find(({id}) => id === value.id)
      Object.assign(item, value)
    },
    UNSHIFT_ALL (state, value) {
      state.all.unshift(value)
    },
    PUSH_ALL (state, value) {
      state.all.push(value)
    },
    DELETE_ALL (state, value) {
      state.all = state.all.filter(({id}) => id !== value)
    }
  },
  actions: {
    getAll ({commit}) {
      return api.getAllOrder().then(({result}) => {
        const list = []
        result.forEach(({_id, date, marketplace, orderNo, trackNo, orderStatus, deliveryBy, delivery, items: lineItems}) => {
          const items = []
          lineItems.forEach(({skuId, sku: skuDetails, price, amount}) => {
            const sku = new SKUModel(
              skuDetails._id,
              skuDetails.productId,
              null,
              skuDetails.name,
              skuDetails.desc,
              skuDetails.price,
              skuDetails.image,
              new Set(skuDetails.marketplaces)
            )
            items.push(new OrderLineItemModel(skuId, sku, price, amount))
          })
          list.push(new OrderModel(_id, date, marketplace, orderNo, trackNo, orderStatus, deliveryBy, delivery ,items))
        })
        console.debug(list)
        commit('SET_ALL', list)
        // TODO: throw something to router for handle state
        return Promise.resolve(list)
      }).catch(err => {
        console.error(err)
        return Promise.resolve('200')
      })
    },
    get (context, id) {
      return api.getOrder(id).then(({result}) => {
        let {_id, date, marketplace, orderNo, trackNo, orderStatus, deliveryBy, delivery, items: lineItems} = result
        console.debug(_id, date, marketplace, orderNo, trackNo, orderStatus, deliveryBy, delivery, lineItems)
        const items = []
        lineItems.forEach(({skuId, sku: skuDetails, price, amount}) => {
          const sku = new SKUModel(
            skuDetails._id,
            skuDetails.productId,
            null,
            skuDetails.name,
            skuDetails.desc,
            skuDetails.price,
            skuDetails.image,
            new Set(skuDetails.marketplaces)
          )
          items.push(new OrderLineItemModel(skuId, sku, price, amount))
        })
        const model = new OrderModel(_id, date, marketplace, orderNo, trackNo, orderStatus, deliveryBy, delivery, items)
        return Promise.resolve(model)
      }).catch(err => {
        console.error(err)
        Promise.reject(err.message)
      })
    },
    filterById ({commit}, productId) {
      commit('SET_PRODUCT_ID', productId)
    },
    draft () {
      const model = new OrderModel('', new Date(), '', [])
      return Promise.resolve(model)
    },
    save ({commit}, {date, marketplace, items}) {
      const skus = []
      items.forEach(({skuId, price, amount}) => {
        skus.push({skuId, price, amount})
      })
      return api.createOrder(date, marketplace, skus).then(({result}) => {
        const { _id, items:lineItems } = result
        console.debug(_id, lineItems)
        const items = []
        lineItems.forEach(({skuId, sku: skuDetails, price, amount}) => {
          const sku = new SKUModel(
            skuDetails._id,
            skuDetails.productId,
            null,
            skuDetails.name,
            skuDetails.desc,
            skuDetails.price,
            skuDetails.image,
            new Set(skuDetails.marketplaces)
          )
          items.push(new OrderLineItemModel(skuId, sku, price, amount))
        })
        const model = new OrderModel(_id, date, marketplace, orderNo, trackNo, orderStatus, deliveryBy, delivery, items)
        commit('PUSH_ALL', model)
        return Promise.resolve(model)
      }).catch(Promise.reject)
    }
  }
}