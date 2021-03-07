<template>
  <div>
    <div class="search-box" @keydown.enter="goResult(val)">
      <input type="text" class="search-input" v-model="val">
      <i class="el-icon-search search-btn" @click="goResult(val)"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import debounce from '../utils/debounce'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import getSearchList from '../api/getSearchList'
export default defineComponent({
  setup () {
    const val = ref('')
    const Route = useRoute()
    const store = useStore()
    const Router = useRouter()
    const goResult = (keywords) => {
      Router.push({ name: 'SearchList', params: { keywords: keywords } })
    }
    watch(() => Route.path, () => {
      val.value = ''
    })
    onMounted(() => {
      val.value = ''
    })
    watch(() => val.value, (val) => {
      debounce(getSearchList, val, 1000)()
    })
    return {
      val, goResult
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
