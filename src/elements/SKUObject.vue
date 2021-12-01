<template>
<div class="card mb-3">
  <div class="row g-0">
    <div class="col-4" style="max-width: 8rem;">
      <img :src="imageURL" :alt="title" class="img-fluid rounded-start">
    </div>
    <div class="col-8">
      <div class="card-body">
        <h6 class="card-title">{{title}}</h6>
        <p class="card-text" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;"><small>{{details}}</small></p>
        <p class="card-text m-0"><small class="text-muted">Price: {{price? price : '12345'}}</small></p>
        <p class="card-text">
          <small class="text-muted"> Marketplace:
            <img v-if="isShopee" src="../assets/shopee.svg" alt="shopee" class="img-fluid rounded-start" width="24" height="24">
            <img v-if="isLazada" src="../assets/lazada.svg" alt="lazada" class="img-fluid rounded-start" width="38" height="38">
          </small>
        </p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    title: String,
    details: String,
    imageURL: String,
    price: Number,
    isShopee: Boolean,
    isLazada: Boolean
  }
}
</script>