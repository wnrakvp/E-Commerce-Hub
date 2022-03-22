import { createStore } from 'vuex'
import Products from './modules/products'
import SKU from './modules/sku'
import Stock from './modules/stock'
import Inventory from './modules/inventory'

const store = createStore({
  actions: {
  },
  modules: {
    Products,
    SKU,
    Stock,
    Inventory
  }
})

export default store