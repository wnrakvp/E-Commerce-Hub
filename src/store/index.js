import { createStore } from 'vuex'
import Products from './modules/products'
import SKU from './modules/sku'
import Stock from './modules/stock'
import Order from './modules/order'

const store = createStore({
  actions: {
  },
  modules: {
    Products,
    SKU,
    Stock,
    Order
  }
})

export default store