<template>
  <div class="main">
      <el-input
      type="text"
      placeholder="文章标题"
      v-model="title"
      maxlength="10"
      show-word-limit
    >
    </el-input>
    <el-input
      type="text"
      placeholder="文章概要"
      v-model="desc"
      maxlength="20"
      show-word-limit
    >
    </el-input>
    
   <v-md-editor v-model="content" height="400px"></v-md-editor>
    <el-button @click="add" type="primary">
      发布文章
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
    <div class="block">
    <el-date-picker
      v-model="date"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
  </div>
</template>

<script>
import addArticle from '../api/addArticle'
export default {
  data(){
    return {
      date:'',
      title:'',
      desc:'',
      content:''
    }
  },
  methods:{
    // 添加文章
     add(){
      addArticle(this.title,this.content,this.desc,this.date)
      .then((res) =>{
        console.log(res)
        if(res.code == 0){
           this.$message({
            message: '插入成功',
            type: 'success'
          });
        }
      })
      .catch((err) =>{
        this.$message.error(err);
      })
      console.log('fabule')
    }
  }
}
</script>

<style>
.main{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-input{
  width: 80%;
}
</style>