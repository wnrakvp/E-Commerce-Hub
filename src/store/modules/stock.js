import api from '../../api'
import StockModel from '../../models/stock'
import StockLineItemModel from '../../models/stockLineItem'
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
      return api.getAllStock().then(({result}) => {
        const list = []
        result.forEach(({_id, date, marketplace, items: lineItems}) => {
          const items = []
          lineItems.forEach(({skuId, sku: skuDetails, price, amountOnSell}) => {
            const sku = new SKUModel(
              skuDetails._id,
              skuDetails.productId,
              null,
              skuDetails.name,
              skuDetails.desc,
              skuDetails.price,
              skuDetails.amount,
              skuDetails.image,
              new Set(skuDetails.marketplaces)
            )
            items.push(new StockLineItemModel(skuId, sku, price, amountOnSell))
          })
          list.push(new StockModel(_id, date, marketplace, items))
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
      return api.getStock(id).then(({result}) => {
        let {_id, date, marketplace, items: lineItems} = result
        console.debug(_id, date, marketplace, lineItems)
        const items = []
        lineItems.forEach(({skuId, sku: skuDetails, price, amountOnSell}) => {
          const sku = new SKUModel(
            skuDetails._id,
            skuDetails.productId,
            null,
            skuDetails.name,
            skuDetails.desc,
            skuDetails.price,
            skuDetails.amount,
            skuDetails.image,
            new Set(skuDetails.marketplaces)
          )
          items.push(new StockLineItemModel(skuId, sku, price, amountOnSell))
        })
        const model = new StockModel(_id, date, marketplace, items)
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
      const model = new StockModel('', new Date(), '', [])
      return Promise.resolve(model)
    },
    save ({commit}, {date, marketplace, items}) {
      const skus = []
      items.forEach(({skuId, price, amountOnSell}) => {
        skus.push({skuId, price, amountOnSell})
      })
      return api.createStock(date, marketplace, skus).then(({result}) => {
        const { _id, items:lineItems } = result
        console.debug(_id, lineItems)
        const items = []
        lineItems.forEach(({skuId, sku: skuDetails, price, amountOnSell}) => {
          const sku = new SKUModel(
            skuDetails._id,
            skuDetails.productId,
            null,
            skuDetails.name,
            skuDetails.desc,
            skuDetails.price,
            skuDetails.amount,
            skuDetails.image,
            new Set(skuDetails.marketplaces)
          )
          items.push(new StockLineItemModel(skuId, sku, price, amountOnSell))
        })
        const model = new StockModel(_id, date, marketplace, items)
        commit('PUSH_ALL', model)
        return Promise.resolve(model)
      }).catch(Promise.reject)
    }
  }
}