<template>
  <div style="margin-left:-20px">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/">博客首页</el-menu-item>
        <el-menu-item index="/life">生活记录</el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.head{
  display: flex;
  justify-content: space-between;
}
</style>
