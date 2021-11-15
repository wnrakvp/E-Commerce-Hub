<template>
  <nav class="navbar sticky-top navbar-white bg-white shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand d-none d-lg-block col-lg-3" href="#">E-Commerce Hub</a>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary" type="submit">Search</button>
      </form>
      <div class="d-flex d-lg-none">
        <button class="btn" @click="toggleMenu">
          <i v-if="isMenuHidden" class="bi-chevron-bar-expand"></i>
          <i v-else class="bi-chevron-bar-contract"></i>
        </button>
      </div>
    </div>
  </nav>
  <div class="container-md">
    <div class="row g-0">
      <div class="col-lg-2 col-xxl-2">
        <div class="pt-3 px-4 d-lg-block" :class="{ 'd-none': isMenuHidden }">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <router-link :to="{name: 'products'}" class="nav-link text-nowrap"><i class="bi-grid"></i> Products</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'sku'}" class="nav-link text-nowrap"><i class="bi-file-earmark"></i> SKU</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'orders'}" class="nav-link text-nowrap"><i class="bi-table"></i> Order</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'stock'}" class="nav-link text-nowrap"><i class="bi-inboxes"></i> Stock</router-link>
            </li>
            <li class="border-top my-3"></li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false"><img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                <strong>mdo</strong></a>
              <ul class="dropdown-menu w-100">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-6 col-xl-6"><router-view></router-view></div>
    </div>
  </div>
</template>
<script >
export default {
  data () {
    return {
      isMenuHidden: true
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuHidden = !this.isMenuHidden
      if (!this.isMenuHidden) {
        window.scrollTo(0, 0)
      }
      console.debug(this.isMenuHidden)
    }
  }
}
</script>