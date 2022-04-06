<template>
<div class="offcanvas offcanvas-end" tabindex="-1" ref="ProductItem" aria-labelledby="ProductItemLabel" >
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="ProductItemLabel">{{id==='add'?'Add':'Edit'}} Product Item</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form @submit.prevent="submit">
      <fieldset :disabled="disabled">
        <div class="mb-3">
          <label for="productName" class="form-label">Product Name</label>
          <input type="text" class="form-control" id="productName" placeholder="What is the name of the product?" v-model="name">
        </div>
        <div class="mb-3">
          <label for="productDescription" class="form-label">Description</label>
          <textarea class="form-control" id="productDescription" rows="5" placeholder="Please describe your product ..."
          v-model="desc"></textarea>
        </div>
        <div class="mb-3">
          <label for="productImage" class="form-label">Image</label>
          <input class="form-control" type="file" id="productImage">
        </div>
        <hr>
        <div v-if="id === 'add'" class="mb-3 text-end">
          <button v-if="isSaving" type="submit" class="btn btn-primary">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Saving...
          </button>
          <button v-else type="submit" class="btn btn-primary">Add Product</button>
        </div>
        <div v-else class="mb-3 d-flex justify-content-between">
          <button v-if="isDeleting" type="button" class="btn btn btn-outline-danger">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Deleting...
          </button>
          <button v-else type="button" class="btn btn btn-outline-danger" @click="remove"><i class="bi-trash"></i> Delete</button>
          <button v-if="isSaving" type="submit" class="btn btn-primary">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Saving...
          </button>
          <button v-else type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </fieldset>
    </form>
  </div>
</div>
</template>

<script>
import {Offcanvas} from 'bootstrap'
import { mapActions } from 'vuex'
export default {
  props: {
    id: String
  },
  mounted() {
    if (this.id === 'add') {
      this.draft().then(o => {
        this.name = o.name
        this.desc = o.desc
        this.image = o.image
        this._offcanvas = new Offcanvas(this.$refs.ProductItem)
        this._offcanvas.show()
        this.$refs.ProductItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    } else {
      this.get(Number(this.id)).then(o => {
        this.name = o.name
        this.desc = o.desc
        this.image = o.image
        this._offcanvas = new Offcanvas(this.$refs.ProductItem)
        this._offcanvas.show()
        this.$refs.ProductItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    }
  },
  data () {
    return {
      _offcanvas: null,
      disabled: false,
      isSaving: false,
      isDeleting: false,
      name: '',
      desc: '',
      image: null,
    }
  },
  methods: {
    close () {
      this.$router.replace({ name: 'products' })
    },
    submit () {
      this.disabled = true
      this.isSaving = true
      const {id, name, desc, image} = this
      this.save({id: Number(id), name, desc, image}).then(() => {
        this.disabled = false
        this.isSaving = false
        this._offcanvas.hide()
      }).catch(console.error)
    },
    remove () {
      this.disabled = true
      this.isDeleting = true
      const {id} = this
      this.delete(Number(id)).then(() => {
        this.disabled = false
        this.isDeleting = false
        this._offcanvas.hide()
      }).catch(console.error)
    },
    ...mapActions('Products', {
      draft: 'draft',
      get: 'get',
      save: 'save',
      delete: 'delete'
    })
  }
}
</script>
