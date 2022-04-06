<template>
  <el-aside
    style="
      width: 240px;
      background-color: #fff;
      border-radius: 9px;
      margin-left: 100px;
    "
  >
    <el-card :body-style="{ padding: '0px', width: '240px' }">
      <div class="nav">
        <a type="primary" href="#" @click="changeState">个人介绍</a>
        <a type="primary" @click="changeState" href="#">功能</a>
      </div>
      <div v-if="introudce === true">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px">
          <h6 class="name">solitce23</h6>
          <el-row :gutter="20">
            <nav class="site-state">
              <el-col class="site-state-item">
                <a style="cursor: default" class="article">
                  <span id="article-count">{{ artNum }}</span>
                  <span id="article-name">文章</span>
                </a>
              </el-col>
              <el-col class="site-state-item">
                <a href="" class="category">
                  <span id="category-count">53</span>
                  <span id="category-name">分类</span>
                </a>
              </el-col>
              <el-col class="site-state-item" @click="showModal">
                <div class="tag" >
                  <span id="tag-count">84</span>
                  <span id="tag-name">标签</span>
                </div>
              </el-col>
            </nav>
          </el-row>
        </div>
        <hr style="width: 200px; opacity: 0.3" />
        <div class="author-links">
          <div class="link-item github">
            <a href="https://github.com/Autumnin2000">
              <img
                src="../assets/GitHub.png"
                alt=""
                style="width: 14px; height: 14px"
              />
              GitHub
            </a>
          </div>
          <div class="link-item lc">
            <a href="https://leetcode-cn.com/u/autumnin2000/">
              <img
                src="../assets/LeetCode.png"
                alt=""
                style="width: 14px; height: 14px"
              />
              LeetCode
            </a>
          </div>
        </div>
      </div>
      <div v-else class="progess">
        <span>{{ year }}</span>
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="percentage"
          status="success"
        ></el-progress>
      </div>
    </el-card>
    <div v-if="visible"  class="show-tag" >
      <div class="tag-box">
        <a-tag v-for="(value,key) in showTagsMap" :key="key" color="pink">{{key}}&nbsp;{{value}}</a-tag>
      </div>
    </div>
    <el-backtop></el-backtop>
  </el-aside>
</template>

<script>
import { defineComponent, nextTick, onMounted, ref, reactive, defineEmits } from 'vue'
import getTimeLine from '../api/getTimeLine'
import getTags from '../api/getTags'
export default defineComponent({
  setup () {
    const introudce = ref(true)
    const percentage = ref(100)
    const showTagsMap = reactive({})
    const artNum = ref(0)
    const year = new Date().getFullYear()
    const changeState = () => {
      introudce.value = !introudce.value
    }
    const computedPercent = () => {
      const month = new Date().getMonth() + 1
      const day = new Date().getDay()
      let isLeap = false
      let during = 0
      if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        isLeap = true
      }
      const months = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      for (let i = 0; i < month; i++) {
        during += months[i]
      }
      during += day
      if (isLeap && month > 2) during++
      percentage.value = ((during / (isLeap ? 366 : 365)) * 100).toFixed(3)
    }
    const visible = ref(false)
    const emit = defineEmits(['emitCss'])
    const showModal = () => {
      console.log(1)
      emit('emitCss')
      visible.value = !visible.value
    }
    const handleOk = (e) => {
      console.log(e)
      visible.value = false
    }
    const computTagsNumber = () => {
      getTags()
        .then((res) => {
          const help = res.data
          for (const v of help) {
            const temp = v.tags.split(',')
            for (const item of temp) {
              if (!showTagsMap[item]) {
                showTagsMap[item] = 1
              } else {
                showTagsMap[item]++
              }
            }
          }
          console.log(showTagsMap)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    onMounted(() => {
      getTimeLine()
        .then((res) => {
          nextTick(() => {
            artNum.value = res.data.length
            console.log(artNum)
          })
        })
        .catch((e) => {
          console.log(e)
        })
      computedPercent()
      computTagsNumber()
    })
    return {
      introudce,
      changeState,
      showModal,
      handleOk,
      computedPercent,
      percentage,
      year,
      artNum,
      showTagsMap,
      visible
    }
  }
})
</script>

<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
}
.nav {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  margin-top: 20px;
}
.nav a:hover {
  border-bottom: 1px solid skyblue;
}
.name {
  text-align: center;
  font-size: 18px;
  font-family: inherit;
  color: skyblue;
  margin: 5px;
}
.author-links .link-item:hover {
  background: grey;
  opacity: 0.5;
}
.progess span {
  font-size: 0.625rem;
  font-weight: 600;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  color: #5e72e4;
  border-radius: 30px;
  background: rgba(94, 114, 228, 0.1);
  margin-bottom: 10px;
  margin-left: 5px;
}
.author-links {
  display: flex;
  justify-content: space-around;
}
.link-item {
  border-radius: 5px;
  margin: 3px;
  padding: 5px;
}
.site-state {
  display: flex;
  color: #5e72e4;
  justify-content: center;
}
.site-state-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
}
.show-tag {
  position: absolute;
  width:600px;
  height: 200px;
  left: 50%;
  top:50%;
  z-index:99;
  margin: -100px 0 0 -300px;
  background-color: white;
}
.tag-box {
  margin-left: 20px;
  margin-top: 20px;
}
.el-aside {
  overflow: hidden;
}
.tag {
  border-left: 1px solid #eee;
}
.category {
  border-left: 1px solid #eee;
}
.site-state-item span {
  display: block;
}
.image {
  width: 50%;
  display: block;
  margin: 0 auto;
  border-radius: 100px;
}
</style>
