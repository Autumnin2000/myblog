<template>
  <div>
    <article class="article-details">
      <el-container>
      <el-header class="ac-header">
        <a class="title" href="#">
          {{details.data[0].title}}
        </a>
        <div class="header-meta">
          <div class="time item">
            <img src="../assets/time.png" alt="">
            <div>{{details.data[0].date}}</div>
          </div>
          <div class="header-meta-divide">|</div>
          <div class="category item">
            <img src="../assets/category.png" alt="">
            <div>{{details.data[0].category}}</div>
          </div>
          <div class="header-meta-divide">|</div>
          <div class="words item">
            <img src="../assets/words.png" alt="">
            <div>{{details.data[0].content.length}}字</div>
          </div>
          <div class="header-meta-divide">|</div>
          <div class="read-time item">
            <img src="../assets/readtime.png" alt="">
            <div>{{Math.ceil(details.data[0].content.length / 220)}}分钟</div>
          </div>
        </div>
      </el-header>
      <el-main v-html="details.data[0].content"></el-main>
    </el-container>
  </article>
  <el-card shadow="always" class="nothing" style="height:105px" v-if="childrenData.data.length == 0">
      暂无评论
  </el-card>
  <el-card class="comment-list" v-else>
      <template #header>
        <div class="clearfix">
          <span>评论</span>
        </div>
      </template>
      <CommentList :articleId="id"/>
   </el-card>
    <Comments :articleId="id" @getDataList="getDataList"/>
  </div>
</template>

<script lang="ts">
import marked from 'marked' // 引入marked
import hljs from 'highlight.js' // 引入 highlight.js
import 'highlight.js/styles/darcula.css' // 引入高亮样式 这里我用的是sublime样式
import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import getDetails from '../api/getDetails'
import { useStore } from 'vuex'
import Comments from '../components/Comments.vue'
import CommentList from '../components/CommentList.vue'
interface Result {
  data: [{
    title: string;
    content: string;
  }];
}
interface ChildData {
  data: Array<Record <string, any>>;
}
export default defineComponent({
  setup () {
    const route = useRoute()
    const id = Number(route.params.id)
    const store = useStore()
    store.commit('setArticleId', id)
    const childrenData: ChildData = reactive({
      data: []
    })
    const details = reactive({
      data: [{
        content: ''
      }]
    })
    const getDataList = (value: Array<Record<string, any>>) => {
      childrenData.data = value
    }
    onMounted(() => {
      getDetails(id)
        .then((response) => {
          console.log(response)
          details.data = response.data
          details.data[0].content = marked(response.data[0].content)
          details.data[0].content = details.data[0].content.replace(/<pre/g, "<pre class='hljs'")
        })
        .catch((error) => {
          console.log(error)
        })

      const rendererMD = new marked.Renderer()
      marked.setOptions({
        renderer: rendererMD,
        highlight: function (code) {
          return hljs.highlightAuto(code).value
        },
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      })
    })
    return {
      route, id, details, childrenData, getDataList
    }
  },
  components: {
    Comments,
    CommentList
  }
})
</script>

<style scoped>
body{
  font-family: 'Open Sans', -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
}
element.style{
  height: 100px;
}
.item{
  display: flex;
  justify-content: center;
  vertical-align: middle;
}

.article-details{
  width: 880px;
  background-color: #fff;
  border-radius: 10px;
}
.ac-header{
  height: 100px;
  text-align: center;
  margin-top: 40px;
}
.header-meta{
  display:flex;
  justify-content: space-around;
  font-size:14.5px;
  opacity: .8;
  line-height: 24px;
  margin-top: 10px;
}
.nothing {
  margin-top: 50px;
}
.header-meta img{
  width:20px;
  height: 20px;
  margin-right: 5px;
}
.title {
  font-size: 26px;
  letter-spacing: .5px;
}
.comment-list {
  margin-top: 50px;
}
.title:hover {
  color:pink;
  transition: color 1s ease;
}
.el-main{
  line-height: 1.8;
  font-size: 1rem;
}
</style>
