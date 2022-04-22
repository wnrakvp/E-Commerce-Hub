import StockModel from '../../models/stock';
import StockLineItemModel from '../../models/stockLineItem';
import SKUModel from '../../models/sku';
import axios from 'axios';
export default {
  namespaced: true,
  state() {
    return {
      all: [],
    };
  },
  getters: {
    all: (state) => state.all,
  },
  mutations: {
    SET_ALL(state, value) {
      state.all = value;
    },
    EDIT_ALL(state, value) {
      const item = state.all.find(({ id }) => id === value.id);
      Object.assign(item, value);
    },
    UNSHIFT_ALL(state, value) {
      state.all.unshift(value);
    },
    PUSH_ALL(state, value) {
      state.all.push(value);
    },
    DELETE_ALL(state, value) {
      state.all = state.all.filter(({ id }) => id !== value);
    },
  },
  actions: {
    async getAll({ commit }) {
      console.time('Get ALL Stock');
      try {
        const result = await axios.get('http://localhost:5000/api/v1/stocks');
        const stockList = [];
        result.data.data.forEach(
          ({ _id, date, marketplaces, warehouse, items }) => {
            stockList.push(
              new StockModel(_id, date, marketplaces, warehouse, items)
            );
          }
        );
        commit('SET_ALL', stockList);
        console.timeEnd('Get ALL Stock');
        // console.log(stockList);
        return Promise.resolve(stockList);
      } catch (err) {
        console.error(err);
        return Promise.reject;
      }
    },
    async get(context, id) {
      try {
        console.time('Get Stock by ID');
        const result = await axios.get(
          `http://localhost:5000/api/v1/stocks/${id}`
        );
        let { _id, date, marketplaces, warehouse, items } = result.data.data;
        const stockList = new StockModel(
          _id,
          date,
          marketplaces,
          warehouse,
          items
        );
        console.timeEnd('Get Stock by ID');
        console.log(stockList);
        return Promise.resolve(stockList);
      } catch (err) {
        console.error(err);
        return Promise.reject;
      }
    },
    draft() {
      const model = new StockModel('', new Date(), '', '', []);
      return Promise.resolve(model);
    },
    async save({ commit }, { id, date, marketplace, warehouse, items }) {
      if (id == 'add') {
      const item = items;
      item.forEach(x => x.inventory = x.inventory.id);
        console.time('Add Stocks');
        await axios
          .post(`http://localhost:5000/api/v1/stocks`, {
            date: date,
            marketplaces: marketplace,
            warehouse: warehouse,
            items: item,
          })
          .then((result) => {
            console.log(result.data.data)
            let { _id, date, marketplaces, warehouse, items } =
              result.data.data;
            const stockList = new StockModel(
              _id,
              date,
              marketplaces,
              warehouse,
              items
            );
            console.timeEnd('Add Stocks');
            commit('PUSH_ALL', stockList);
            console.log(stockList)
            return Promise.resolve(stockList);
          })
          .catch((err) => {
            console.error(err);
            Promise.reject(err.message);
          });
        } else {

        }
      // const skus = []
      // items.forEach(({skuId, price, amountOnSell}) => {
      //   skus.push({skuId, price, amountOnSell})
      // })
      // return api.createStock(date, marketplace, skus).then(({result}) => {
      //   const { _id, items:lineItems } = result
      //   console.debug(_id, lineItems)
      //   const items = []
      //   lineItems.forEach(({skuId, sku: skuDetails, price, amountOnSell}) => {
      //     const sku = new SKUModel(
      //       skuDetails._id,
      //       skuDetails.productId,
      //       null,
      //       skuDetails.name,
      //       skuDetails.desc,
      //       skuDetails.price,
      //       skuDetails.amount,
      //       skuDetails.image,
      //       new Set(skuDetails.marketplaces)
      //     )
      //     items.push(new StockLineItemModel(skuId, sku, price, amountOnSell))
      //   })
      //   const model = new StockModel(_id, date, marketplace, items)
      //   commit('PUSH_ALL', model)
      //   return Promise.resolve(model)
      // }).catch(Promise.reject)
    },
    async delete({ commit }, id) {
      try {
        console.time('Deleting Stock');
        const result = await axios.delete(
          `http://localhost:5000/api/v1/stocks/${id}`
        );
        console.debug(result);
        commit('DELETE_ALL', id);
        console.timeEnd('Deleting Stock');
        return Promise.resolve(id);
      } catch (err) {
        console.log(err);
        return Promise.reject;
      }
    },
  },
};
