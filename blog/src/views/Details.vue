<template>
  <article class="post postfull card">
    {{details.data}}
  </article>

</template>

<script lang="ts">

import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import getDetails from '../api/getDetails'
export default defineComponent({
  setup () {
    const route = useRoute()
    const id = Number(route.params.id)
    const details = reactive({
      data: []
    })
    onMounted(() => {
      getDetails(id)
        .then((response) => {
          console.log(response)
          details.data = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    })
    return {
      route, id, details
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
