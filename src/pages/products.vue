<template>
  <div class="row">
      <div class="col-md-6">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Product</h1>
          <button class="btn"><i class="bi-plus-circle"></i></button>
        </div>
        <router-link v-for="(item, idx) in productList" :to="{ name: 'sku', params: { id: item.id } }" :key="idx"><MediaObject :="item"/></router-link>
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
        { id: 1, title: 'Product Name 1', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
        { id: 2, title: 'Product Name 2', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
        { id: 3, title: 'Product Name 3', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
        { id: 4, title: 'Product Name 4', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      ]
    }
  },
  methods: {
  }
}
</script>