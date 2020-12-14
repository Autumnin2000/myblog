<template>
  <div>
   <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-menu-item index="1">
    <i class="el-icon-location"></i>
      <template #title>添加文章</template>
  </el-menu-item>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <template #title>文章管理</template>
  </el-menu-item>
  <el-menu-item index="3">
    <i class="el-icon-setting"></i>
    <template #title>评论管理</template>
  </el-menu-item>
</el-menu>

  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data(){
    return {
      isCollapse:true
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
})
</script>

<style>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>