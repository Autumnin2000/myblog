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
      <el-main v-html="details.data[0].content"></el-main>
    </el-container>
  </article>
  <Comments />
  </div>
</template>

<script lang="ts">
import marked from 'marked' // 引入marked
import hljs from 'highlight.js' // 引入 highlight.js
import 'highlight.js/styles/darcula.css' // 引入高亮样式 这里我用的是sublime样式
import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import getDetails from '../api/getDetails'
import Comments from '../components/Comments.vue'
interface Result {
  data: [{
    title: string;
    content: string;
  }];
}
export default defineComponent({
  setup () {
    const route = useRoute()
    const id = Number(route.params.id)
    const details = reactive({
      data: [{
        content: ''
      }]
    })
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
      route, id, details
    }
  },
  components: {
    Comments
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
.header-meta img{
  width:20px;
  height: 20px;
  margin-right: 5px;
}
.title {
  font-size: 26px;
  letter-spacing: .5px;
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
