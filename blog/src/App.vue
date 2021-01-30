<template>
  <el-container :style="Img">
    <el-header>
      <Header class="nav-header"><Search></Search></Header>
    </el-header>
  <router-view name="Header" class="view-one" />
  <el-container class="content">
    <Aside/>
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </el-container>
</el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../src/components/Header.vue'
import Aside from '../src/components/Slider.vue'
import Search from '../src/components/Search.vue'
// import SearchHeader from './components/SearchHeader.vue'
export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld
    Header,
    Aside,
    Search
    // SearchHeader
  },
  setup () {
    const Img = {
      backgroundImage: 'url(' + require('./assets/background.jpg') + ')',
      backgroundRepeat: 'repeat'
    }
    return {
      Img
    }
  }
})
</script>

<style>

body{
  margin: 0;
  padding: 0;
  height: 20%;
}
header{
  padding:0;
}
.el-header{
  padding: 0 0 0 0;
}
.nav-header{
  padding: 0 0 0 0 ;
  z-index: 1000;
  height: 100px;
  position: fixed;
  width: 100%;
}
.content{
  display: flex;
  justify-content: space-around;
  margin-top: 150px;
}
.fade-enter-active, .fade-leave-active {
  opacity: 0;
  transition: opacity 1s ease;
  }
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity 1s ease 0s;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
/** @keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
} */
</style>
