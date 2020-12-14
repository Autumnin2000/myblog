<template>
  <add-article></add-article>
</template>

<script>
// import Slider from '../components/Slider.vue'
import AddArticle from '../views/AddArticle.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent( {
  setup(){
    let text = ref("")
    
    return {
      text
    }
  },
  components: {
    AddArticle
  }
})
</script>

<style>

</style>