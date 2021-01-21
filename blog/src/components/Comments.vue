<template>
  <div>
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
import { defineComponent, reactive, ref } from 'vue'
import kaomoji from '../utils/kaomoji'
export default defineComponent({
  setup () {
    const refForm = ref(null)
    const isShowKeyBoard = ref(false)
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
      isShowKeyBoard
    }
  }
})
</script>

<style>
.box-card{
  margin-top:100px;
  margin-bottom: 50px;
}
.box-card .el-card__body{
  height:300px;
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
</style>
