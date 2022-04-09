<template>
  <div class="form-box">
    <a-form class="person-form" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="账号">
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <a-form-item label="昵称">
      <a-input v-model:value="formState.nickname" />
    </a-form-item>
    <a-form-item label="年龄">
      <a-input v-model:value="formState.age" />
    </a-form-item>
    <a-form-item label="联系方式">
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item label="职级">
      <a-radio-group v-model:value="formState.level">
        <a-radio value="管理员">管理员</a-radio>
        <a-radio value="员工">员工</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">添加</a-button>
      <a-button style="margin-left: 10px" @click="resetValue">重置</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script>
import { message } from 'ant-design-vue';
import { defineComponent, reactive, toRaw } from 'vue';
import addPerson from '../../api/addPerson'
export default defineComponent({
  setup() {
    const formState = reactive({
      username: '',
      password:'',
      nickname:'',
      email:'',
      age:'',
      level: '',
    });

    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
      let obj = toRaw(formState);
      if(typeof obj.age != 'number'){
        message.error("格式不对，请重新输入")
      }
      addPerson(obj)
      .then(res => {
        if(res.data.code == 200){
          message.success("添加成功");
        }
      })
      .catch(err => {
        message.error(err)
      })
    };
    const resetValue = () => {
      formState.username = "";
      formState.password ="";
      formState.nickname ="";
      formState.email ="";
      formState.age="";
      formState.level ="";
    }

    return {
      labelCol: {
        style: {
          width: '150px',
        },
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
      resetValue
    };
  },

});
</script>
<style scoped>
.form-box {
  background-color: white;
  width: 80%;
  height:500px;
  margin: 0 auto;
  margin-top:20px;
}
.person-form {
  margin-top:20px;
  padding-top: 20px;
}
</style>