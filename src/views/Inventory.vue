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
            <th scope="col">Product</th>
            <th scope="col">SKU</th>
            <th scope="col">Amount</th>
            <th scope="col">On Sell/On Hand</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in skuList" :key="i">
            <td>{{ item.product?.name }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.amount }}</td>
            <td>On Sell/ On Hand</td>
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
    Promise.all([this.getAllProducts(), this.getAllSKU()])
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
      filterById: "filterById",
    }),
    Logger() {
      console.log(this.skuList);
    }
  },
};
</script>
