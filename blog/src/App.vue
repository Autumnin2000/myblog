<template>
  <el-container :style="Img">
    <el-header>
      <Header class="nav-header"><Search></Search></Header>
    </el-header>
  <SearchTable></SearchTable>
  <router-view name="Header" class="view-one" />
  <el-container class="content">
    <Aside @emitCss="recieveCss" class="aside"/>
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </el-container>
  <div :style='showBg ? "display:block;":"display:none;"' class="mask"></div>
</el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '../src/components/Header.vue'
import Aside from '../src/components/Slider.vue'
import Search from '../src/components/Search.vue'
import SearchTable from './components/SearchTable.vue'
// import SearchHeader from './components/SearchHeader.vue'
export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld
    Header,
    Aside,
    Search,
    SearchTable
    // SearchHeader
  },
  setup () {
    const Img = {
      backgroundImage: 'url(' + require('./assets/background.jpg') + ')',
      backgroundRepeat: 'repeat'
    }
    const showBg = ref(false)
    const recieveCss = (v: boolean) => {
      showBg.value = v
      console.log(showBg.value)
    }
    return {
      Img, recieveCss, showBg
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
.mask{
    position:fixed;
    top     : 0;
    left    : 0;
    bottom  : 0;
    right   : 0;
    background: rgba(0,0,0,0.4);;  /*一般遮罩随便设置一个颜色*/
}
header{
  padding:0;
}
.aside {
  height:342px;
}
.el-header{
  padding: 0 0 0 0;
  margin-bottom: 100px;
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
  margin-top: 0px;
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
