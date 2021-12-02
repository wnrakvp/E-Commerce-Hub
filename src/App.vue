<template>
  <div v-if="isAlertShow" class="alert alert-primary alert-dismissible m-0 border-0" style="border-radius: 0;" role="alert">
    <h4 class="alert-heading">Well done!</h4>
    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr>
    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    <button type="button" @click="hideAlert" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <router-view></router-view>
</template>
<script>
export default {
  data () {
    return {
      isAlertShow: false
    }
  },
  methods: {
    hideAlert () {
      this.isAlertShow = false
    }
  }
}
</script>
<style>
.clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.clamp-2 {
  -webkit-line-clamp: 3;
}
.clamp-3 {
  -webkit-line-clamp: 3;
}
</style>