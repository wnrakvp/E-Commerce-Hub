import axios from "axios";
import ProductModel from "../../models/product";
const PORT = 5000
const endpoint="http://localhost:" + PORT + "/api/v1/products"
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
      state.all.push(value);
    },
    DELETE_ALL(state, value) {
      state.all = state.all.filter(({ id }) => id !== value);
    },
  },
  actions: {
    async getAll({ commit }) {
      // return api.getAllProducts().then(({result}) => {
      //   const productList = []
      //   result.forEach(({_id, name, desc, image}) => {
      //     productList.push(new ProductModel(_id, name, desc, image))
      //   })
      // // ------------------MOCK Json-Server-------------------
      // console.time("Get All Products")
      // return await axios
      //   .get('http://localhost:3000/productList')
      //   .then((res) => {
      //     const productList = [];
      //     res.data.forEach(({id,name,desc,image}) => {
      //       productList.push(new ProductModel(id, name, desc, image))
      //     })
      //     commit('SET_ALL', productList);
      //     // console.log(productList)
      //     console.timeEnd("Get All Products")
      //     return Promise.resolve(productList)
      //     // TODO: throw something to router for handle state
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     return Promise.resolve('200');
      //   });
      //   // -----------------------------------------------
      // ---------------------------------NodeJS Server-----------------------------------------
      await axios
        .get(endpoint)
        .then((result) => {
          const productList = [];
          result.data.data.forEach(({ _id, name, description, url }) => {
            productList.push(new ProductModel(_id, name, description, url));
          });
          commit("SET_ALL", productList);
          return Promise.resolve(productList);
        })
        .catch((err) => {
          console.error(err);
          return Promise.resolve("200");
        });
      // --------------------------------------------------------------------------------------
    },
    async get(context, id) {
      // // ------------------MOCK Json-Server-------------------
      //   return axios
      //   .get('http://localhost:3000/productList/' + id)
      //   .then((res) => {
      //     let { id, name, desc, image } = res.data;
      //     const model = new ProductModel(id, name, desc, image);
      //     // TODO: throw something to router for handle state
      //     console.log('Viewing...')
      //     return Promise.resolve(model);
      //   })
      //   .catch(Promise.reject);
      //   // ---------------------------------------------------
      // ------------------------NodeJS Server---------------------------
      await axios
        .get(endpoint+`/${id}`)
        .then((result) => {
          let { _id, name, description, url } = result.data.data;
          const model = new ProductModel(_id, name, description, url);
          return Promise.resolve(model);
        })
        .catch(Promise.reject);
      // ----------------------------------------------------------------
    },
    draft() {
      return Promise.resolve(
        new ProductModel(
          "",
          "",
          "",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdT-CMjPc50R-jKEvJl_rcn3mBMvkcUwERg"
        )
      );
    },
    async save({ commit }, { id, name, desc, image }) {
      if (id != "add") {
        // // ------------------MOCK Json-Server-------------------
        // return axios
        //   .put("http://localhost:3000/productList/" + id, {
        //     id: id,
        //     name: name,
        //     desc: desc,
        //     image: image,
        //   })
        //   .then((res) => {
        //     console.log("Edit Success!!");
        //     let { id, name, desc, image } = res.data;
        //     const model = new ProductModel(id, name, desc, image);
        //     commit("EDIT_ALL", model);
        //     return Promise.resolve(model);
        //   })
        //   .catch(Promise.reject);
        // // ---------------------------------------------------
        // ----------------------NodeJS Server-----------------------------
        await axios
          .put(endpoint + `/${id}`, {
            name: name,
            description: desc,
            url: image,
          })
          .then((result) => {
            let { _id, name, description, url } = result.data.data;
            const model = new ProductModel(_id, name, description, url);
            commit("EDIT_ALL", model);
            return Promise.resolve(model);
          })
          .catch(Promise.reject);
        // ----------------------------------------------------------------
      } else {
        // // ------------------MOCK Json-Server-------------------
        // return axios
        //   .post("http://localhost:3000/productList/", {
        //     id: id,
        //     name: name,
        //     desc: desc,
        //     image: image,
        //   })
        //   .then((res) => {
        //     console.log("Create Success!!");
        //     let { id, name, desc, image } = res.data;
        //     const model = new ProductModel(id, name, desc, image);
        //     commit("UNSHIFT_ALL", model);
        //     return Promise.resolve(model);
        //   })
        //   .catch(Promise.reject);
        //   // ---------------------------------------------------
        // ----------------------NodeJS Server-----------------------------
        await axios
          .post(endpoint, {
            name: name,
            description: desc,
            url: image,
          })
          .then((result) => {
            let { _id, name, description, url } = result.data.data;
            const model = new ProductModel(_id, name, description, url);
            commit("UNSHIFT_ALL", model);
            return Promise.resolve(model);
          })
          .catch(Promise.reject);
        // ----------------------------------------------------------------
      }
    },
    async delete({ commit }, id) {
      // // ------------------MOCK Json-Server-------------------
      // return await axios
      //   .delete("http://localhost:3000/productList/" + id)
      //   .then((res) => {
      //     console.log("Delete Success!!");
      //     commit("DELETE_ALL", id);
      //     return Promise.resolve(id);
      //   })
      //   .catch(Promise.reject);
      // // -----------------------------------------------------
      // ----------------------NodeJS Server-----------------------------
      await axios
        .delete(endpoint + `/${id}`)
        .then((result) => {
          console.debug(result)
          commit("DELETE_ALL", id);
          return Promise.resolve(id);
        })
        .catch(Promise.reject);
      // ----------------------------------------------------------------
    },
  },
};
