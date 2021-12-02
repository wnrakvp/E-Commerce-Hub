<template>
<div class="offcanvas offcanvas-end" tabindex="-1" ref="StockItem" aria-labelledby="StockItemLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="ProductItemLabel">{{id==='add'?'Add':''}} Stock Item</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form @submit.prevent="submit">
      <fieldset :disabled="disabled">
        <div class="mb-3">
          <label for="dateToAction" class="form-label">Date to Action</label>
          <input type="date" class="form-control" id="dateToAction" placeholder="Name" v-model="date">
        </div>
        <div class="mb-3">
          <label for="marketplace" class="form-label">Marketplace</label>
          <select class="form-select" id="marketplace" v-model="marketplace" @change="changeMarketplace">
            <option value="">Open this to select marketplace</option>
            <option value="shopee">Shopee</option>
            <option value="lazada">Lazada</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Line Items</label>
          <div class="responsive-table">
            <table class="table table-sm table-striped text-center">
              <col>
              <col width="100">
              <col width="100">
              <col width="65">
              <thead>
                <tr>
                  <th>#</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th v-if="id === 'add'"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in items" :key="idx">
                  <td>{{idx + 1}}</td>
                  <td>{{item.sku.name}}</td>
                  <td>{{item.price}}</td>
                  <td>{{item.amount}}</td>
                  <td v-if="id === 'add'"><button type="button" class="btn-close" aria-label="Close" @click="removeItem(idx)"></button></td>
                </tr>
              </tbody>
              <tfoot v-if="id === 'add'">
                <tr>
                  <td colspan="2">
                    <select class="form-select" id="marketplace" v-model="skuId">
                      <option value="">SKU</option>
                      <option v-for="(sku, idx) in skus" :key="idx" :value="sku.id">{{sku.name}}</option>
                    </select>
                  </td>
                  <td><input type="number" class="form-control form-control-sm" id="price" placeholder="Price" v-model="price"></td>
                  <td><input type="number" class="form-control form-control-sm" id="amount" placeholder="Amount" v-model="amount"></td>
                  <td><button type="button" class="btn btn-sm btn-outline-secondary" @click="addItem()"><i class="bi-plus-circle"></i></button></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <hr>
        <div v-if="id === 'add'" class="mb-3 text-end">
          <button type="submit" class="btn btn-primary">Publish</button>
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
      Promise.all([this.getAllSKU(),this.draft()]).then(([skuList, o]) => {
        console.debug(skuList, o)
        this.skuList = skuList
        this.date = this.formatDate(o.date)
        this.marketplace = o.marketplace
        this.items = o.items 
        this._offcanvas = new Offcanvas(this.$refs.StockItem)
        this.disabled = false
        this._offcanvas.show()
        this.$refs.StockItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    } else {
      this.get(Number(this.id)).then(o => {
        console.debug(o)
        this.date = this.formatDate(o.date)
        this.marketplace = o.marketplace
        this.items = o.items 
        this._offcanvas = new Offcanvas(this.$refs.StockItem)
        this.disabled = true
        this._offcanvas.show()
        this.$refs.StockItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    }
  },
  computed: {
    ...mapGetters('Stock', {
      stockList: 'all'
    }),
    skus () {
      return this.skuList.filter(x => x.marketplaces.has(this.marketplace))
    }
  },
  data() {
    return {
      _offcanvas: null,
      disabled: false,
      isSaving: false,
      isDeleting: false,
      date: new Date(),
      marketplace: '',
      skuList: [],
      items: [],
      skuId: '',
      price: 0,
      amount: 1
    }
  },
  methods: {
    close() {
      this.$router.replace({ name: 'stock' })
    },
    changeMarketplace () {
      this.skuId = ''
    },
    removeItem (idx) {
      this.items.splice(idx, 1)
    },
    addItem () {
      const sku = this.skuList.find(x => x.id === this.skuId)
      if(sku) {
        console.debug(sku)
        this.items.push({
          skuId: this.skuId,
          sku,
          price: this.price,
          amount: this.amount
        })
      }
    },
    submit() {
      this.disabled = true
      this.isSaving = true
      const {date, marketplace, items} = this
      this.save({date, marketplace, items}).then(() => {
        this.disabled = false
        this.isSaving = false
        this._offcanvas.hide()
      }).catch(console.error)
    },
    formatDate(date) {
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [year, month, day].join('-')
    },
    ...mapActions('Stock', {
      draft: 'draft',
      get: 'get',
      save: 'save'
    }),
    ...mapActions('SKU', {
      getAllSKU: 'getAll'
    })
  }
}
</script>
