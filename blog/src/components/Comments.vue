<template>
  <div class="comments">
    <el-card shadow="always" class="nothing" style="height:105px" v-if="datas.data.length == 0">
      暂无评论
    </el-card>
    <el-card class="comment-list" v-else>
      <template #header>
        <div class="clearfix">
          <span>评论</span>
        </div>
      </template>
      <CommentList :data="datas.data"/>
    </el-card>
    <el-card class="box-card">
    <template #header>
      <div class="clearfix">
        <span>发送评论</span>
        <img src="../assets/emoji.png" id="emotion-img" @click="showKeyboard">
        <el-button style="float: right; padding: 3px 0" type="text" @click="submitForm">发送</el-button>
      </div>
    </template>
    <el-form ref="refForm" :model="form" :rules="rules">
        <el-form-item prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="评论内容"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="昵称"
            v-model="form.name"
          >
          </el-input>
        </el-form-item>
    </el-form>
  </el-card>
  <el-card class="emotion-group" v-if="isShowKeyBoard">
    <div v-for="item in kaomoji" :key="item.id" class="emotion-item">
      {{item.desc}}
    </div>
  </el-card>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from 'vue'
import kaomoji from '../utils/kaomoji'
import getComments from '../api/getComments'
import CommentList from './CommentList.vue'
export default defineComponent({
  components: { CommentList },
  props: {
    articleId: Number
  },
  setup (props) {
    const refForm = ref(null)
    const isShowKeyBoard = ref(false)
    const datas = reactive({
      data: []
    })
    const form = reactive({
      content: '',
      name: ''
    })
    const rules = {
      content: [
        { required: true, message: '请输入评论内容', trigger: 'blur' }
      ],
      name: [
        { required: true, message: '请输入昵称', trigger: 'blur' }
      ]
    }
    const help = (obj, map, note, arr) => {
      note[map[obj.Id]] = true
      console.log(obj.Id, map[obj.Id])
      obj.cdr = []
      if (obj.children !== '-1') {
        const temp = obj.children.split(',')
        for (let i = 0; i < temp.length; i++) {
          obj.cdr.push(help(arr[map[parseInt(temp[i])]], map, note, arr))
          note[map[temp[i]]] = true
        }
      } else {
        return obj
      }
      return obj
    }
    const dataHandler = (arr) => {
      const obj = {}
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        obj[item.Id] = i
      }
      const note = new Array(999).fill(false)
      const ans = []
      for (let i = 0; i < arr.length; i++) {
        if (note[i]) continue
        const item = arr[i]
        if (item.children === '-1') {
          ans.push(item)
        } else {
          ans.push(help(item, obj, note, arr))
        }
      }
      return ans
    }
    onMounted(() => {
      getComments(props.articleId)
        .then((response) => {
          datas.data = dataHandler(response.data)
          console.log(typeof datas.data)
        })
        .catch((error) => {
          console.log(error)
        })
    })
    const submitForm = async () => {
      // const formContent = unref(refForm)
      // if (!formContent) return
      const { name, content } = form
      if (name === '' || content === '') {
        return
      }
      console.log(name, content, kaomoji)
    }
    const showKeyboard = () => {
      isShowKeyBoard.value = !isShowKeyBoard.value
    }
    return {
      submitForm,
      refForm,
      form,
      rules,
      kaomoji,
      showKeyboard,
      isShowKeyBoard,
      datas
    }
  }
})
</script>

<style>
.box-card{
  margin-top:20px;
  margin-bottom: 50px;
}
.box-card .el-card__body{
  height:300px;
}
.comments{
  margin-top: 100px;
}
#emotion-img{
  width:30px;
  height:30px;
  position:relative;
  right:70px;
  top:-5px;
  float:right;
  cursor: pointer;
}
.emotion-group .el-card {
    width: 620px;
    height: 370px;
    position:relative;
    bottom:810px;
    left:140px;
}
.emotion-item:hover{
  background-color: pink;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .comment-list {
    width: 880px;
  }
</style>
