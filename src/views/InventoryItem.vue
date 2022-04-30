<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    ref="InventoryItem"
    aria-labelledby="InventoryItemLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="InventoryItemLabel">
        {{ id === 'add' ? 'Add' : 'Edit' }} Inventory Item
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <form @submit.prevent="submit">
        <fieldset :disabled="disabled">
          <p class="text-end" v-if="id !== 'add'">
            Last Updated :
            <span class="badge bg-primary text-wrap" style="width: 6rem">{{
              date.slice(0, 10)
            }}</span>
          </p>
          <div class="mb-3" v-show="id === 'add'">
            <label for="dateToAction" class="form-label">Date</label>
            <input
              type="date"
              class="form-control"
              id="dateToAction"
              placeholder="Name"
              disabled
              v-model="date"
            />
          </div>
          <div class="mb-3" :hidden="id === 'add'">
            <label for="showProduct" class="form-label">Product</label>
            <input
              type="text"
              class="form-control"
              id="product"
              :value="product"
              disabled
            />
          </div>
          <div class="mb-3" :hidden="id === 'add'">
            <label for="showSKU" class="form-label">SKU</label>
            <input
              type="text"
              class="form-control"
              id="sku"
              :value="sku.name"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="selectWarehouse" class="form-label">Warehouse </label>
            <select
              class="form-select"
              id="marketplace"
              v-model="type"
              required
              @change="changeWarehouse"
            >
              <option selected disabled value="">Select Warehouse</option>
              <option>Internal</option>
              <option>External</option>
            </select>
          </div>
          <div class="mb-3" :hidden="id === 'add'">
            <label for="editAmount" class="form-label">Amount</label>
            <input
              type="number"
              class="form-control"
              id="amount"
              v-model="amount"
              required
              :disabled="type === 'External'"
            />
          </div>
          <div class="mb-3" v-if="id === 'add'">
            <label class="form-label">Line Items</label>
            <div class="responsive-table">
              <table class="table table-sm table-striped text-center">
                <col />
                <col width="100" />
                <col width="100" />
                <col width="65" />
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
                  <tr v-for="(item, idx) in items" :key="idx">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ item.sku.product.name }}</td>
                    <td>{{ item.sku.name }}</td>
                    <td>{{ item.amount }}</td>
                    <td v-if="id === 'add'">
                      <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        @click="removeItem"
                      ></button>
                    </td>
                  </tr>
                </tbody>
                <tfoot v-if="id === 'add'">
                  <tr>
                    <td colspan="2">
                      <select
                        class="form-select"
                        id="product"
                        v-model="productId"
                        required
                        @change="changeProduct"
                      >
                        <option value="">Product</option>
                        <option
                          v-for="(product, idx) in productList"
                          :key="idx"
                          :value="product.id"
                        >
                          {{ product.name }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <select
                        class="form-select"
                        id="sku"
                        v-model="skuId"
                        required
                        :disabled="productId == ''"
                      >
                        <option value="">SKU</option>
                        <option
                          v-for="(sku, idx) in skus"
                          :key="idx"
                          :value="sku.id"
                        >
                          {{ sku.name }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        class="form-control"
                        id="amount"
                        placeholder="#"
                        min="0"
                        required
                        v-model="amount"
                        :disabled="
                          type === 'External' ||
                          skuId === '' ||
                          productId === ''
                        "
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        @click="addItem()"
                        :disabled="skuId == ''"
                      >
                        <i class="bi-plus-circle"></i>
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div v-if="id === 'add'" class="mb-3 text-end">
            <button v-if="isSaving" type="submit" class="btn btn-primary">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click="addInventory"
            >
              Add Inventory
            </button>
          </div>
          <div v-else class="mb-3 d-flex justify-content-between">
            <button
              v-if="isDeleting"
              type="button"
              class="btn btn btn-outline-danger"
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Deleting...
            </button>
            <button
              v-else
              type="button"
              class="btn btn btn-outline-danger"
              @click="remove"
            >
              <i class="bi-trash"></i> Delete
            </button>
            <button v-if="isSaving" type="submit" class="btn btn-primary">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </button>
            <button v-else type="submit" class="btn btn-primary">
              Save Changes
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
<script>
import { Offcanvas } from 'bootstrap';
import { mapGetters, mapActions } from 'vuex';
export default {
  props: {
    id: String,
  },
  data() {
    return {
      _offcanvas: null,
      disabled: false,
      isSaving: false,
      isDeleting: false,
      date: new Date().toISOString().slice(0, 10),
      productId: '',
      product: '',
      skuId: '',
      sku: '',
      type: '',
      amount: 0,
      items: [],
    };
  },
  computed: {
    ...mapGetters('Products', {
      productList: 'all',
    }),
    ...mapGetters('SKU', {
      skuList: 'all',
    }),
    ...mapGetters('Inventory', {
      inventoryList: 'all',
    }),
    skus() {
      return this.skuList.filter((sku) => {
        const skus = [];
        if (sku.product.id === this.productId) {
          return skus.push(sku);
        }
      });
    },
  },
  async mounted() {
    await Promise.all([
      this.GetAllSKU(),
      this.GetAllProducts(),
      this.GetAllInventory(),
    ])
      .then((result) => {
        console.debug(result);
      })
      .catch(console.error);
    if (this.id === 'add') {
      this._offcanvas = new Offcanvas(this.$refs.InventoryItem);
      this._offcanvas.show();
      this.$refs.InventoryItem.addEventListener(
        'hidden.bs.offcanvas',
        this.close
      );
    } else {
      this.get(this.id).then((o) => {
        this.date = o.date;
        this.product = o.sku.product.name;
        this.sku = o.sku;
        this.type = o.type;
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
      GetAllInventory: 'getAll',
      get: 'get',
      save: 'save',
      delete: 'delete',
      add: 'add',
    }),
    ...mapActions('SKU', {
      GetAllSKU: 'getAll',
      GetSKU: 'get',
    }),
    ...mapActions('Products', {
      GetAllProducts: 'getAll',
    }),
    close() {
      this.$router.replace({ name: 'inventory' });
    },
    submit() {
      this.disabled = true;
      this.isSaving = true;
      const { id, date, type, amount } = this;
      this.save({ id, date, type, amount })
        .then(() => {
          this.disabled = false;
          this.isSaving = false;
          this._offcanvas.hide();
        })
        .catch(console.error);
    },
    remove() {
      this.disabled = true;
      this.isDeleting = true;
      const { id } = this;
      this.delete(id)
        .then(() => {
          this.disabled = false;
          this.isDeleting = false;
          this._offcanvas.hide();
        })
        .catch(console.error);
    },
    addInventory() {
      this.disabled = true;
      this.isDeleting = true;
      console.time('Adding Inventories');
      this.items.forEach((item) => this.add(item));
      console.timeEnd('Adding Inventories');
      this.disabled = false;
      this.isDeleting = false;
      this._offcanvas.hide();
    },
    addItem() {
      const sku = this.skuList.find((x) => x.id === this.skuId);
      const inventory = this.inventoryList.find(
        (x) => x.sku.id === sku.id && x.type === this.type
      );
      const check = this.items.filter((x) => x.sku.id === sku.id);
      if (check.length == 0) {
        this.items.push({
          id: inventory ? inventory.id : null,
          date: this.date,
          sku: sku,
          type: this.type,
          oldAmount: inventory ? inventory.amount : 0,
          amount: this.amount,
        });
      } else {
        this.items.find((x) => x.sku.id === sku.id).amount += this.amount;
      }
    },
    removeItem(idx) {
      this.items.splice(idx, 1);
    },
    changeProduct() {
      this.skuId = '';
    },
    changeWarehouse() {
      this.amount = 0;
      this.items.splice(0, this.items.length);
    },
  },
};
</script>
