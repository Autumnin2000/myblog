<template>
  <div class="search-header">
    <el-card  class="box-card">
     <div class="header-part">
        <h3 class="key-words">{{keywords}}</h3>
        <p class="header-text">的搜索结果</p>
     </div>
     <div class="footer-part">
       <img src="../assets/text.png" class="text-img"/>
       <p style="margin-top:0px">{{resultLength}} 个结果</p>
     </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import getSearchList from '../api/getSearchList'
export default defineComponent({
  setup () {
    const route = useRoute()
    const keywords = route.params.keywords
    const resultLength = ref(0)
    console.log(keywords)
    onMounted(() => {
      getSearchList(keywords)
        .then(res => {
          resultLength.value = res.data.data.length
          // console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    })
    return {
      keywords, resultLength
    }
  }
})
</script>

<style>
.search-header .el-card {
  height: 150px;
  width:1150px;
}
.search-header {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}
.header-part {
  display: flex;
  flex-direction: row;
  align-content: center;
}
.title {
  font-size: 26px;
  letter-spacing: .5px;
}
.title:hover {
  color:pink;
  transition: color 1s ease;
}
.key-words {
  font-size:1.75rem;
  font-weight:400;
  line-height:1.5;
  margin-top: 10px;
}
.footer-part {
  display: flex;
  flex-direction: row;
  align-content: center;
}
.text-img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.header-text {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.7;
  margin-left: 10px;
}
</style>
