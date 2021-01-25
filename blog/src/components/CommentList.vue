<template :key="new Date().getTime()">
  <div class="list-item" style="padding-left:20px">
    <div v-for="item in dataItem.data" :key="item.Id" class="comment-item">
      <div class="comment-item-avatar"></div>
        <div class="comment-item-inner" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
          <div class="comment-item-header">
            <div class=comment-item-name>{{item.name}}</div>
            <div class="comment-item-data">{{item.date}}</div>
          </div>
          <div class="comment-item-text">
            <p>{{item.content}}</p>
          </div>
           <el-button class="comment-operation on">回复</el-button>
          <el-divider></el-divider>
        </div>
        <comment-list v-if="item.cdr && item.cdr.length!=0" :data="item.cdr"></comment-list>
      </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
export default defineComponent({
  name: 'CommentList',
  props: {
    data: Array,
    key: Number
  },
  setup (props) {
    const dataItem = reactive({
      data: []
    })
    onMounted(() => {
      dataItem.data = props.data
    })
    const addActive = ($event) => {
      $event.currentTarget.className = 'show comment-item-inner'
    }
    const removeActive = ($event) => {
      $event.currentTarget.className = 'comment-item-inner'
    }
    return {
      dataItem, addActive, removeActive
    }
  }
})
</script>

<style>
.comment-item-header{
  display: flex;
  justify-content: space-between;
}
.comment-operation{
  display: none;
}
.show .comment-operation{
  display: block;
}
</style>
