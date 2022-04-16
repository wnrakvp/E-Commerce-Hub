// import api from '../../api';
import axios from 'axios';
import ProductModel from '../../models/product';
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
      console.time("Get All Products")
      return await axios
        .get('http://localhost:3000/productList')
        .then((res) => {
          const productList = [];
          res.data.forEach(({id,name,desc,image}) => {
            productList.push(new ProductModel(id, name, desc, image))
          })
          commit('SET_ALL', productList);
          // console.log(productList)
          console.timeEnd("Get All Products")
          return Promise.resolve(productList)
          // TODO: throw something to router for handle state
        })
        .catch((err) => {
          console.error(err);
          return Promise.resolve('200');
        });
    },
    get(context, id) {
        return axios
        .get('http://localhost:3000/productList/' + id)
        .then((res) => {
          let { id, name, desc, image } = res.data;
          const model = new ProductModel(id, name, desc, image);
          // TODO: throw something to router for handle state
          console.log('Viewing...')
          return Promise.resolve(model);
        })
        .catch(Promise.reject);
    },
    draft() {
      return Promise.resolve(
        new ProductModel(
          '',
          '',
          '',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdT-CMjPc50R-jKEvJl_rcn3mBMvkcUwERg'
        )
      );
    },
    save({ commit }, { id, name, desc, image }) {
      if (id) {
        // return api
        //   .updateProduct(id, name, desc, image)
        //   .then(({ result }) => {
        //     const { _id } = result;
        return axios
          .put('http://localhost:3000/productList/' + id, {
            id: id,
            name: name,
            desc: desc,
            image: image,
          })
          .then((res) => {
            console.log('Edit Success!!');
            let {id, name, desc, image} = res.data
            const model = new ProductModel(id, name, desc, image);
            commit('EDIT_ALL', model);
            return Promise.resolve(model);
          })
          .catch(Promise.reject);
      } else {
        // return api
        //   .createProduct(name, desc, image)
        //   .then(({ result }) => {
        //     const { _id } = result;
        return axios
          .post('http://localhost:3000/productList/', {
            id: id,
            name: name,
            desc: desc,
            image: image,
          })
          .then((res) => {
            console.log('Create Success!!');
            let {id, name, desc, image} = res.data
            const model = new ProductModel(id, name, desc, image);
            commit('UNSHIFT_ALL', model);
            return Promise.resolve(model);
          })
          .catch(Promise.reject);
      }
    },
    delete({ commit }, id) {
      // return api
      //   .deleteProduct(id)
      //   .then(({ result }) => {
        return axios.delete('http://localhost:3000/productList/'+id).then(res => {
          console.log('Delete Success!!')
          commit('DELETE_ALL', id);
          return Promise.resolve(id);
        })
        .catch(Promise.reject);
    },
  },
};
