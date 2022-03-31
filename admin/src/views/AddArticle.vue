<template>
  <div class="main">
    <a-input
      class="title-input"
      type="text"
      placeholder="文章标题"
      v-model="title"
      maxlength="10"
      show-word-limit
    >
    </a-input>
    <div class="second-line">
      <a-input
        class="desc-input"
        type="text"
        placeholder="文章概要"
        v-model="desc"
        maxlength="20"
        show-word-limit
      >
      </a-input>
      <div class="block">
        <a-date-picker
          v-model="date"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
        >
        </a-date-picker>
      </div>
    </div>

    <v-md-editor v-model="content" height="500px"></v-md-editor>
    <a-button style="margin-top:10px;" @click="add" type="primary">
      发布文章
      <i class="el-icon-upload el-icon--right"></i>
    </a-button>
  </div>
</template>

<script>
import addArticle from "../api/addArticle";
export default {
  data() {
    return {
      date: "",
      title: "",
      desc: "",
      content: "",
    };
  },
  methods: {
    // 添加文章
    add() {
      addArticle(this.title, this.content, this.desc, this.date)
        .then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.$message({
              message: "插入成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
      console.log("fabule");
    },
  },
};
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.second-line {
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.title-input {
  width: 15%;
}
.desc-input {
  width: 40%;
}
</style>