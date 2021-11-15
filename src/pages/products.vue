<template>
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center border-bottom pb-1">
      <h6 class="h6 my-0">Products</h6>
      <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i class="bi-plus-circle"></i></button>
    </div>
    <router-link v-for="(item, idx) in productList" :to="{ name: 'product-item', params: { id: item.id } }" :key="idx" custom v-slot="{ navigate }">
      <MediaObject @click="navigate" v-bind="{ title: item.name, details: item.desc }"/>
    </router-link>
    <small class="d-block text-end mt-3">
      <a href="#">All updates</a>
    </small>
  </div>
  <router-view></router-view>
  <div class="offcanvas offcanvas-start show" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
      </div>
      <div class="dropdown mt-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
          Dropdown button
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import MediaObject from '../elements/mediaobject.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    MediaObject
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
      // productList: [
      //   { id: 1, title: 'Product Name 1', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      //   { id: 2, title: 'Product Name 2', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      //   { id: 3, title: 'Product Name 3', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      //   { id: 4, title: 'Product Name 4', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      //   { id: 1, title: 'Product Name 1', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      //   { id: 2, title: 'Product Name 2', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      //   { id: 3, title: 'Product Name 3', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      //   { id: 4, title: 'Product Name 4', details: 'Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?' },
      // ]
    }
  },
  methods: {
    ...mapActions('Products', {
      getAllProducts: 'getAll'
    })
  }
}
</script>