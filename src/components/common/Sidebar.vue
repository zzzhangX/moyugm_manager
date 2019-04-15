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
              <!-- <i :class="item.icon"></i> -->
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-menu-item
                :index="subItem.index"
                :key="subItem.index"
                class="subTitle"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <!-- <i :class="item.icon"></i> -->
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
          index: "roleInfo",
          title: "角色信息",
          subs: [
            { index: "playerRoleInfo", title: "基础信息" },
            { index: "currencySetting", title: "货币设置" },
            { index: "rankingList", title: "排行榜信息" },
            { index: "recharge", title: "充值相关" }
          ]
        },
        {
          index: "backpackInfo",
          title: "背包信息"
        },
        {
          index: "changeExp",
          title: "修改经验"
        },
        {
          index: "phantomInfo",
          title: "幻兽信息"
        },
        {
          index: "trusteeship",
          title: "托管"
        },
        {
          index: "horseRaceLamp",
          title: "跑马灯"
        },
        {
          index: "serverOperation",
          title: "服务器操作",
          subs: [
            {
              index: "whiteList",
              title: "白名单操作"
            }
          ]
        },
        {
          index: "mail",
          title: "邮件",
          subs: [
            {
              index: "whiteList",
              title: "白名单操作"
            }
          ]
        },
        {
          index: "ordinarymail",
          title: "邮件"
        },
        {
          index: "funclist",
          title: "游戏功能"
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
  width: 100%;
  border-radius: 0 0 10px 0;
  user-select: none;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: auto;
  padding: auto;
}
.subTitle {
  font-size: 13px !important;
  padding-left: 55px !important;
}
</style>
