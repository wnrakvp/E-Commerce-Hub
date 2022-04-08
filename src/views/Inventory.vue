<template>
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <div
      class="d-flex justify-content-between align-items-center border-bottom pb-1"
    >
      <h6 class="h6 my-0">Inventory Management</h6>
      <button class="btn btn-sm btn-outline-secondary" @click="Logger">
        <i class="bi-plus-circle"></i> Logger
      </button>
    </div>
    <div class="table-responsive">
      <table class="table text-center align-middle">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Warehouse</th>
            <th colspan ="2">Product</th>
            <th scope="col">SKU</th>
            <th scope="col">Total</th>
            <th scope="col">Reserved</th>
            <th scope="col">Available</th>
            <th scope="col">Views</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in inventoryList" :key="i">
          <td></td>
            <td><strong>{{ item.type }}</strong></td>
            <td><img class="img-fluid rounded-start" style="max-width: 50px; max-height:50px" :src="item.sku.image"></td>
            <td>{{ item.product.name }}</td>
            <td>{{ item.sku.name }}</td>
            <td>{{ item.sku.amount }}</td>
            <td>{{ Reserved(item.skuId) }}</td>
            <td>{{ item.sku.amount - Reserved(item.skuId) }}</td>
            <td><button class="btn btn-sm btn-outline-secondary" ><i class="bi-three-dots"></i></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <router-view></router-view>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    Promise.all([this.getAllProducts(), this.getAllSKU(), this.getAllInventory(), this.getAllStock()])
      .then((result) => {
        console.debug(result);
      })
      .catch(console.error);
  },
  computed: {
    ...mapGetters("Products", {
      productList: "all",
    }),
    ...mapGetters("SKU", {
      skuList: "all",
    }),
    ...mapGetters("Inventory", {
      inventoryList: "all",
    }),
    ...mapGetters("Stock", {
      stockList: "all",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("Products", {
      getAllProducts: "getAll",
    }),
    ...mapActions("SKU", {
      getAllSKU: "getAll",
    }),
    ...mapActions("Inventory", {
      getAllInventory: "getAll",
    }),
    ...mapActions("Stock", {
      getAllStock: "getAll",
    }),
    Reserved(id) {
      var total = 0;
      var item;
      for (let i = 0; i < this.stockList.length; i++) {
        item = this.stockList[i].items;
        // console.log(i);
        for(let j = 0; j < item.length; j++ ) {
          // console.log(j);
          if (id == item[j].skuId) {
              total = total + item[j].amountOnSell;   
            } 
          }
      }
      return total;
    },
    Logger() {
      console.log(this.stockList[0].items[2]);
    }
  },
};
</script>
