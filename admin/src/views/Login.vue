<template>
  <body id="poster">
    <el-form :model="ruleForm" :rules="rules" ref="rulForm" class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text"  v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
 
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
 
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </body>

</template>


<script>
import userLogin from '../api/login'
import { defineComponent } from 'vue'
export default defineComponent({
  data(){
    return{
      ruleForm:{
        username:'',
        password:''
      },
      rules:{
        username:[
          {required:true,message:'用户名不能为空',trigger:'blur'},
          {min:3,max:6,message:'长度在3到6个字符',trigger:'blur'}
        ],
        password:[
          {required:true,message:'密码不能为空',trigger:'blur'},
          {min:3,max:6,message:'长度在3到6个字符',trigger:'blur'}
        ]
      },
    }
  },
  methods:{
    login(){
      userLogin(this.ruleForm.username,this.ruleForm.password)
      .then((response) =>{
        console.log(response)
        if(response.data.code == 0){
          this.$router.push({path:'/index'})
        }
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }
})
</script>

<style>

#poster {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }
 
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
 
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>