<template>
  <div class="search-box">
    <input type="text" class="search-input" v-model="val">
    <i class="el-icon-search search-btn"></i>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
// import getSearchList from '../api/getSearchList'
export default defineComponent({
  setup () {
    const val = ref('')
    watch(() => val.value, (val) => {
      console.log(val)
    })
    return {
      val
    }
  }
})
</script>

<style>
.search-box {
  margin-top: 16px;
  background:pink;
  border-radius:30px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-box .search-input {
  background: none;
  outline:none;
  width: 0px;
  transition:0.5s;
  color:black;
  font-size:15px;
  border:none;
}
.search-box:hover .search-input {
  width:120px;
  transition: width 1s;
}
.search-btn {
  color:#e67e22;
  font-size:20px;
}
.search-box:hover .search-btn {
  color:white;
}
</style>
