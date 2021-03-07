<template>
<el-main>
    <el-timeline>
      <el-timeline-item  placement="top" v-for="(item) in items.item.slice((currentPage -1 ) *size,currentPage*size)" :key="item.id" timestamp="2019-08-7">
        <el-card>
          <el-link type="primary"><h4><router-link :to="'/details/'+item.id">{{item.title}}</router-link></h4></el-link>
          <p>{{item.desc}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  <div class="block" style="margin-left:30%;">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      @current-change="handleCurrentChange"
      :total="items.item.length">
    </el-pagination>
  </div>
</el-main>
</template>

<script>
import { onMounted, reactive, defineComponent, ref } from 'vue'
import { getTimeLine } from '../api/index'

export default defineComponent({
  setup () {
    const size = ref(6)
    const currentPage = ref(1)
    const items = reactive({
      item: []
    })
    const handleCurrentChange = (val) => {
      currentPage.value = val
    }
    onMounted(() => {
      getTimeLine()
        .then((response) => {
          console.log(response)
          items.item = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    })
    return {
      items, size, currentPage, handleCurrentChange
    }
  }

})

</script>

<style>
a{
  text-decoration: none;
  color: #409EFF;
}
.block{
  width:880px;
  margin-right:200px;
}
.el-timeline-item{
  text-align: center;
}
</style>
