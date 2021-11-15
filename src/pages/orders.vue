<template>
  <div class="row">
      <div class="col-md-6">
        <div class="my-3 p-3 bg-body rounded shadow-sm">
          <div class="d-flex justify-content-between align-items-center border-bottom pb-1">
            <h6 class="h6 my-0">Orders</h6>
            <button class="btn btn-sm btn-outline-secondary"><i class="bi-plus-circle"></i></button>
          </div>
          <small class="d-block text-end mt-3">
            <a href="#">All updates</a>
          </small>
        </div>
      </div>
      <router-view></router-view>
  </div>
</template>