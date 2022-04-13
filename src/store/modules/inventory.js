import api from '../../api';
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
      return api
        .getAllInventory()
        .then(({ result }) => {
          const inventoryList = [];
          // const inventoryList = result.result;
          result.forEach(({ _id, skuId, sku, product , type, amount }) => {
            inventoryList.push(
              new InventoryModel(
                _id,
                skuId,
                new SKUModel(
                  sku._id,
                  sku.productId,
                  new ProductModel(
                    product._id,
                    product.name,
                    product.desc,
                    product.image
                  ),
                  sku.name,
                  sku.desc,
                  sku.price,
                  sku.type,
                  sku.amount,
                  sku.image,
                  null
                ),
                type,
                amount
              )
            );
          });
          commit('SET_ALL', inventoryList);
          return Promise.resolve(inventoryList);
        })
        .catch((err) => {
          console.error(err);
          return Promise.resolve('200');
        });
    },
    get(context, id) {
      return api.getInventory(id).then(({result}) => {
        // console.log(
        //   {result})
        let {_id, skuId, sku, product, type, amount} = result
        const model = new InventoryModel(
          _id,
          skuId,
          new SKUModel(
            sku._id,
            sku.productId,
            new ProductModel(
              product._id,
              product.name,
              product.desc,
              product.image
            ),
            sku.name,
            sku.desc,
            sku.price,
            sku.type,
            sku.amount,
            sku.image,
            null
          ),
          type,
          amount
        )
        console.log(model)
        return Promise.resolve(model)
      }).catch(err => {
        console.error(err)
        Promise.reject(err.message)
      })
    }
  },
};
