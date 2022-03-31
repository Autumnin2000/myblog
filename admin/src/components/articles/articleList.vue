<template>
  <a-list
    class="demo-loadmore-list"
    :loading="initLoading"
    item-layout="horizontal"
    :data-source="list"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a key="list-loadmore-edit">查看</a>
          <a key="list-loadmore-more" @click="deleteArticleAction(item)"
            >删除</a
          >
        </template>
        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
          <a-list-item-meta :description="item.desc">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar src="../../assets/bg.png" />
            </template>
          </a-list-item-meta>
          <div>{{ item.date }}</div>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import getArticleList from "../../api/getArticleList";
import deleteArticle from "../../api/deleteArticle";
import { message } from "ant-design-vue";
//const count = 3;
//const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
export default defineComponent({
  setup() {
    const initLoading = ref(true);
    const loading = ref(false);
    const data = ref([]);
    const list = ref([]);
    onMounted(() => {
      getArticleList()
        .then((response) => {
          console.log(response);
          initLoading.value = false;
          data.value = response.data;
          list.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      // fetch(fakeDataUrl).then(res => res.json()).then(res => {
      //   console.log(res)
      //   initLoading.value = false;
      //   data.value = res.results;
      //   list.value = res.results;
      // });
    });
    const deleteArticleAction = (item) => {
      deleteArticle(item.id)
        .then((res) => {
          console.log(res);
          if (res.data.affectedRows == 1) {
            message.success("删除成功");
            getArticleList();
          }
        })
        .catch((e) => {
          message.error(e);
        });
    };
    return {
      loading,
      initLoading,
      data,
      list,
      deleteArticleAction,
    };
  },
});
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
  padding: 0 10px;
}
</style>