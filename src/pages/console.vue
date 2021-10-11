<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
    </div>
  </nav>
  <nav class="navbar sticky-top navbar-white bg-white bg-opacity-50">
    <div class="container-xxl">
      <a class="navbar-brand" href="#">Sticky top</a>
      <div class="d-flex">
        <button class="btn d-lg-none" @click="toggleMenu">
          <i v-if="isMenuHidden" class="bi-arrows-expand"></i>
          <i v-else class="bi-arrows-collapse"></i>
        </button>
      </div>
    </div>
  </nav>
  <div class="container-xxl bg-light">
    <div class="row">
      <div class="col-lg-3">
        <div class="pt-3 d-lg-block" :class="{ 'd-none': isMenuHidden }">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item"><router-link :to="{name: 'products'}" class="nav-link"><i class="bi-cart"></i> Products</router-link></li>
            <li class="nav-item"><router-link :to="{name: 'orders'}" class="nav-link"><i class="bi-file-earmark"></i> Orders</router-link></li>
          </ul>
        </div>
      </div>
      <div class="col-lg-9"><router-view></router-view></div>
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
      console.debug(this.isMenuHidden)
    }
  }
}
</script>