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
    get (context, id) {
      return api.getProduct(id).then(({result}) => {
        let {_id, name, desc, image} = result
        const model = new ProductModel(_id, name, desc, image)
        // TODO: throw something to router for handle state
        return Promise.resolve(model)
      }).catch(Promise.reject)
    },
    draft () {
      return Promise.resolve(new ProductModel('', '', '', 'https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dw46146d85/images/large/0000102333.jpg'))
    },
    save ({commit}, {id, name, desc, image}) {
      if (id) {
        return api.updateProduct( id, name, desc, image ).then(({result}) => {
          const { _id } = result
          const model = new ProductModel(_id, name, desc, image)
          console.debug(model)
          commit('EDIT_ALL', model)
          return Promise.resolve(model)
        }).catch(Promise.reject)
      } else {
        return api.createProduct( name, desc, image).then(({result}) => {
          const { _id } = result
          const model = new ProductModel(_id, name, desc, image)
          console.debug(model)
          commit('UNSHIFT_ALL', model)
          return Promise.resolve(model)
        }).catch(Promise.reject)
      }
    },
    delete ({commit}, id) {
      return api.deleteProduct(id).then(({result}) => {
        commit('DELETE_ALL', id)
        return Promise.resolve(id)
      }).catch(Promise.reject)
    }
  }
}