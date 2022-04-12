<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    ref="InventoryItem"
    aria-labelledby="InventoryItemLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">
        {{ productName }} <br />
        ({{ skuName }})
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
        <div class="mb-3">
          <label for="orderNoToAction" class="form-label">Inventory No.</label>
          <input
            type="text"
            class="form-control"
            id="InventoryNo"
            placeholder="Inventory Number"
            v-model="inventoryid"
          />
          <br />
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
    productName: String,
    skuName: String,
  },
  data() {
    return {
      _offcanvas: null,
      // inventoryid: '',
    };
  },
  mounted() {
    if (this.id) {
      // this.get(Number(this.id)).then(o => {
      // this.inventoryid = o.sku.id;
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
