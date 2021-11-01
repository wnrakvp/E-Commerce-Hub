import api from '../../api'
import ProductModel from '../../models/product'
export default {
  namespaced: true,
  state () {
    return {
      all: []
    }
  },
  getters: {
    all: state => state.all
  },
  mutations: {
    SET_ALL (state, value) {
      state.all = value
    }
  },
  actions: {
    getAll ({commit}) {
      return api.getAllProducts().then(({result}) => {
        const productList = []
        result.forEach(({_id, name, desc}) => {
          productList.push(new ProductModel(_id, name, desc))
        })
        console.debug(productList)
        commit('SET_ALL', productList)
        // TODO: throw something to router for handle state
        return Promise.resolve('200')
      }).catch(err => {
        console.error(err)
        return Promise.resolve('200')
      })
    }
  }
}