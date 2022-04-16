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
            <select class="form-select" id="marketplace" v-model="type">
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
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td v-if="id === 'add'">
                      <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                      ></button>
                    </td>
                  </tr>
                </tbody>
                <tfoot v-if="id === 'add'">
                  <tr>
                    <td colspan="2">
                      <select
                        class="form-select"
                        id="marketplace"
                      >
                        <option value="">Product</option>
                        <option></option>
                      </select>
                    </td>
                    <td>
                      <select
                        class="form-select"
                        id="marketplace"
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
            <button v-else type="submit" class="btn btn-primary" @click="add">
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
      date: null,
      productId: null,
      product: "",
      skuId: null,
      sku: "",
      type: "",
      amount: 0,
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
      return this.skuList.filter(x => x.productId.has(this.productId))
    }
  },
  mounted() {
    Promise.all([this.GetAllSKU(), this.GetAllProducts()])
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
    add() {
      this.disabled = true;
      this.isDeleting = true;
      alert("Add Inventory");
      this.disabled = false;
      this.isDeleting = false;
      this._offcanvas.hide();
    },
    addItem() {
      alert("Add Item");
    }
  },
};
</script>
