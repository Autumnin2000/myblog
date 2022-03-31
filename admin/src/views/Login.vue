<template>
  <div class="login-container">、
    <h2 class="login-title">博客后台管理系统</h2>
    <a-form :layout="formState.layout" :model="formState" v-bind="formItemLayout" class="login-form">
    <a-form-item label="账号">
      <a-input v-model:value="formState.fieldA" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="formState.fieldB" placeholder="请输入" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="login">登录</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script>
import { computed, defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router'
import userLogin from '../api/login'
export default defineComponent({
  setup() {
    
    const formState = reactive({
      layout: 'horizontal',
      fieldA: '',
      fieldB: '',
    });
    const formItemLayout = computed(() => {
      const { layout } = formState;
      return layout === 'horizontal'
        ? {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 14,
            },
          }
        : {};
    });
    const buttonItemLayout = computed(() => {
      const { layout } = formState;
      return layout === 'horizontal'
        ? {
            wrapperCol: {
              span: 14,
              offset: 4,
            },
          }
        : {};
    });
    const Router = useRouter();
    const login = () => {
      userLogin('root','root')
      .then((response) =>{
        console.log(response)
        if(response.data.code == 0){
          Router.push({path:'/index'})
        }
      })
      .catch((err) =>{
        console.log(err);
      })
    }
    return {
      formState,
      formItemLayout,
      buttonItemLayout,
      login
    };
  },
});
</script>
<style>
.login-form {
  width:565px;
  height:372px;
  margin:0 auto;
  padding: 40px 110px;
  background: url("../assets/loginbg.png");
}
.login-title {
  color:#fff;
  text-align: center;
  font-size: 48px;
  margin: 150px 0;
  font-family: Microsoft Yahei;
}
.login-container {
  position: absolute;
  width:100%;
  height: 100%;
  background: url("../assets/bg.png");
}
</style>