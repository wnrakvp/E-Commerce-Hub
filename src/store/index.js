import { createStore } from 'vuex'
import Products from './modules/products'
import SKU from './modules/sku'
const store = createStore({
  actions: {
  },
  modules: {
    Products,
    SKU
  }
})

export default store