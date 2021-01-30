<template>
 <div>
   <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
</el-card>
  <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
</el-card>
 </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  setup () {
    onMounted(() => {
      console.log('111')
    })
    return {
    }
  }
})
</script>

<style>

</style>
