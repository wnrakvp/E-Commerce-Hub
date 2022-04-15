import { createStore } from 'vuex'
import axios from 'axios'
import Products from './modules/products'
import SKU from './modules/sku'
import Stock from './modules/stock'
import Order from './modules/order'
import Inventory from './modules/inventory'


const store = createStore({
  state: {
    login: false,
    auth: false
  },
  mutations: {
    SET_AUTH(state, status) {
      state.auth = status;
    },
    LOGIN(state,value) {
      state.login = value;
    }
  },
  actions: {
    async validateUser({commit}, payload) {
      try {
      const response = await axios
        .post('http://localhost:5000/api/v1/user/login', {
          email: payload.email,
          password: payload.password,
        })
        console.log(response)
      if (response.status == 200) {
        commit('LOGIN',true)
        alert('Login Successfully')
      }
      }
      catch(err) {
        alert('There is error')
        console.log(err)
      }
    }
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