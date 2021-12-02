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
            items.push(new StockLineItemModel(skuId, sku, price, amount))
          })
          list.push(new StockModel(_id, date, marketplace, items))
        })
        console.debug(list)
        commit('SET_ALL', list)
        // TODO: throw something to router for handle state
        return Promise.resolve('200')
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
          items.push(new StockLineItemModel(skuId, sku, price, amount))
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
      return Promise.resolve(new SKUModel('',
      new ProductModel('', '', '', ''),'', '', 0,
      'https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dw46146d85/images/large/0000102333.jpg', new Set(['shopee', 'lazada'])))
    },
    save ({commit}, {id, productId, name, desc, price, image, marketplaces}) {
      if (id) {
        return api.updateSKU(id, productId, name, desc, price, image, [...marketplaces]).then(({result}) => {
          const { _id, product } = result
          const model = new SKUModel(
            _id,
            productId,
            new ProductModel(product._id, product.name, product.desc, product.image),
            name,
            desc,
            price,
            image,
            new Set(marketplaces)
          )
          commit('EDIT_ALL', model)
          return Promise.resolve(model)
        }).catch(Promise.reject)
      } else {
        return api.createSKU(productId, name, desc, price, image, [...marketplaces]).then(({result}) => {
          const { _id, product } = result
          const model = new SKUModel(
            _id,
            productId,
            new ProductModel(product._id, product.name, product.desc, product.image),
            name,
            desc,
            price,
            image,
            new Set(marketplaces)
          )
          commit('UNSHIFT_ALL', model)
          return Promise.resolve(model)
        }).catch(Promise.reject)
      }
    },
    delete ({commit}, id) {
      return api.deleteSKU(id).then(({result}) => {
        commit('DELETE_ALL', id)
        return Promise.resolve(id)
      }).catch(Promise.reject)
    }
  }
}