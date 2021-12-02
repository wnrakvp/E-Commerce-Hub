import { createStore } from 'vuex'
import Products from './modules/products'
import SKU from './modules/sku'
import Stock from './modules/stock'
const store = createStore({
  actions: {
  },
  modules: {
    Products,
    SKU,
    Stock
  }
})

export default store