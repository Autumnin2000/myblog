<template>
 <div class="search-list">
  <el-card class="box-card" v-for="item in seachList.data" :key="item.id">
     <el-header class="ac-header">
        <a class="title" @click="goDetails(item.id)" href="#">
          {{item.title}}
        </a>
        <div class="header-meta">
          <div class="time item">
            <img src="../assets/time.png" alt="">
            <div>2021-1-19</div>
          </div>
          <div class="header-meta-divide">|</div>
          <div class="category item">
            <img src="../assets/category.png" alt="">
            <div>算法</div>
          </div>
          <div class="header-meta-divide">|</div>
          <div class="words item">
            <img src="../assets/words.png" alt="">
            <div>2123字</div>
          </div>
          <div class="header-meta-divide">|</div>
          <div class="read-time item">
            <img src="../assets/readtime.png" alt="">
            <div>8分钟</div>
          </div>
        </div>
      </el-header>
      <div class="post-content">{{item.content}}</div>
</el-card>
 </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import getSearchList from '../api/getSearchList'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const route = useRoute()
    const keywords = route.params.keywords
    const seachList = reactive({
      data: []
    })
    const Router = useRouter()
    const goDetails = (id) => {
      Router.push({ name: 'Details', params: { id: id } })
    }
    onMounted(() => {
      getSearchList(keywords)
        .then(res => {
          console.log(res)
          seachList.data = res.data.data
        })
        .catch(e => {
          console.log(e)
        })
    })
    return {
      seachList,
      goDetails
    }
  }
})
</script>

<style>
.header-meta img{
  width:20px;
  height: 20px;
  margin-right: 5px;
}
.ac-header{
  height: 100px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.post-content {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.8;
  display: block;
}
.header-meta{
  display:flex;
  justify-content: space-around;
  font-size:14.5px;
  opacity: .8;
  line-height: 24px;
  margin-top: 10px;
}
.search-list .box-card {
  width:870px;
  height: 320px;
}
.item{
  display: flex;
  justify-content: center;
  vertical-align: middle;
}
</style>
