<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input v-model="roleId" placeholder="请输入玩家进行查询"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="searchRoleInfo">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="roleListArr" style="width: 100%" border>
      <el-table-column fixed prop="RoleId" label="角色ID" width="110" align="center"></el-table-column>
      <el-table-column fixed prop="RoleName" label="角色名" width="100" align="center"></el-table-column>
      <el-table-column prop="RoleSex" label="性别" width="100" align="center"></el-table-column>
      <el-table-column prop="Job" label="职业" width="100" align="center"></el-table-column>
      <el-table-column prop="Level" label="等级" width="100" align="center"></el-table-column>
      <el-table-column prop="TotalFight" label="战斗力" width="100" align="center"></el-table-column>
      <el-table-column prop="AttributeGrade" label="属性评分" width="100" align="center"></el-table-column>
      <el-table-column prop="Prestige" label="威望" width="100" align="center"></el-table-column>
      <el-table-column prop="Peerage" label="爵位" width="100" align="center"></el-table-column>
      <el-table-column prop="Legion" label="所属军团" width="100" align="center"></el-table-column>
      <el-table-column prop="CreateTime" label="角色创建时间" width="180" align="center"></el-table-column>
      <el-table-column prop="LastLoginTime" label="最后登录时间" width="180" align="center"></el-table-column>
      <el-table-column prop="LastLogoutTime" label="最后登出时间" width="180" align="center"></el-table-column>
      <el-table-column prop="MagicStone" label="当前魔石" width="100" align="center"></el-table-column>
      <el-table-column prop="BoundMagicStone" label="当前绑定魔石" width="110" align="center"></el-table-column>
      <el-table-column prop="GoldCoin" label="当前金币" width="100" align="center"></el-table-column>
      <el-table-column prop="WarExploit" label="战勋" width="100" align="center"></el-table-column>
      <el-table-column prop="DevilCoin" label="恶魔币" width="100" align="center"></el-table-column>
      <el-table-column prop="IsLogin" label="当日是否登录" width="110" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "PlayerRoleInfo",
  data() {
    return {
      roleId: "61A9000001",
      roleListArr: []
    };
  },
  created() {},
  methods: {
    searchRoleInfo() {
      let url = "api/query/userinfo";
      // let url = "api/query/rolelist";
      // let url = "api/query/ranklist";
      // let url = "api/query/openid";
      let params = `{
        "partition":${this.$store.state.serverId},
        "openId":"FE1B6793470827BF3D1987CB58ECB522",
        "roleId":"${this.roleId}"
        }`;
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          let arr = resp.data.msg.UserList;
          this.roleListArr = this.exchange(arr)
        })
        .catch(err => {
          console.log(err);
        });
    },
    exchange(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].RoleName = decodeURI(arr[i].RoleName); //转名字
        arr[i].RoleSex == 0 ? (arr[i].RoleSex = "男") : (arr[i].RoleSex = "女"); //转性别
        arr[i].CreateTime = this.exchangeDate(arr[i].CreateTime);
        arr[i].LastLoginTime = this.exchangeDate(arr[i].LastLoginTime);
        arr[i].LastLogoutTime = this.exchangeDate(arr[i].LastLogoutTime); //转日期
        if (arr[i].Job == 1) {
          arr[i].Job = "战士";
        } else if (arr[i].Job == 2) {
          arr[i].Job = "法师";
        } else {
          arr[i].Job = "血族";
        } //转职业
        arr[i].IsLogin === 0
          ? (arr[i].IsLogin = "未登录")
          : (arr[i].IsLogin = "登录"); //今日是否登录
      }
      return arr
    }
  }
};
</script>
<style scoped>
* {
  line-height: 30px !important;
}
.el-button {
  line-height: 1 !important;
}
.el-table {
  margin-top: 1%;
}
</style>
