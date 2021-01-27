<template>
  <div class="comments">
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
import { useStore } from 'vuex'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import kaomoji from '../utils/kaomoji'
import getComments from '../api/getComments'
import addComment from '../api/addComment'
export default defineComponent({
  emits: ['getDataList'],
  props: {
    articleId: Number,
    parentId: Number
  },
  setup (props, context) {
    const refForm = ref(null)
    const isShowKeyBoard = ref(false)
    const listKey = ref(0)
    const store = useStore()
    const isCommented = ref(store.state.isCommented)
    const datas = reactive({
      data: []
    })
    let parentId = 0
    let Id = ref(0)
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
    const openSuccess = () => {
      ElMessage.success({
        message: '评论成功！',
        type: 'success'
      })
    }
    const openFailed = (message) => {
      ElMessage.error(message)
    }
    watch(isCommented, () => {
      getComments(props.articleId)
        .then((response) => {
          Id = response.data.length + 1
          const temp = dataHandler(response.data)
          datas.data.splice(0)
          console.log(datas.data)
          temp.forEach(e => {
            datas.data.push(e)
          })
          console.log(datas.data)
          // const n = temp.length - 1
          // datas.data.push(temp[n])
          store.commit('changeCommentList', datas.data)
          context.emit('getDataList', datas.data)
        })
        .catch(() => {
          openFailed('更新数据失败,未知错误')
        })
    })
    // watch(isCommentedToParent, () => {
    // })
    onMounted(() => {
      // console.log(store.state.commentList)
      // dataItem.data = store.state.commentList
      console.log(props)
      if (props.parentId) {
        parentId = props.parentId
      }
      getComments(props.articleId)
        .then((response) => {
          Id = response.data.length + 1
          datas.data = dataHandler(response.data)
          store.commit('changeCommentList', datas.data)
          context.emit('getDataList', datas.data)
        })
        .catch((error) => {
          console.log(error)
          openFailed('获取数据失败,未知错误')
        })
    })
    const submitForm = () => {
      const { name, content } = form
      const date = new Date()
      console.log(name, content)
      if (name === '' || content === '') {
        return
      }
      if (!parentId) {
        addComment(name, content, date, props.articleId, Id)
          .then((res) => {
            console.log(res)
            if (res.data.code === 0) {
              openSuccess()
              isCommented.value++
              store.commit('setCommentedState')
              refForm.value.resetFields()
            } else {
              openFailed(res.data.message)
            }
          })
          .catch((err) => {
            openFailed(err)
            refForm.value.resetFields()
          })
      } else {
        addComment(name, content, date, props.articleId, Id, parentId)
          .then((res) => {
            console.log(res)
            if (res.data.code === 0) {
              openSuccess()
              isCommented.value++
              store.commit('setCommentedState')
              refForm.value.resetFields()
            } else {
              openFailed(res.data.message)
            }
          })
          .catch((err) => {
            openFailed(err)
            refForm.value.resetFields()
          })
      }
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
      datas,
      listKey
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
