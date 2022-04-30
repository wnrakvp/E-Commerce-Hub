// import api from '../../api'
import axios from 'axios';
import OrderModel from '../../models/order'
import OrderLineItemModel from '../../models/orderLineItem'
import SKUModel from '../../models/sku'

const PORT = 5000
const endpoint="http://localhost:" + PORT + "/api/v1/Orders"

export default {
  namespaced: true,
  state () {
    return {
      all: [],
      orderStatus: null,
    }
  },
  getters: {
    all: (state) => 
      state.all.filter((x) =>
        state.orderStatus === null ? true : x.orderStatus === state.orderStatus
      ),
  },
  mutations: {
    SET_ALL (state, value) {
      state.all = value
      
    },
    SET_ORDERSTATUS(state, value) {
      state.orderStatus = value;
    },
    EDIT_ALL (state, value) {
      const item = state.all.find(({ id }) => id === value.id)
      Object.assign(item, value)
    },
    UNSHIFT_ALL (state, value) {
      state.all.unshift(value)
    },
    PUSH_ALL (state, value) {
      state.all.push(value)
    },
    DELETE_ALL (state, value) {
      state.all = state.all.filter(({id}) => id !== value)
    }
  },
  actions: {
    getAll({ commit }) {
      console.time('GET All Order');
      return axios     
        .get(endpoint)
        .then((result) => {
          // console.log('######'+result.data.data);
          const orderList = [];
          result.data.data.forEach(({ _id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items }) => {
            orderList.push(
              new OrderModel(
                _id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items));
          });
          // console.log('getAll OrderList ...'+orderList);
          console.timeEnd('GET All Order');
          commit("SET_ALL", orderList);
          return Promise.resolve(orderList);
        })
        .catch((err) => {
          console.error(err);
          return Promise.resolve("200");
        });   
    },
    get (context, id) {
      console.log('get by id...');
      return axios
      .get(`${endpoint}/${id}`)
      .then((result) => {     
        let {_id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items} = result.data.data
        console.debug(_id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items)    

        const model = new OrderModel(_id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items)
        return Promise.resolve(model)
      }).catch(err => {
        console.error(err)
        Promise.reject(err.message)
      })
    },
    filterById ({commit}, productId) {
      commit('SET_PRODUCT_ID', productId)
    },
    filterByOrderStatus ({commit}, orderStatus) {
      commit('SET_ORDERSTATUS', orderStatus)
      
      console.log('filterByOrderStatus')
      console.log(orderStatus)
    },
    draft () {
      const model = new OrderModel('', new Date(), '', [])
      return Promise.resolve(model)
    },
    async save ({commit}, { date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items}) {
      if (id == 'add') {      
        console.time('Adding Order...');
        return await axios
          .post(endpoint + "${id}", {
            date: date,
            marketplace: marketplace,
            orderNo: orderNo,
            trackNo: trackNo,
            orderStatus: orderStatus,
            courier: courier,
            deliveryBy: deliveryBy,
            items: [...items]
          })
          .then((result) => {
            const { _id, items:lineItems } = result
            console.debug(_id, lineItems)
            const items = []
            lineItems.forEach(({skuId, sku: skuDetails, price, amount}) => {
              const sku = new SKUModel(
                skuDetails._id,
                skuDetails.productId,
                null,
                skuDetails.name,
                skuDetails.desc,
                skuDetails.price,
                skuDetails.image,
                new Set(skuDetails.marketplaces)
              )
              items.push(new OrderLineItemModel(skuId, sku, price, amount))
            })
            const model = new OrderModel(_id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items)
            commit('PUSH_ALL', model)
            return Promise.resolve(model)
          }).catch(Promise.reject)       
        } else {
          console.time('Editing Order...');
          return await axios
            .put(endpoint + "${id}", {
              date: date,
              marketplace: marketplace,
              orderNo: orderNo,
              trackNo: trackNo,
              orderStatus: orderStatus,
              courier: courier,
              deliveryBy: deliveryBy,
              items: [...items]
            })
            .then((result) => {
              const { _id, items:lineItems } = result
              console.debug(_id, lineItems)
              const items = []
              lineItems.forEach(({skuId, sku: skuDetails, price, amount}) => {
                const sku = new SKUModel(
                  skuDetails._id,
                  skuDetails.productId,
                  null,
                  skuDetails.name,
                  skuDetails.desc,
                  skuDetails.price,
                  skuDetails.image,
                  new Set(skuDetails.marketplaces)
                )
                items.push(new OrderLineItemModel(skuId, sku, price, amount))
              })
              const model = new OrderModel(_id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items)
              commit('EDIT_ALL', model)
              return Promise.resolve(model)
            }).catch(Promise.reject)  
        }
      },
      async update({ commit }, { id, trackNo, orderStatus, courier, deliveryBy }) { 
        try{             
          console.log('Editing Order');
          console.time('Editing Order');
          await axios
            .put(endpoint + `/${id}`, {
              trackNo: trackNo,
              orderStatus: orderStatus,
              courier: courier,
              deliveryBy: deliveryBy
            })
            .then((result) => {
              console.log(result.data.data);
              const {_id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items} = result.data.data
              // const items = []
              // lineItems.forEach(({skuId, sku: skuDetails, price, amount}) => {
              //   const sku = new SKUModel(
              //     skuDetails._id,
              //     skuDetails.productId,
              //     null,
              //     skuDetails.name,
              //     skuDetails.desc,
              //     skuDetails.price,
              //     skuDetails.image,
              //     new Set(skuDetails.marketplaces)
              //   )
              //   items.push(new OrderLineItemModel(skuId, sku, price, amount))
              // })
              const model = new OrderModel(_id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items)
              commit('EDIT_ALL', model)
              return Promise.resolve(model)
            });
        } catch (err) {
          console.error(err);
          return Promise.reject;
        }       
      },
    delete({ commit }, id) {
      console.time('Deleting Order...');
      return axios
        .delete(endpoint + "/${id}")
        .then((result) => {
          console.debug(result);
          commit('DELETE_ALL', id);
          console.timeEnd('Deleting Order...');
          return Promise.resolve(id);
        })
        .catch((err) => {
          console.error(err);
          Promise.reject(err.message);
        });
    },
    fetch({ commit }) {
      console.log('fetch Order ...');
      return axios     
        .get(endpoint)
        .then((result) => {
          const orderList = [];
          result.data.data.forEach(({ _id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items }) => {
            orderList.push(
              new OrderModel(
                _id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items));
          });

          commit("SET_ALL", orderList);
          return Promise.resolve(orderList);
        })
        .catch((err) => {
          console.error(err);
          return Promise.resolve("200");
        });   
    },
    fetchTest({ commit }) {
      console.log('fetch Order ...');
      return axios     
        .get(endpoint)
        .then((result) => {
          const orderList = [];
          result.data.data.forEach(({ _id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items }) => {
            orderList.push(
              new OrderModel(
                _id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items));
          });

          commit("SET_ORDERSTATUS", orderList);
          return Promise.resolve(orderList);
        })
        .catch((err) => {
          console.error(err);
          return Promise.resolve("200");
        });   
    },
  //   async myFetch(statusValue) {
  //     try {
  //        const response = await fetch(endpoint);
  //        console.log('Fetch - Got response:', response);
   
  //        const data = await response.json();
  //        console.log('Fetch - Got data:', data);
  //        console.log('data.data', data.data);
  //        console.log('data.data.orderNo', data.data[0].orderNo);

  //        const orderList = [];
  //         data.data.forEach(({ _id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items }) => {
  //           console.log('status: ',statusValue)
  //           console.log('order status: ',orderStatus)

  //           if (statusValue === orderStatus) {
  //             orderList.push(new OrderModel(_id, date, marketplace, orderNo, trackNo, orderStatus, courier, deliveryBy, items));
  //           }
  //         });

  //         console.log('Fetch - Got orderList:', orderList);
  //        return { orderList, orderStatus: response.orderStatus }
  //     }
  //     catch (e) {
  //        console.error(`An error has occured while calling the API. ${e}`);
  //        throw e;
  //     }
  //  },
  }
}