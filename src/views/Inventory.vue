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
            <th scope="col">Inventory Type</th>
            <th scope="col">Product</th>
            <th scope="col">SKU</th>
            <th scope="col">On Sell/On Hand</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in inventoryList" :key="i">
            <td><strong>{{ item.type }}</strong></td>
            <td>{{ item.product.name }}<br><img class="img-fluid" style="max-width: 150px; max-height:150px" :src="item.sku.image"></td>
            <td>{{ item.sku.name }}</td>
            <td>{{ SumStock(item.skuId) }}/ {{ item.sku.amount }}</td>
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
    Promise.all([this.getAllProducts(), this.getAllSKU(), this.getAll(), this.getAllInventory()])
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
    ...mapGetters('Stock', {
      stockList: 'all'
    }),
    ...mapGetters('Inventory', {
      inventoryList: 'all'
    }),
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions("Products", {
      getAllProducts: "getAll",
    }),
    ...mapActions("SKU", {
      getAllSKU: "getAll",
    }),
    ...mapActions('Stock', {
      getAll: 'getAll'
    }),
    ...mapActions('Inventory', {
      getAllInventory: 'getAll'
    }),
    SumStock(skuId) {
      // const sum = 0;
      // for(i in this.stockList){
      //   for(j in this.stockList[i].items) {
      //     if (skuId == this.stockList[i].items[j].skuId) {
      //       sum += this.stockList[i].items[j].amountOnSell;
      //     } else {
      //       sum += 0;
      //     }
      //   }
      // }
      // return sum;
    },
    Logger() {
      console.log(this.inventoryList);
    }
  },
};
</script>
