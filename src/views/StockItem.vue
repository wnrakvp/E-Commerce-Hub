<template>
<div class="offcanvas offcanvas-end" tabindex="-1" ref="StockItem" aria-labelledby="StockItemLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="ProductItemLabel">{{id==='add'?'Add':''}} Stock Item</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form>
      <fieldset :disabled="disabled">
        <div class="mb-3">
          <label for="dateToAction" class="form-label">Date to Action</label>
          <input type="date" class="form-control" id="dateToAction" placeholder="Name" v-model="date">
        </div>
        <div class="mb-3">
          <label for="marketplace" class="form-label">Marketplace</label>
          <select class="form-select" id="marketplace" v-model="marketplace">
            <option value="">Open this to select marketplace</option>
            <option value="shopee">Shopee</option>
            <option value="lazada">Lazada</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Line Items</label>
          <div class="responsive-table">
            <table class="table table-sm table-striped text-center">
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
                  <td v-if="id === 'add'"><button type="button" class="btn-close" aria-label="Close"></button></td>
                </tr>
              </tbody>
              <tfoot v-if="id === 'add'">
                <tr>
                  <td colspan="2">
                    <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="SKU">
                    <datalist id="datalistOptions">
                      <option value="San Francisco"></option>
                      <option value="New York"></option>
                      <option value="Seattle"></option>
                      <option value="Los Angeles"></option>
                      <option value="Chicago"></option>
                    </datalist>
                  </td>
                  <td><input type="number" class="form-control form-control-sm" id="price" placeholder="Price"></td>
                  <td><input type="number" class="form-control form-control-sm" id="amount" placeholder="Amount"></td>
                  <td><button class="btn btn-sm btn-outline-secondary"><i class="bi-plus-circle"></i></button></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <hr>
        <div v-if="id === 'add'" class="mb-3 text-end">
          <button type="submit" class="btn btn-primary">Add Product</button>
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
    })
  },
  data() {
    return {
      _offcanvas: null,
      disabled: false,
      isSaving: false,
      isDeleting: false,
      date: new Date(),
      marketplace: '',
      items: []
    }
  },
  methods: {
    close() {
      this.$router.replace({ name: 'stock' })
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
      save: 'save',
      delete: 'delete'
    })
  }
}
</script>
