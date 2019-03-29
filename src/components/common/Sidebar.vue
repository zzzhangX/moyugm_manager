<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#324157"
      text-color="#cccccc"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-menu-item :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      items: [
        {
          index: "home",
          title: "账号信息"
        },
        {
          index: "playerRoleInfo",
          title: "角色信息"
        },
        {
          index: "backpackInfo",
          title: "背包信息"
        },
        {
          index: "phantomInfo",
          title: "幻兽信息"
        },
        {
          index: "recharge",
          title: "充值相关"
        },
        {
          index: "trusteeship",
          title: "托管"
        },
        {
          index: "mail",
          title: "邮件",
          subs: [
            {
              index: "ordinarymail",
              title: "普通邮件"
            },
            {
              index: "fullservicemail",
              title: "全服邮件"
            }
          ]
        },
        {
          index: "4",
          title: "其他功能"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {}
};
</script>

<style scoped>
.el-submenu__title > span,
.el-menu-item {
  font-size: 16px !important;
}
.sidebar {
  display: block;
  overflow: hidden;
  overflow-y: scroll;
  border-radius: 0 0 10px 0;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
}
</style>
