<template>
<div class="card mb-3">
  <div class="row g-0">
    <div class="col-4" style="max-width: 8rem;">
      <img :src="imageURL" :alt="title" class="img-fluid rounded-start">
    </div>
    <div class="col-8">
      <div class="card-body">
        <h6 class="card-title">{{title}}</h6>
        <p class="card-text" style="display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;"><small>{{details}}</small></p>
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