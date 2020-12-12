<template>
  <article class="post postfull card">
    {{id}}
  </article>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
// import { getDetails } from '../api/getDetails'
export default defineComponent({
  setup () {
    const route = useRoute()
    const id = route.params.id
    return {
      route, id
    }
  }
})
</script>

<style>
.post {
    margin-bottom: 25px;
    padding: 30px 30px;
    padding-bottom: 35px;
}
.card {
    animation: card-show 0.25s ease-out;
    transform-origin: center top;
}

.card {
    border-radius: var(--card-radius);
}
</style>
