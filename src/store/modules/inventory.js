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
    async getAll({ commit }) {
      console.time('Get All Inventory');
      return await axios
        .get('http://localhost:3000/inventoryList')
        .then((result) => {
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
                  sku.marketplaces
                ),
                type,
                amount
              )
            );
          });
          commit('SET_ALL', inventoryList);
          console.timeEnd('Get All Inventory');
          return Promise.resolve(inventoryList);
        })
        .catch((err) => {
          console.error(err);
          return Promise.resolve('200');
        });
    },
    async get(context, id) {
      console.time('Get Inventory by ID');
      return await axios
        .get(`http://localhost:3000/inventoryList/${id}`)
        .then((result) => {
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
              sku.marketplaces
            ),
            type,
            amount
          );
          console.log(model);
          console.timeEnd('Get Inventory by ID');
          return Promise.resolve(model);
        })
        .catch((err) => {
          console.error(err);
          Promise.reject(err.message);
        });
    },
    async save({ commit }, { id, skuId, sku, type, amount }) {
      if (id) {
        console.log(sku)
        return await axios
          .put(`http://localhost:3000/inventoryList/${id}`, {
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
                sku.marketplaces
              ),
              type,
              amount
            );
            commit('EDIT_ALL', model);
            console.log('Edit Success!!');
            return Promise.resolve(model);
          });
      }
    },
    async delete({ commit }, id) {
      console.time('Delete by ID');
      return await axios
        .delete(`http://localhost:3000/inventoryList/${id}`)
        .then((result) => {
          console.log('Delete Success!!');
          commit('DELETE_ALL', id);
          console.timeEnd('Delete by ID');
          return Promise.resolve(id);
        })
        .catch((err) => {
          console.error(err);
          Promise.reject(err.message);
        });
    },
    async add({ commit }, item) {
      let { id, skuId, sku, type, amount } = item;
      await axios
        .get(`http://localhost:3000/inventoryList?skuId=${skuId}&type=${type}`)
        .then(async (result) => {
          // console.log(result.data);
          if (result.data.length == 0) {
            return await axios
              .post('http://localhost:3000/inventoryList', {
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
                    sku.marketplaces
                  ),
                  type,
                  amount
                );
                commit('PUSH_ALL', model);
                return Promise.resolve(model);
              })
              .catch((err) => {
                console.error(err);
                Promise.reject(err.message);
              });
          } else {
            const inventoryData = result.data[0];
            return await axios
              .put(`http://localhost:3000/inventoryList/${inventoryData.id}`, {
                id,
                skuId,
                sku,
                type,
                amount: inventoryData.amount + amount,
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
                    sku.marketplaces
                  ),
                  type,
                  amount
                );
                commit('EDIT_ALL', model);
                return Promise.resolve(model);
              })
              .catch((err) => {
                console.error(err);
                Promise.reject(err.message);
              });
          }
        });
    },
  },
};
