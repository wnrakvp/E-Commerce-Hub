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
      try {
        console.time('Get All Inventory');
        const result = await axios.get(
          'http://localhost:5000/api/v1/inventories'
        );
        const inventoryList = [];
        result.data.data.forEach(
          ({ _id, date, warehousetype, availableamount, sku }) => {
            inventoryList.push(
              new InventoryModel(
                _id,
                date,
                new SKUModel(
                  sku._id,
                  new ProductModel(
                    sku.product._id,
                    sku.product.name,
                    sku.product.description,
                    sku.product.url
                  ),
                  sku.name,
                  sku.attributes,
                  sku.price,
                  sku.url,
                  new Set(sku.marketplaces)
                ),
                warehousetype,
                availableamount
              )
            );
          }
        );
        commit('SET_ALL', inventoryList);
        console.timeEnd('Get All Inventory');
        return Promise.resolve(inventoryList);
      } catch (err) {
        console.error(err);
        return Promise.reject;
      }
      // return await axios
      //   .get('http://localhost:3000/inventoryList')
      //   .then((result) => {
      //     const inventoryList = [];
      //     // const inventoryList = result.result;
      //     result.data.forEach(({ id, skuId, sku, type, amount }) => {
      //       inventoryList.push(
      //         new InventoryModel(
      //           id,
      //           skuId,
      //           new SKUModel(
      //             sku.id,
      //             sku.productId,
      //             new ProductModel(
      //               sku.product.id,
      //               sku.product.name,
      //               sku.product.desc,
      //               sku.product.image
      //             ),
      //             sku.name,
      //             sku.desc,
      //             sku.price,
      //             sku.image,
      //             sku.marketplaces
      //           ),
      //           type,
      //           amount
      //         )
      //       );
      //     });
      //     commit('SET_ALL', inventoryList);
      //     console.timeEnd('Get All Inventory');
      //     return Promise.resolve(inventoryList);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     return Promise.resolve('200');
      //   });
    },
    async get(context, id) {
      try {
        console.time('Get Inventory by ID');
        const result = await axios.get(
          `http://localhost:5000/api/v1/inventories/${id}`
        );
        let { _id, date, warehousetype, availableamount, sku } =
          result.data.data;
        const model = new InventoryModel(
          _id,
          date,
          new SKUModel(
            sku._id,
            new ProductModel(
              sku.product._id,
              sku.product.name,
              sku.product.description,
              sku.product.url
            ),
            sku.name,
            sku.attributes,
            sku.price,
            sku.url,
            new Set(sku.marketplaces)
          ),
          warehousetype,
          availableamount
        );
        console.log(model);
        console.timeEnd('Get Inventory by ID');
        return Promise.resolve(model);
      } catch (err) {
        console.error(err);
        return Promise.reject;
      }
    },
    async save({ commit }, { id, date, type, amount }) {
      try {
        console.time('Editing Inventory');
        await axios
          .put(`http://localhost:5000/api/v1/inventories/${id}`, {
            date: new Date().toISOString().slice(0, 10),
            warehousetype: type,
            availableamount: amount,
          })
          .then((result) => {
            console.log(result);
            let { _id, date, sku, warehousetype, availableamount } =
              result.data.data;
            const model = new InventoryModel(
              _id,
              date,
              new SKUModel(
                sku._id,
                new ProductModel(
                  sku.product._id,
                  sku.product.name,
                  sku.product.description,
                  sku.product.url
                ),
                sku.name,
                sku.attributes,
                sku.price,
                sku.url,
                new Set(sku.marketplaces)
              ),
              warehousetype,
              availableamount
            );
            commit('EDIT_ALL', model);
            console.timeEnd('Editing Inventory');
            return Promise.resolve(model);
          });
      } catch (err) {
        console.error(err);
        return Promise.reject;
      }
    },
    async delete({ commit }, id) {
      console.time('Deleting Inventory');
      return await axios
        .delete(`http://localhost:5000/api/v1/inventories/${id}`)
        .then((result) => {
          console.debug(result);
          commit('DELETE_ALL', id);
          console.timeEnd('Deleting Inventory');
          return Promise.resolve(id);
        })
        .catch((err) => {
          console.error(err);
          Promise.reject(err.message);
        });
    },
    add({ commit,dispatch }, item) {
      let { id, date, sku, type, amount, oldAmount } = item;
      console.log(id)
      if (id == null) {
        return axios
          .post(`http://localhost:5000/api/v1/inventories`, {
            date: date,
            warehousetype: type,
            availableamount: amount,
            sku: sku.id,
          })
          .then((result) => {
            // console.log(result.data.data)
            let { _id, date, sku, warehousetype, availableamount } =
              result.data.data;
            const model = new InventoryModel(
              _id,
              date,
              new SKUModel(
                sku._id,
                new ProductModel(
                  sku.product._id,
                  sku.product.name,
                  sku.product.description,
                  sku.product.url
                ),
                sku.name,
                sku.attributes,
                sku.price,
                sku.url,
                new Set(sku.marketplaces)
              ),
              warehousetype,
              availableamount
            );
            commit('UNSHIFT_ALL', model);
            return Promise.resolve(model);
          })
          .catch((err) => {
            console.error(err);
            Promise.reject(err.message);
          });
      } else {
        const payload = {
          id: item.id,
          date: item.date,
          type: item.type,
          amount: item.amount + item.oldAmount
        }
        // console.log(payload)
        dispatch('save',payload);
      }
    },
  },
};
