<template>
  <el-container style="height:1000px;">
    <el-header style="height:200px">
      <Header/>
    </el-header>
  <el-container class="content">
    <Aside/>
    <el-main style="margin-left:25px">
      <router-link to="/"></router-link>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../src/components/Header.vue'
import Aside from '../src/components/Slider.vue'
export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld
    Header,
    Aside
  }
})
</script>

<style>

.content{
  margin: 0 auto;
  width:1000px;
}
</style>
