<template>
  <nav class="navbar sticky-top navbar-white bg-white shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand col-lg-9" href="#">E-Commerce <span class="badge bg-primary">hub</span></a>
      
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <img src="../assets/shop.jpeg" alt="" width="32" height="32" class="rounded-circle me-2 bg-warning">
          &nbsp;&nbsp;&nbsp;
          <i class="bi-bell-fill position-relative" style="font-size:20px">
          <span class="position-absolute start-100 translate-middle badge rounded-pill bg-danger">
            {{getCountTotal()}}
            <span class="visually-hidden">unread messages</span>
          </span>
          </i>
         </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Logout</a></li>
        </ul>
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
      <div class="col-lg-3 col-xxl-2">
        <div class="pt-3 px-4 d-lg-block" :class="{ 'd-none': isMenuHidden }">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <router-link :to="{name: 'products'}" class="nav-link text-nowrap"><i class="bi-basket"></i> Products</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'sku'}" class="nav-link text-nowrap"><i class="bi-inboxes"></i> SKU</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'inventory'}" class="nav-link text-nowrap"><i class="bi-inboxes"></i> Inventory</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'stock'}" class="nav-link text-nowrap"><i class="bi-table"></i> Stock</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'order'}" class="nav-link text-nowrap"><i class="bi-cart4"></i> Orders</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'track'}" class="nav-link text-nowrap"><i class="bi bi-box-seam"></i> Track Shipment</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-9 col-xl-10"><router-view></router-view></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
  },
  mounted () {
    this.getAll().then(o => {
      console.debug(o)
    }).catch(console.error)
  },
  computed: {
    ...mapGetters('Order', {
      orderList: 'all'
    })
  },
  data () {
    return {
      isMenuHidden: true
    }
  },
  methods: {
    ...mapActions('Order', {
      getAll: 'getAll'
    }),
    toggleMenu () {
      this.isMenuHidden = !this.isMenuHidden
      if (!this.isMenuHidden) {
        window.scrollTo(0, 0)
      }
      console.debug(this.isMenuHidden)
    },
    getCountTotal(){
       var count=this.orderList.length
       return count
     }
  }
}
</script>