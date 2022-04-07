<template>
  <div>
    <div class="index-header">
      <div class="header-left">
        <img
          style="width: 50px; height: 50px"
          src="../assets/logo.png"
          alt=""
        />
        <div class="header-left-title">后台管理系统</div>
      </div>
      <div class="header-right">
        <a-switch
          :checked="theme === 'dark'"
          checked-children="Dark"
          un-checked-children="Light"
          @change="changeTheme"
        />
        &nbsp;
        <a-popover title="Action" trigger="hover">
          <template #content>
             <a @click="logout">退出登录</a>
          </template>
          <a-button>{{userInfo.nickname}}</a-button>
        </a-popover>
      </div>
    </div>
    <div class="main-container">
      <div>
        <a-menu
          style="width: 256px; height: 678px"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          :theme="theme"
        >
          <a-sub-menu key="sub1">
            <template #icon>
              <AppstoreOutlined />
            </template>
            <template #title>内容管理</template>
            <a-menu-item key="3" @click="clickTitle($event, 3)"
              >博客列表</a-menu-item
            >
            <a-menu-item key="4" @click="clickTitle($event, 4)"
              >添加博客</a-menu-item
            >
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #icon>
              <SettingOutlined />
            </template>
            <template #title>评论管理</template>
            <a-menu-item key="7">评论管理1</a-menu-item>
            <a-menu-item key="8">评论管理2</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #icon>
              <SettingOutlined />
            </template>
            <template #title>人员管理</template>
            <a-menu-item key="9" @click="clickTitle($event, 5)">人员列表</a-menu-item>
            <a-menu-item key="10" @click="clickTitle($event, 6)">添加人员</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const Router = useRouter();
    const visible = ref(false);
    const userInfo = JSON.parse(localStorage.getItem('user_info'))
    const logout = () => {
      visible.value =false;
      message.success("退出成功！");
      localStorage.removeItem("user_token")
      localStorage.removeItem("user_info")
      Router.push("/login");
    };
    const state = reactive({
      theme: "dark",
      selectedKeys: ["1", "2", "3"],
      openKeys: ["sub1"],
    });
    const clickTitle = (item, key) => {
      console.log(item)
      if (key == 3) {
        Router.push({
          path: "/articles/articleList",
        });
      } else if (key == 4) {
        Router.push({
          path: "/articles/AddArticle",
        })
      }else if (key == 5) {
        Router.push({
          path: "/Person/list",
        });
      }else if (key == 6) {
        Router.push({
          path: "/Person/add",
        });
      }
    };
    const changeTheme = (checked) => {
      state.theme = checked ? "dark" : "light";
    };

    return { ...toRefs(state), changeTheme, clickTitle, logout, userInfo };
  },

  components: {
    AppstoreOutlined,
    SettingOutlined,
  },
});
</script>
<style scoped>
.user-info {
  color: white;
}
.index-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #001529;
  width: 100%;
  height: 75px;
}
.header-left {
  margin-left: 15px;
}
.header-right {
  display: flex;
  align-items: center;
  margin-right: 15px;
  
}
.header-left-title {
  color: white;
  float: right;
  margin-top: 20px;
}
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.main-content {
  width: 1200px;
  background-color: antiquewhite;
  height: 628px;
  margin-top: 15px;
  margin-left: 15px;
}
</style>