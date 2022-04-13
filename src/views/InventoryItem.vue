<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    ref="InventoryItem"
    aria-labelledby="InventoryItemLabel"
  >
    <div class="offcanvas-header">
     <h5 class="offcanvas-title" id="InventoryItemLabel">{{id==='add'?'Add':'Edit'}} Inventory Item</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
    <form @submit.prevent="submit">
      <fieldset :disabled="disabled">
        <div class="mb-3" v-show="id==='add'">
          <label for="dateToAction" class="form-label">Date</label>
          <input type="date" class="form-control" id="dateToAction" placeholder="Name" v-model="date">
        </div>
          <!-- <div class="mb-3">
           <label for="selectSKU" class="form-label">SKU </label>
          <select class="form-select" id="marketplace" v-model="skuId">
            <option selected disabled value="">Select SKU</option>
            <option v-for="(sku, idx) in skus" :key="idx" :value="sku.id">{{sku.name}}</option>
          </select>
          </div> -->
          <div class="mb-3" :hidden="id==='add'">
           <label for="showProduct" class="form-label">Product</label>
          <input type="text" class="form-control" id="product" :value="product" disabled>
          </div>
          <div class="mb-3" :hidden="id==='add'">
           <label for="showSKU" class="form-label">SKU</label>
          <input type="text" class="form-control" id="sku" :value="sku" disabled>
          </div>
          <div class="mb-3">
           <label for="selectWarehouse" class="form-label">Warehouse </label>
          <select class="form-select" id="marketplace" v-model="warehouseType">
            <option selected disabled value="">Select Warehouse</option>
            <option>Internal</option>
            <option>External Warehouse</option>
          </select>
          </div>
          <div class="mb-3" :hidden="id==='add'">
           <label for="editAmount" class="form-label">Amount</label>
          <input type="number" class="form-control" id="amount" :value="amount" :disabled="warehouseType === 'External Warehouse'">
          </div>
          <!-- <div class="mb-3">
          <label for="originalAmount" class="form-label" :hidden="warehouseType==''">Amount</label>
          <input type="number"
          min="0"
          class="form-control"
          id="originalAmount"
          placeholder="How many do you have?"
          :disabled="warehouseType=='External Warehouse'"
          :hidden="warehouseType==''"
          v-model="amount">
        </div> -->
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
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Amount</th>
                  <th v-if="id === 'add'"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td v-if="id === 'add'"><button type="button" class="btn-close" aria-label="Close" @click="removeItem(idx)"></button></td>
                </tr>
              </tbody>
              <tfoot v-if="id === 'add'">
                <tr>
                  <td colspan="2">
                    <select class="form-select" id="marketplace" v-model="productId">
                      <option value="">Product</option>
                      <option></option>
                    </select>
                  </td>
                  <td>
                    <select class="form-select" id="marketplace" v-model="skuId">
                      <option value="">SKU</option>
                      <option></option>
                    </select>
                  </td>
                  <td><input type="number" class="form-control " id="amount" placeholder="#" v-model="amount"></td>
                  <td><button type="button" class="btn btn-sm btn-outline-secondary" @click="addItem()"><i class="bi-plus-circle"></i></button></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div v-if="id === 'add'" class="mb-3 text-end">
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </fieldset>
    </form>
    </div>
  </div>
</template>
<script>
import { Offcanvas } from 'bootstrap';
import { mapActions } from 'vuex';
export default {
  props: {
    id: String,
  },
  data() {
    return {
      _offcanvas: null,
      date: null,
      product: '',
      sku: '',
      warehouseType: '',
      amount: 0,
      productId: null,
      skuId: null,
    };
  },
  computed: {
    // skus () {
    //   return this.skuList.filter(x => x.marketplaces.has(this.productId))
    // }
  },
  mounted() {
    if (this.id === 'add') {
      this._offcanvas = new Offcanvas(this.$refs.InventoryItem);
      this._offcanvas.show();
      this.$refs.InventoryItem.addEventListener(
        'hidden.bs.offcanvas',
        this.close
      );
    }
    else {
      this.get(Number(this.id)).then(o => {
        this.product = o.sku.product.name;
        this.sku = o.sku.name;
        this.warehouseType = o.type;
        this.amount = o.amount;
      });
      this._offcanvas = new Offcanvas(this.$refs.InventoryItem);
      this._offcanvas.show();
      this.$refs.InventoryItem.addEventListener(
        'hidden.bs.offcanvas',
        this.close
      );
      // }).catch(console.error)
    }
  },
  methods: {
    ...mapActions('Inventory', {
      get: 'get',
    }),
    close() {
      this.$router.replace({ name: 'inventory' });
    },
  },
  // ...mapActions('SKU', {
  //     draft: 'draft',
  //     get: 'get',
  //     save: 'save',
  //     delete: 'delete'
  //   })
};
</script>
