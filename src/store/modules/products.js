import api from '../../api'
import ProductModel from '../../models/product'
export default {
  namespaced: true,
  state () {
    return {
      all: [],
      one: new ProductModel('', '', '', '')
    }
  },
  getters: {
    all: state => state.all,
    one: state => state.one
  },
  mutations: {
    SET_ALL (state, value) {
      state.all = value
    },
    SET_ONE (state, value) {
      state.one = value
    }
  },
  actions: {
    getAll ({commit}) {
      return api.getAllProducts().then(({result}) => {
        const productList = []
        result.forEach(({_id, name, desc, image}) => {
          productList.push(new ProductModel(_id, name, desc, image))
        })
        commit('SET_ALL', productList)
        // TODO: throw something to router for handle state
        return Promise.resolve('200')
      }).catch(err => {
        console.error(err)
        return Promise.resolve('200')
      })
    },
    getOne ({commit}, productId) {
      return api.getProduct(productId).then(({result}) => {
        let {_id, name, desc, image} = result
        commit('SET_ONE', new ProductModel(_id, name, desc, image))
        // TODO: throw something to router for handle state
        return Promise.resolve('200')
      }).catch(err => {
        console.error(err)
        return Promise.resolve('200')
      })
    },
    create({commit}) {
      commit('SET_ONE', new ProductModel('', '', '', ''))
      return Promise.resolve('200')
    }
  }
}