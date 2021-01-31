<template>
  <div>
    <div style="margin-left:-20px;">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/">博客首页</el-menu-item>
        <el-menu-item index="/life">生活记录</el-menu-item>
        <el-menu-item><slot></slot></el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Search from './Search.vue'
import SearchTable from './SearchTable.vue'
export default defineComponent({
  setup () {
    return {
      // handleSelect
    }
  },
  component: {
    Search, SearchTable
  }
})
</script>

<style scoped>
/** .head{
  display: flex;
  justify-content: space-between;
  opacity: 0;
} */
</style>
