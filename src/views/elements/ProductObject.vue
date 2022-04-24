<template>
<div class="card shadow h-100">
  <div class="row">
      <h6 class="card-title clamp mt-3" align="center">{{title}}</h6>
      <img :src="imageURL" :alt="title" class="img-fluid rounded-start mx-auto" style="max-width: 15rem">
    </div>
    <div class="row">
      <div class="card-body">
        <p class="card-text clamp clamp-3" align="center"><small>{{details}}</small></p>
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