<template>
  <div class="list-item" style="padding-left:20px">
    <div v-for="item in dataItem.data" :key="item.Id" class="comment-item">
      <div class="comment-item-avatar"></div>
        <div class="comment-item-inner">
          <div class="comment-item-header">
            <div class=comment-item-name>{{item.name}}</div>
            <div class="comment-item-data">{{item.date}}</div>
          </div>
          <div class="comment-item-text">
            <p>{{item.content}}</p>
          </div>
        </div>
        <comment-list v-if="item.cdr.length!=0" :data="item.cdr"></comment-list>
      </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
export default defineComponent({
  name: 'CommentList',
  props: {
    data: Array
  },
  setup (props) {
    const dataItem = reactive({
      data: []
    })
    onMounted(() => {
      dataItem.data = props.data
    })
    return {
      dataItem
    }
  }
})
</script>

<style>
</style>
