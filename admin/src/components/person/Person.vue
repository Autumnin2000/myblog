<template>
  <a-table class="person-table" :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === '管理员' ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a
            v-if="record.level == '管理员' && userInfo.level == '员工'"
            style="color: gray"
            >删除</a
          >
          <a v-else @click="deleteUserAction(record.id)">删除</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script>
import { SmileOutlined } from "@ant-design/icons-vue";
import getUserInfo from "../../api/getUserInfo";
import deleteUser from "../../api/deleteUser";
import { defineComponent, onMounted, ref } from "vue";
import { message } from "ant-design-vue";
const columns = [
  {
    name: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "联系方式",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "级别",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "操作",
    key: "action",
  },
];
export default defineComponent({
  components: {
    SmileOutlined,
  },
  setup() {
    const data = ref([]);
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const getUserInfoAction = () => {
      getUserInfo()
        .then((res) => {
          console.log(res);
          res.data = res.data.map((item, index) => {
            item.key = index + 1 + "";
            item.name = item.nickname;
            item.tags = [];
            item.tags.push(item.level);
            return item;
          });
          data.value = res.data;
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    onMounted(() => {
      getUserInfoAction()
    });
    const deleteUserAction = (id) => {
      deleteUser(id)
        .then((res) => {
          if (res.data.affectedRows == 1) {
            message.success("删除成功");
            getUserInfoAction();
          }
        })
        .catch((e) => {
          message.error(e);
        });
    };
    return {
      data,
      columns,
      userInfo,
      deleteUserAction,
    };
  },
});
</script>
<style scoped>
.person-table {
  padding: 0 20px;
  margin-top: 20px;
}
</style>