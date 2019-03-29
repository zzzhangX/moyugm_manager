<template>
  <div class="PlayerAccountInfo">
    <el-row :gutter="20">
      <h1>获取玩家号</h1>
      <el-col :span="4">
        <el-input v-model="roleName" placeholder="请输入玩家昵称"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="roleId" placeholder="请输入玩家ID"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="searchRoleId">查询</el-button>
      </el-col>
      <el-col :span="8" class="openId" v-show="isShow">
        <span>{{openId}}</span>
        <el-button
          type="primary"
          v-clipboard:copy="openId"
          v-clipboard:success="copyOpenId"
          v-clipboard:error="onError"
        >复制</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "PlayerAccountInfo",
  data() {
    return {
      roleName: "",
      roleId: "",
      openId: "",
      isShow: false
    };
  },
  created() {},
  methods: {
    searchRoleId() {
      let params;
      if (this.roleName === "" && this.roleId !== "") {
        params = `{
        "partition":${this.$store.state.serverId},
        "roleId":"${this.roleId}"
        }`;
      } else if (this.roleId === "" && this.roleName !== "") {
        params = `{
        "partition":${this.$store.state.serverId},
        "roleName":"${this.roleName}"
        }`;
      } else if (this.roleId !== "" && this.roleName !== "") {
        params = `{
        "partition":${this.$store.state.serverId},
        "roleName":"${this.roleName}",
        "roleId":"${this.roleId}"
        }`;
      } else {
        this.$message({
          showClose: true,
          message: "请输入昵称或id",
          type: "warning"
        });
      }
      let url = "api/query/openid";
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          this.openId = resp.data.msg.OpenId;
          if (this.openId !==undefined) {
            this.isShow = true;
          } else {
            this.$message({
              showClose: true,
              message: "检查是否输入正确",
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    copyOpenId(e) {
      this.$message({
        showClose: true,
        message: "已复制",
        type: "success"
      });
    },
    onError(e) {
      this.$message({
        showClose: true,
        message: "复制失败，请重试",
        type: "error"
      });
    }
  }
};
</script>
<style scoped>
.PlayerAccountInfo {
  height: 100%;
}
* {
  line-height: normal !important;
}
.el-button {
  line-height: 1 !important;
}
.el-row {
  height: 200px;
  padding: 20px;
  border-radius: 20px;
}
.el-row:nth-of-type(1) {
  background: #e5e9f2;
}
.el-row:nth-of-type(1) h1 {
  padding: 20px;
}
.openId button {
  margin-left: 40px;
}
</style>


