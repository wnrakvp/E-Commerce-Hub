<template>
<div class="offcanvas offcanvas-end" tabindex="-1" ref="SKUItem" aria-labelledby="SKUItemLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="ProductItemLabel">{{id==='add'?'Add':'Edit'}} SKU Item</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form @submit.prevent="submit">
      <fieldset :disabled="disabled">
        <div class="mb-3">
          <label for="selectProduct" class="form-label">Product <i class="bi-question-circle"></i></label>
          <select class="form-select" id="selectProduct" v-model="productId" required>
            <option selected disabled value="">Select a current product</option>
            <option v-for="(item, idx) in productList"
            :key="idx"
            :value="item.id">{{item.name}}</option>
          </select>
          <!-- <div class="invalid-feedback">
          Please select a Product.
          </div> -->
        </div>
        <div class="mb-3">
          <label for="skuName" class="form-label">SKU Name <i class="bi-question-circle"></i></label>
          <input type="text" class="form-control" id="skuName" placeholder="Must be unique" v-model="name" required>
        </div>
        <div class="mb-3">
          <label for="skuDescription" class="form-label">Attributes <i class="bi-question-circle"></i></label>
          <textarea class="form-control" id="skuDescription" rows="1" placeholder="e.g. size, color, etc." v-model="desc" required></textarea>
        </div>
        <div class="mb-3">
          <label for="skuImage" class="form-label">Image <i class="bi-question-circle"></i></label>
          <input class="form-control" type="file" id="skuImage">
        </div>
        <div class="mb-3">
          <label for="originalPrice" class="form-label">Price</label>
          <input type="number"
          min="0"
          class="form-control"
          id="originalPrice"
          placeholder="How much does it cost?"
          v-model="price">
        </div>
        <!-- <div class="mb-3">
          <label for="originalAmount" class="form-label">Warehouse Type</label>
          <select class="form-select" id="selectWarehouse" v-model="type" required>
          <option selected disabled value="">Select a warehouse</option>
          <option value="Internal">Internal</option>
          <option value="External Warehouse">External Warehouse</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="originalAmount" class="form-label" :hidden="type==''">Amount</label>
          <input type="number"
          min="0"
          class="form-control"
          id="originalAmount"
          placeholder="How many do you have?"
          :disabled="type=='External Warehouse'"
          :hidden="type==''"
          v-model="amount">
        </div> -->
      </fieldset>
      <fieldset class="mb-3" :disabled="disabled">
        <legend class="form-label">Marketplace</legend>
        <div class="form-check">
          <input type="checkbox"
          class="form-check-input"
          id="checkboxAllMarketplace"
          v-model="isAllMarketplace"
          @change="checkAllMarketplaces">
          <label class="form-check-label" for="checkboxAllMarketplace">All</label>
        </div>
        <div class="input-group">
          <div class="form-check form-check-inline">
            <input type="checkbox"
            class="form-check-input"
            id="checkboxShopee"
            value="Shopee"
            v-model="marketplaces"
            @change="checkAllMarketplaces">
            <label class="form-check-label" for="checkboxShopee">Shopee</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="checkbox"
            class="form-check-input"
            id="checkboxLazada"
            value="Lazada"
            v-model="marketplaces"
            @change="checkAllMarketplaces">
            <label class="form-check-label" for="checkboxLazada">Lazada</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="checkboxJD" value="" disabled>
            <label class="form-check-label" for="checkboxJD">JD Central</label>
          </div>
        </div>
        <hr>
        <div v-if="id === 'add'" class="mb-3 text-end">
          <button v-if="isSaving" type="submit" class="btn btn-primary">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Saving...
          </button>
          <button v-else type="submit" class="btn btn-primary">Add SKU</button>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    id: String
  },
  mounted() {
    if (this.id === 'add') {
      this.draft().then(o => {
        this.productId = o.product.id
        this.name = o.name
        this.desc = o.desc
        this.price = o.price
        this.image = o.image
        this.marketplaces = o.marketplaces
        this.isAllMarketplace = this.marketplaces.size === 2
        this._offcanvas = new Offcanvas(this.$refs.SKUItem)
        this._offcanvas.show()
        this.$refs.SKUItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    } else {
      this.get(this.id).then(o => {
        this.productId = o.product.id
        this.name = o.name
        this.desc = o.desc
        this.price = o.price
        this.image = o.image
        this.marketplaces = o.marketplaces
        this.isAllMarketplace = this.marketplaces.size === 2
        this._offcanvas = new Offcanvas(this.$refs.SKUItem)
        this._offcanvas.show()
        this.$refs.SKUItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    }
  },
  computed: {
    ...mapGetters('Products', {
      productList: 'all'
    })
  },
  data() {
    return {
      _offcanvas: null,
      disabled: false,
      isSaving: false,
      isDeleting: false,
      productId: '',
      product: new Object(),
      name: '',
      desc: '',
      price: 0,
      image: '',
      marketplaces: new Set(),
      isAllMarketplace: false
    }
  },
  methods: {
    close() {
      this.$router.replace({ name: 'sku' })
    },
    checkAllMarketplaces (e) {
      console.debug(e.target.id)
      if (e.target.id === 'checkboxAllMarketplace') {
        if (this.isAllMarketplace) {
          this.marketplaces.add('shopee')
          this.marketplaces.add('lazada')
        } else {
          this.marketplaces.delete('shopee')
          this.marketplaces.delete('lazada')
        }
      } else {
        if (this.marketplaces.size === 2) this.isAllMarketplace = true
        else this.isAllMarketplace = false
      }
    },
    submit () {
      this.disabled = true
      this.isSaving = true
      const {id, productId, name, desc, price, image, marketplaces} = this
      // Object.values(this).forEach((value) => {
      //   if(!value){
      //     alert(`Please input ${value} field`);
      //   }
      // })
      this.save({id, productId, name, desc, price, image, marketplaces}).then(() => {
      this.disabled = false
      this.isSaving = false
      this._offcanvas.hide()
      }).catch(console.error)
    },
    remove () {
      this.disabled = true
      this.isDeleting = true
      const {id} = this
      this.delete(id).then(() => {
        this.disabled = false
        this.isDeleting = false
        this._offcanvas.hide()
      }).catch(console.error)
    },
    // resetAmount() {
    //   this.amount = 0;
    // },
    ...mapActions('SKU', {
      draft: 'draft',
      get: 'get',
      save: 'save',
      delete: 'delete'
    }),
    ...mapActions('Products', {
      GetProductsbyID: 'get',
    }),
  }
}
</script>
