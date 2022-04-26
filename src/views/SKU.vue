<template>
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center pb-2">
      <h6 class="h6 my-0">SKU Management <i class="bi-question-circle"></i></h6>
      <div class="btn-group" role="group">
        <div class="btn-group" role="group">
          <button id="FilterProductItem" type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false"><i class="bi-funnel"></i> Filter by Product</button>
          <ul class="dropdown-menu" aria-labelledby="FilterProductItem">
            <li><a class="dropdown-item" @click="filterById(null)">View All</a></li>
            <li v-for="(item, idx) in productList" :key="idx">
              <a class="dropdown-item" @click="filterById(item.id)">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <router-link :to="{ name: 'sku-item', params: { id: 'add' } }" custom v-slot="{ navigate }">
          <button class="btn btn-sm btn-outline-secondary" @click="navigate"><i class="bi-plus-circle"></i> Add</button>
        </router-link>
      </div>
    </div>
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        <router-link v-for="(item, idx) in skuList" :to="{ name: 'sku-item', params: { id: item.id } }" :key="idx" custom v-slot="{ navigate }">
          <div class="col align-self-stretch">
            <SKUItem @click="navigate" v-bind="{
              title: item.name,
              product: item.product.name,
              details: item.desc,
              price: item.price,
              imageURL: item.image,
              isShopee: item.marketplaces.has('shopee'),
              isLazada: item.marketplaces.has('lazada')
            }"/>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>
<script>
import SKUItem from './elements/SKUObject.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    SKUItem
  },
  mounted() {
    Promise.all([
      this.getAllSKU(),this.getAllProducts()
    ]).then(result => {
      console.debug(result)
      console.log(this.skuList)
      console.log(this.productList)
    }).catch(console.error)
  },
  computed: {
    ...mapGetters('Products', {
      productList: 'all',
    }),
    ...mapGetters('SKU', {
      skuList: 'all'
    }),
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('SKU', {
      getAllSKU: 'getAll',
      filterById: 'filterById'
    }),
    ...mapActions('Products', {
      getAllProducts: 'getAll',
    }),
  }
}
</script>