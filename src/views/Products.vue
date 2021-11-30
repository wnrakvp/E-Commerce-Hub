<template>
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center pb-2">
      <h6 class="h6 my-0">Product Management</h6>
      <router-link :to="{ name: 'product-item', params: { id: 'add' } }" custom v-slot="{ navigate }">
        <button class="btn btn-sm btn-outline-secondary" @click="navigate"><i class="bi-plus-circle"></i> Add</button>
      </router-link>
    </div>
    <router-link v-for="(item, idx) in productList" :to="{ name: 'product-item', params: { id: item.id } }" :key="idx" custom v-slot="{ navigate }">
      <ProductItem @click="navigate" v-bind="{
        title: item.name,
        details: item.desc,
        imageURL: item.image
      }"/>
    </router-link>
    <small class="d-block text-center mt-3">
      <a href="#">View More</a>
    </small>
  </div>
  <router-view></router-view>
</template>
<script>
import ProductItem from '../elements/ProductObject.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    ProductItem
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