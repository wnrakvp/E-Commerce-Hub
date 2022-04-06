<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" ref="InventoryItem" aria-labelledby="InventoryItemLabel">
  <div class="offcanvas-header">
  <h5 class="offcanvas-title"></h5>
  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body"></div>
  </div>
</template>
<script>
import {Offcanvas} from 'bootstrap'
export default {
  props: {
    id:String,
  },
  data() {
    return {
      _offcanvas: null,
    }
  },
  mounted() {
    if (this.id) {
        this._offcanvas = new Offcanvas(this.$refs.InventoryItem)
        this._offcanvas.show()
        this.$refs.InventoryItem.addEventListener('hidden.bs.offcanvas', this.close)
    }
  },
  methods: {
  close () {
      this.$router.replace({ name: 'inventory' })
    },
  }
}
</script>
