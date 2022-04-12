import { createStore } from 'vuex'
import Products from './modules/products'
import SKU from './modules/sku'
import Stock from './modules/stock'
import Order from './modules/order'
import Inventory from './modules/inventory'

const store = createStore({
  state: {
    auth: false
  },
  mutations: {
    setAuth(state, status) {
      state.auth = status;
    },
  },
  actions: {
  },
  modules: {
    Products,
    SKU,
    Stock,
    Order,
    Inventory,
  }
})

export default store