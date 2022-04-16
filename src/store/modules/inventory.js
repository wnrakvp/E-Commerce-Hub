import api from '../../api';
import axios from 'axios';
import InventoryModel from '../../models/inventory';
import ProductModel from '../../models/product';
import SKUModel from '../../models/sku';
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
    getAll({ commit }) {
      console.time("Get All Inventory")
      return axios.get('http://localhost:3000/inventoryList')
        .then(( result ) => {
          const inventoryList = [];
          // const inventoryList = result.result;
          result.data.forEach(({ id, skuId, sku, type, amount }) => {
            inventoryList.push(
              new InventoryModel(
                id,
                skuId,
                new SKUModel(
                  sku.id,
                  sku.productId,
                  new ProductModel(
                    sku.product.id,
                    sku.product.name,
                    sku.product.desc,
                    sku.product.image
                  ),
                  sku.name,
                  sku.desc,
                  sku.price,
                  sku.image,
                  sku.marketplaces,
                ),
                type,
                amount
              )
            );
          });
          commit('SET_ALL', inventoryList);
          console.timeEnd("Get All Inventory")
          return Promise.resolve(inventoryList);
        })
        .catch((err) => {
          console.error(err);
          return Promise.resolve('200');
        });
    },
    get(context, id) {
      console.time("Get Inventory by ID")
      return axios.get(`http://localhost:3000/inventoryList/${id}`)
        .then(( result ) => {
          // console.log(
          //   {result})
          let { id, skuId, sku, type, amount } = result.data;
          const model = new InventoryModel(
            id,
            skuId,
            new SKUModel(
              sku.id,
              sku.productId,
              new ProductModel(
                sku.product.id,
                sku.product.name,
                sku.product.desc,
                sku.product.image
              ),
              sku.name,
              sku.desc,
              sku.price,
              sku.image,
              sku.marketplaces,
            ),
            type,
            amount
          );
          console.log(model);
          console.timeEnd("Get Inventory by ID")
          return Promise.resolve(model);
        })
        .catch((err) => {
          console.error(err);
          Promise.reject(err.message);
        });
    },
    save({ commit }, { id, skuId, sku, type, amount }) {
      if (id) {
        return axios.put(`http://localhost:3000/inventoryList/${id}`, {
          id,
          skuId,
          sku,
          type,
          amount,
        })
        .then((result) => {
          let { id, skuId, sku, type, amount } = result.data;
          const model = new InventoryModel(
            id,
            skuId,
            new SKUModel(
              sku.id,
              sku.productId,
              new ProductModel(
                sku.product.id,
                sku.product.name,
                sku.product.desc,
                sku.product.image
              ),
              sku.name,
              sku.desc,
              sku.price,
              sku.image,
              sku.marketplaces,
            ),
            type,
            amount,
          );
          commit('EDIT_ALL', model)
          console.log('Edit Success!!')
          return Promise.resolve();
        });
      }
    },
    delete({ commit }, id) {
      console.time('Delete by ID')
      return axios.delete(`http://localhost:3000/inventoryList/${id}`).then((result) => {
        console.log('Delete Success!!')
        commit('DELETE_ALL', id)
        console.timeEnd('Delete by ID')
        return Promise.resolve(id);
      }).catch(err => {
        console.error(err)
        Promise.reject(err.message)
      })
    },
  },
};
