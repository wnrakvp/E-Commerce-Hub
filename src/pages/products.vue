<template>
  <div class="row">
      <div class="col-md-6">
        <div class="my-3 p-3 bg-body rounded shadow-sm">
          <h6 class="border-bottom pb-2 mb-0 d-flex justify-content-between">
            <span>Products</span>
            <i class="bi-plus-circle"></i>
          </h6>
          <router-link v-for="(item, idx) in productList" :to="{ name: 'sku', params: { id: item.id } }"><MediaObject :="item"/></router-link>
        </div>
      </div>
      <router-view></router-view>
  </div>
</template>
<script>
import MediaObject from '../elements/mediaobject.vue'
export default {
  components: {
    MediaObject
  },
  data () {
    return {
      productList: [
        { id: 1, title: 'Product Name 1', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
        { id: 2, title: 'Product Name 2', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
        { id: 3, title: 'Product Name 3', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
        { id: 4, title: 'Product Name 4', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      ]
    }
  }
}
</script>