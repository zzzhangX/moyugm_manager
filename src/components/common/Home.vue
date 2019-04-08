<template>
  <!-- <div class="wrapper"> -->
  <el-container  class="my-container">
    <!-- 头部 -->
    <el-header>
      <vHead></vHead>
    </el-header>
    <el-container>
      <!-- 导航 -->
      <el-aside>
        <vSidebar></vSidebar>
      </el-aside>
      <el-container>
        <el-main>
          <vTags></vTags>
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <router-view :publicData="publicData"></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "./bus";
export default {
  data() {
    return {
      publicData: [],
      tagsList: []
    };
  },
  components: {
    vHead: vHead,
    vSidebar: vSidebar,
    vTags: vTags
  },
  created() {
    // 只有在标签页列表里的页面才使用keep-alive
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
};
</script>
<style scoped>
.el-header {
  padding: 0;
}
.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  line-height: 200px;
  width: 10% !important;
  /* width: auto; */
}
.my-container {
  height: 100%;
  overflow-y: scroll;
}
.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  padding: 0 20px
  /* line-height: 160px; */
}
.content-box {
  border: 1px solid red;
}
.el-main {
  margin: 1%;
  border-radius: 20px;
  background-color: white;
}
</style>
