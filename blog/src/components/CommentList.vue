<template>
   <div>
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
           <el-button class="comment-operation on" @click="reply(item.Id)">回复</el-button>
           <component v-if="clickId === item.Id" :is="isReply" :articleId="articleIdData" :parentId ="item.Id" />
          <el-divider></el-divider>
        </div>
        <comment-list v-if="item.cdr && item.cdr.length!=0" :data="item.cdr"></comment-list>
      </div>
  </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import Comments from './Comments.vue'
import { useStore } from 'vuex'
// import addComment from '../api/addComment'
export default defineComponent({
  name: 'CommentList',
  props: {
    articleId: Number,
    data: []
  },
  components: {
    Comments
  },
  setup (props) {
    const dataItem = reactive({
      data: []
    })
    const clickId = ref(0)
    const articleIdData = ref(0)
    const isReply = ref('')
    // let Id = ref(0)
    const store = useStore()
    /** watch(() => store.state.isCommented, () => {
      dataItem.data.splice(0)
      store.state.commentList.forEach(e => {
        dataItem.data.push(e)
      })
      console.log(dataItem.data)
    }) */
    onMounted(() => {
      if (props.data) {
        dataItem.data = props.data
      } else {
        dataItem.data = store.state.commentList
      }
      articleIdData.value = store.state.articleId
    })
    const addActive = ($event) => {
      $event.currentTarget.className = 'show comment-item-inner'
    }
    const removeActive = ($event) => {
      $event.currentTarget.className = 'comment-item-inner'
    }
    const reply = (parentId) => {
      clickId.value = parentId
      isReply.value = isReply.value === 'Comments' ? '' : 'Comments'
      console.log(parentId)
    }
    return {
      dataItem, addActive, removeActive, reply, isReply, articleIdData, clickId
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
