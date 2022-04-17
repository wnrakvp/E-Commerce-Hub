// import api from "../../api";
import axios from "axios";
import ProductModel from "../../models/product";
import SKUModel from "../../models/sku";
export default {
  namespaced: true,
  state() {
    return {
      all: [],
      productId: null,
    };
  },
  getters: {
    all: (state) =>
      state.all.filter((x) =>
        state.productId === null ? true : x.productId === state.productId
      ),
  },
  mutations: {
    SET_PRODUCT_ID(state, value) {
      state.productId = value;
    },
    SET_ALL(state, value) {
      state.all = value;
    },
    EDIT_ALL(state, value) {
      const item = state.all.find(({ id }) => id === value.id);
      Object.assign(item, value);
    },
    UNSHIFT_ALL(state, value) {
      state.all.push(value);
    },
    DELETE_ALL(state, value) {
      state.all = state.all.filter(({ id }) => id !== value);
    },
  },
  actions: {
    async getAll({ commit }) {
      // // -------------------------Mock Json-Server-----------------------------
      // console.time("Get All SKUs")
      // return await axios
      //   .get("http://localhost:3000/skuList")
      //   .then((res) => {
      //     const skuList = [];
      //     res.data.forEach(
      //       ({
      //         id,
      //         productId,
      //         product,
      //         name,
      //         desc,
      //         price,
      //         image,
      //         marketplaces,
      //       }) => {
      //         skuList.push(
      //           new SKUModel(
      //             id,
      //             productId,
      //             new ProductModel(
      //               product.id,
      //               product.name,
      //               product.desc,
      //               product.image
      //             ),
      //             name,
      //             desc,
      //             price,
      //             image,
      //             new Set(marketplaces)
      //           )
      //         );
      //       }
      //     );
      //     commit("SET_ALL", skuList);
      //     console.timeEnd("Get All SKUs")
      //     // TODO: throw something to router for handle state
      //     return Promise.resolve(skuList);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     return Promise.resolve("200");
      //   });
      //   // ---------------------------------------------------------------------------
      // -----------------------------NodeJS Server----------------------------------------------
      return await axios
        .get("http://localhost:5000/api/v1/skus")
        .then((result) => {
          console.log(result.data.data)
          const skuList = [];
          result.data.data.forEach(
            ({ _id, product, name, attributes, price, url, marketplaces }) => {
              skuList.push(
                new SKUModel(
                  _id,
                  new ProductModel(
                    product._id,
                    product.name,
                    product.description,
                    product.url
                  ),
                  name,
                  attributes,
                  price,
                  url,
                  new Set(marketplaces)
                )
              );
            }
          );
          commit("SET_ALL", skuList);
          return Promise.resolve(skuList);
        })
        .catch((err) => {
          console.error(err);
          return Promise.resolve("200");
        });
      // ----------------------------------------------------------------------------------------
    },
    async get(context, id) {
      // // -------------------------Mock Json-Server-----------------------------
      // return axios
      //   .get("http://localhost:3000/skuList/" + id)
      //   .then((result) => {
      //     let {
      //       id,
      //       productId,
      //       product,
      //       name,
      //       desc,
      //       price,
      //       image,
      //       marketplaces,
      //     } = result.data;
      //     console.debug(id, product, name, desc, price, image, marketplaces);
      //     const model = new SKUModel(
      //       id,
      //       productId,
      //       new ProductModel(
      //         product.id,
      //         product.name,
      //         product.desc,
      //         product.image
      //       ),
      //       name,
      //       desc,
      //       price,
      //       image,
      //       new Set(marketplaces)
      //     );
      //     // return axios.get('http://localhost:3000/skuList/'+id).then((res) => {
      //     // TODO: throw something to router for handle state
      //     return Promise.resolve(model);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     Promise.reject(err.message);
      //   });
      //   // --------------------------------------------------------------------
       // -----------------------------NodeJS Server----------------------------------------------
       console.log(id)
       return await axios
       .get(`http://localhost:5000/api/v1/sku/${id}`)
       .then((result) => {
        let { _id, product, name, attributes, price, url, marketplaces } = result.data.data;
         const model = 
               new SKUModel(
                 _id,
                 new ProductModel(
                   product._id,
                   product.name,
                   product.description,
                   product.url
                 ),
                 name,
                 attributes,
                 price,
                 url,
                 new Set(marketplaces)
               )
         return Promise.resolve(model);
       })
       .catch((err) => {
         console.error(err);
         return Promise.resolve(err.message);
       });
     // ----------------------------------------------------------------------------------------
    },
    filterById({ commit }, productId) {
      commit("SET_PRODUCT_ID", productId);
    },
    draft() {
      const product = new ProductModel("", "", "", "");
      return Promise.resolve(
        new SKUModel(
          "",
          "",
          product,
          "",
          "",
          0,
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdT-CMjPc50R-jKEvJl_rcn3mBMvkcUwERg",
          new Set(["shopee", "lazada"])
        )
      );
    },
    save(
      { commit },
      { id, productId, product, name, desc, price, image, marketplaces }
    ) {
      if (id) {
        console.log(product);
        return axios
          .put("http://localhost:3000/skuList/" + id, {
            id,
            productId,
            product,
            name,
            desc,
            price,
            image,
            marketplaces: [...marketplaces],
          })
          .then((result) => {
            console.log("Edit Success!!");
            const {
              id,
              productId,
              product,
              name,
              desc,
              price,
              image,
              marketplaces,
            } = result.data;
            const model = new SKUModel(
              id,
              productId,
              new ProductModel(
                product.id,
                product.name,
                product.desc,
                product.image
              ),
              name,
              desc,
              price,
              image,
              new Set(marketplaces)
            );
            commit("EDIT_ALL", model);
            return Promise.resolve(model);
          })
          .catch((err) => {
            console.error(err);
            Promise.reject(err.message);
          });
      } else {
        return axios
          .post("http://localhost:3000/skuList", {
            id,
            productId,
            product,
            name,
            desc,
            price,
            image,
            marketplaces: [...marketplaces],
          })
          .then((result) => {
            console.log("Create Success!!");
            console.debug(result);
            const { id, product } = result.data;
            const model = new SKUModel(
              id,
              productId,
              new ProductModel(
                product.id,
                product.name,
                product.desc,
                product.image
              ),
              name,
              desc,
              price,
              image,
              new Set(marketplaces)
            );
            commit("UNSHIFT_ALL", model);
            return Promise.resolve(model);
          })
          .catch((err) => {
            console.error(err);
            Promise.reject(err.message);
          });
      }
    },
    delete({ commit }, id) {
      return axios
        .delete("http://localhost:3000/skuList/" + id)
        .then(({ result }) => {
          console.log("Delete Success!!");
          commit("DELETE_ALL", id);
          return Promise.resolve(id);
        })
        .catch((err) => {
          console.error(err);
          Promise.reject(err.message);
        });
    },
  },
};
