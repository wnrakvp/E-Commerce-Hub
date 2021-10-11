<template>
<div class="d-flex text-muted pt-3">
  <p class="pb-3 mb-0 small lh-sm border-bottom">
    <strong class="d-block text-gray-dark">{{title}}</strong>{{details}}
  </p>
</div>
</template>
<script>
export default {
  props: {
    title: String,
    details: String
  }
}
</script>