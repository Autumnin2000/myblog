<template>
  <div class="block">
  <el-timeline>
    <el-timeline-item  placement="top" v-for="(item) in items.item" :key="item.id" timestamp="2019-08-7">
      <el-card>
        <el-link type="primary"><h4><router-link :to="'/details/'+item.id">{{item.title}}</router-link></h4></el-link>
        <p>{{item.desc}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
</template>

<script>
import { onMounted, reactive, defineComponent } from 'vue'
import { getTimeLine } from '../api/index'

export default defineComponent({
  setup () {
    const items = reactive({
      item: []
    })
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
      items
    }
  }

})

</script>

<style>
a{
  text-decoration: none;
  color: #409EFF;
}
.el-timeline-item{
  text-align: center;
}
</style>
