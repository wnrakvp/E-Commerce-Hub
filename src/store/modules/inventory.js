import api from '../../api'
export default {
  namespaced: true,
  state () {
    return {
      all: [],
    }
  },
  getters: {
    all: state => state.all
  },
  mutations: {
    SET_ALL (state, value) {
      state.all = value
    },
  },
  actions: {
    getAll ({commit}) {
      return api.getAllInventory().then((result) => {
        const inventoryList = result.result;
        commit('SET_ALL', inventoryList);
        return Promise.resolve(inventoryList)
      }).catch(err => {
        console.error(err)
        return Promise.resolve('200')
      })
    },
  },
}