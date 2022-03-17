<template>
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <div
      class="d-flex justify-content-between align-items-center border-bottom pb-1"
    >
      <h6 class="h6 my-0">Inventory</h6>
      <button class="btn btn-sm btn-outline-secondary">
        <i class="bi-plus-circle"></i> Add
      </button>
    </div>
    <div class="table-responsive">
      <table class="table text-center align-middle">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">SKU</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product1</td>
            <td>SKU1</td>
            <td>Amount1</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
