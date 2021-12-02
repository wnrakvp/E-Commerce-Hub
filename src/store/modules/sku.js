import api from '../../api'
import ProductModel from '../../models/product'
import SKUModel from '../../models/sku'
export default {
  namespaced: true,
  state () {
    return {
      all: [],
      productId: null
    }
  },
  getters: {
    all: state => state.all.filter(x => state.productId === null? true : x.productId === state.productId)
  },
  mutations: {
    SET_PRODUCT_ID (state, value) {
      state.productId = value
    },
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
      return api.getAllSKU().then(({result}) => {
        const skuList = []
        result.forEach(({_id, productId, product, name, desc, price, image, marketplaces}) => {
          console.debug(product.name)
          skuList.push(
            new SKUModel(
              _id,
              productId,
              new ProductModel(product._id, product.name, product.desc, product.image),
              name,
              desc,
              price,
              image,
              new Set(marketplaces)
            )
          )
        })
        commit('SET_ALL', skuList)
        // TODO: throw something to router for handle state
        return Promise.resolve(skuList)
      }).catch(err => {
        console.error(err)
        return Promise.resolve('200')
      })
    },
    get (context, id) {
      return api.getSKU(id).then(({result}) => {
        let {_id, productId, product, name, desc, price, image, marketplaces} = result
        console.debug(_id, product, name, desc, price, image, marketplaces)
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
        // TODO: throw something to router for handle state
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
      const product = new ProductModel('', '', '', '')
      return Promise.resolve(new SKUModel('', '',product, '', '', 0,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdT-CMjPc50R-jKEvJl_rcn3mBMvkcUwERg', new Set(['shopee', 'lazada'])))
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
        }).catch(err => {
          console.error(err)
          Promise.reject(err.message)
        })
      } else {
        return api.createSKU(productId, name, desc, price, image, [...marketplaces]).then(({result}) => {
          console.debug(result)
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
        }).catch(err => {
          console.error(err)
          Promise.reject(err.message)
        })
      }
    },
    delete ({commit}, id) {
      return api.deleteSKU(id).then(({result}) => {
        commit('DELETE_ALL', id)
        return Promise.resolve(id)
      }).catch(err => {
        console.error(err)
        Promise.reject(err.message)
      })
    }
  }
}