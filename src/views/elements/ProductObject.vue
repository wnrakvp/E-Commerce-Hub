<template>
<div class="card h-100">
  <div class="row g-0">
    <div class="col" style="max-width: 6rem;">
      <img :src="imageURL" :alt="title" class="img-fluid rounded-start">
    </div>
    <div class="col">
      <div class="card-body">
        <h6 class="card-title clamp">{{title}}</h6>
        <p class="card-text clamp clamp-3"><small>{{details}}</small></p>
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
    imageURL: String
  }
}
</script>