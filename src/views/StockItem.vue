<template>
<div class="offcanvas offcanvas-end" tabindex="-1" ref="ProductItem" aria-labelledby="ProductItemLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="ProductItemLabel">Stock Item</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form>
      <div class="mb-3">
        <label for="dateToAction" class="form-label">Date to Action</label>
        <input type="date" class="form-control" id="dateToAction" placeholder="Name">
      </div>
      <div class="mb-3">
        <label for="marketplace" class="form-label">Marketplace</label>
        <select class="form-select" id="marketplace">
          <option selected>Open this to select marketplace</option>
          <option value="1">Shopee</option>
          <option value="2">Lazada</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Line Item</label>
        <div class="responsive-table">
          <table class="table table-sm table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>test</td>
                <td>123</td>
                <td>30</td>
                <td><button type="button" class="btn-close" aria-label="Close"></button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>test</td>
                <td>123</td>
                <td>30</td>
                <td><button type="button" class="btn-close" aria-label="Close"></button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>test</td>
                <td>123</td>
                <td>30</td>
                <td><button type="button" class="btn-close" aria-label="Close"></button></td>
              </tr>
            </tbody>
            <tfoot>
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
      <div class="mb-3 text-end">
        <button type="submit" class="btn btn-primary">Add Product</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import {Offcanvas} from 'bootstrap'
export default {
  data() {
    return {
    }
  },
  mounted() {
    new Offcanvas(this.$refs.ProductItem).show()
    this.$refs.ProductItem.addEventListener('hidden.bs.offcanvas', this.close)
  },
  methods: {
    close() {
      this.$router.replace({ name: 'stock' })
    }
  }
}
</script>
