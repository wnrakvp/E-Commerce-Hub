<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    ref="InventoryItem"
    aria-labelledby="InventoryItemLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="InventoryItemLabel">
        {{ id === "add" ? "Add" : "Edit" }} Inventory Item
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
          <div class="mb-3" v-show="id === 'add'">
            <label for="dateToAction" class="form-label">Date</label>
            <input
              type="date"
              class="form-control"
              id="dateToAction"
              placeholder="Name"
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
              :value="sku"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="selectWarehouse" class="form-label">Warehouse </label>
            <select class="form-select" id="marketplace" v-model="type" @change="changeWarehouse">
              <option selected disabled value="">Select Warehouse</option>
              <option>Internal</option>
              <option>External Warehouse</option>
            </select>
          </div>
          <div class="mb-3" :hidden="id === 'add'">
            <label for="editAmount" class="form-label">Amount</label>
            <input
              type="number"
              class="form-control"
              id="amount"
              v-model="amount"
              :disabled="type === 'External Warehouse'"
            />
          </div>
          <div class="mb-3">
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
                    <td>{{idx + 1}}</td>
                    <td>{{item.sku.product.name}}</td>
                    <td>{{item.sku.name}}</td>
                    <td>{{item.amount}}</td>
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
                        @change="changeProduct"
                      >
                        <option value="">Product</option>
                        <option v-for="(product, idx) in productList" :key="idx" :value="product.id">{{product.name}}</option>
                      </select>
                    </td>
                    <td>
                      <select
                        class="form-select"
                        id="sku"
                        v-model="skuId"
                        :disabled="productId==''"
                      >
                      <option value="">SKU</option>
                      <option v-for="(sku, idx) in skus" :key="idx" :value="sku.id">{{sku.name}}</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        class="form-control"
                        id="amount"
                        placeholder="#"
                        v-model="amount"
                        :disabled="type === 'External Warehouse' || skuId === '' || productId === ''"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        @click="addItem()"
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
            <button v-else type="submit" class="btn btn-primary" @click="addInventory">
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
import { Offcanvas } from "bootstrap";
import { mapGetters, mapActions } from "vuex";
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
      date: new Date(),
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
    ...mapGetters("Products", {
      productList: "all",
    }),
    ...mapGetters("SKU", {
      skuList: "all",
    }),
    skus () {
      return this.skuList.filter(x => {
        const skus = [];
        if(x.productId === this.productId) {
          return skus.push(x);
        }
      })
    }
  },
  async mounted() {
    await Promise.all([this.GetAllSKU(), this.GetAllProducts()])
      .then((result) => {
        console.debug(result);
      })
      .catch(console.error);
    if (this.id === "add") {
      console.log(this.productList);
      console.log(this.skuList);
      this._offcanvas = new Offcanvas(this.$refs.InventoryItem);
      this._offcanvas.show();
      this.$refs.InventoryItem.addEventListener(
        "hidden.bs.offcanvas",
        this.close
      );
    } else {
      this.get(Number(this.id)).then((o) => {
        this.product = o.sku.product.name;
        this.skuId = o.sku.id;
        this.sku = o.sku.name;
        this.type = o.type;
        this.amount = o.amount;
      });
      this._offcanvas = new Offcanvas(this.$refs.InventoryItem);
      this._offcanvas.show();
      this.$refs.InventoryItem.addEventListener(
        "hidden.bs.offcanvas",
        this.close
      );
      // }).catch(console.error)
    }
  },
  methods: {
    ...mapActions("Inventory", {
      get: "get",
      save: "save",
      delete: "delete",
      add: "add",
    }),
    ...mapActions("SKU", {
      GetAllSKU: "getAll",
      GetSKU: "get",
    }),
    ...mapActions("Products", {
      GetAllProducts: "getAll",
    }),
    close() {
      this.$router.replace({ name: "inventory" });
    },
    async submit() {
      this.disabled = true;
      this.isSaving = true;
      console.time("Get SKU by ID");
      const sku = await this.GetSKU(this.skuId);
      console.timeEnd("Get SKU by ID");
      const { id, skuId, type, amount } = this;
      this.save({ id: Number(id), skuId, sku, type, amount })
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
      this.delete(Number(id))
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
      console.time('Add Item')
      this.items.forEach(item => this.add(item))
      console.timeEnd('Add Item')
      this.disabled = false;
      this.isDeleting = false;
      this._offcanvas.hide();
    },
    addItem() {
      const sku = this.skuList.find(x => x.id === this.skuId)
      const check = this.items.filter(x => x.sku.id === sku.id)
      // console.log(check)
      if(check.length == 0) {
        this.items.push({
          id: Number(this.id),
          skuId: this.skuId,
          sku,
          type: this.type,
          amount: this.amount
        })
      } else {
        this.items.find(x => x.sku.id === sku.id).amount += this.amount
      }
    },
    removeItem(idx) {
      this.items.splice(idx, 1)
    },
    changeProduct () {
      this.skuId ='';
    },
    changeWarehouse () {
      this.items.splice(0, this.items.length)
    },
  },
};
</script>
