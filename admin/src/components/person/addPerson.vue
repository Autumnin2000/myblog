<template>
  <div class="form-box">
    <a-form class="person-form" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="账号">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <a-form-item label="昵称">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="年龄">
      <a-input v-model:value="formState.age" />
    </a-form-item>
    <a-form-item label="联系方式">
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item label="职级">
      <a-radio-group v-model:value="formState.resource">
        <a-radio value="1">管理员</a-radio>
        <a-radio value="2">员工</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetValue">Cancel</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, toRaw } from 'vue';
export default defineComponent({
  setup() {
    const formState = reactive({
      name: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    });

    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
    };

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
}
</style>