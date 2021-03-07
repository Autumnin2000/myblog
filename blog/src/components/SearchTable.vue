<template>
  <div class="search-table" v-clickoutside="showTable">
    <el-card class="box-card" v-if="listData && listData.length!=0">
      <div v-for="item in listData" :key="item.id" @click="goDetails(item.id)" class="serach-list-item">
        <p>{{item.title}}</p>
      </div>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  directives: {
    clickoutside: {
      beforeMount (el, binding, vnode) {
        console.log(el, binding, vnode)
        function documentHandler (e) {
          if (el.contains(e.target)) {
            console.log('1')
            return false
          }
          if (binding.value) {
            binding.value(e)
          }
        }
        document.addEventListener('click', documentHandler)
      }
    }
  },
  setup () {
    const store = useStore()
    const listData = ref([])
    const Router = useRouter()
    const Route = useRoute()
    const showTable = () => {
      listData.value = []
    }
    onMounted(() => {
      listData.value = []
    })
    const goDetails = (id) => {
      Router.push({ name: 'Details', params: { id: id } })
    }
    watch(() => store.state.searchData, (val) => {
      listData.value = val
    })
    watch(() => Route.path, () => {
      listData.value = []
    })
    return {
      store, listData, goDetails, showTable
    }
  }
})
</script>

<style>
.search-table .el-card {
  display: inline-block;
  position: relative;
  width:250px;
  height: 175px;
  bottom: 120px;
  left:200px;
}
.serach-list-item {
  width:100%;
  margin-bottom: 5px;
}
.serach-list-item:hover {
  background-color: pink;
  cursor: pointer;
}
</style>
