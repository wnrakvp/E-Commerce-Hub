<template>
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center border-bottom pb-1">
      <h6 class="h6 my-0">Stock Management</h6>
      <router-link :to="{ name: 'stock-item', params: { id: 'add' } }" custom v-slot="{ navigate }">
        <button class="btn btn-sm btn-outline-secondary" @click="navigate"><i class="bi-plus-circle"></i> Add</button>
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Marketplace</th>
            <th scope="col">SKU Name</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
  <router-view></router-view>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
  },
  mounted () {
    this.getAllProducts().then(o => {
      console.debug(o)
    }).catch(console.error)
  },
  computed: {
    ...mapGetters('Products', {
      productList: 'all'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('Products', {
      getAllProducts: 'getAll'
    })
  }
}
</script>