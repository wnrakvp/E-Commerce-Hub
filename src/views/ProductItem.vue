<template>
<div class="offcanvas offcanvas-end" tabindex="-1" ref="ProductItem" aria-labelledby="ProductItemLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="ProductItemLabel">Product Item</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form @submit.prevent="save">
      <div class="mb-3">
        <label for="productName" class="form-label">Product Name</label>
        <input type="text" class="form-control" id="productName" placeholder="Name" :value="one?.name">
      </div>
      <div class="mb-3">
        <label for="productDescription" class="form-label">Description</label>
        <textarea class="form-control" id="productDescription" rows="3" :value="one?.desc"></textarea>
      </div>
      <div class="mb-3">
        <label for="productImage" class="form-label">Image</label>
        <input class="form-control" type="file" id="productImage">
      </div>
      <hr>
      <div class="mb-3 text-end">
        <button type="submit" class="btn btn-primary">Add Product</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import {Offcanvas} from 'bootstrap'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    id: String
  },
  data() {
    return {
    }
  },
  mounted() {
    if (this.id === 'add') {
      this.create().then(o => {
        new Offcanvas(this.$refs.ProductItem).show()
        this.$refs.ProductItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    } else {
      this.getOne(Number(this.id)).then(o => {
        new Offcanvas(this.$refs.ProductItem).show()
        this.$refs.ProductItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    }
  },
  computed: {
    ...mapGetters('Products', {
      one: 'one'
    })
  },
  methods: {
    close() {
      this.$router.replace({ name: 'products' })
    },
    ...mapActions('Products', {
      getOne: 'getOne',
      create: 'create',
      save: 'save',
    })
  }
}
</script>
