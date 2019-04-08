<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form :inline="true" :model="roleForm" class="demo-form-inline">
          <el-form-item label="玩家id：">
            <el-input v-model="roleForm.openId" placeholder="玩家id"></el-input>
          </el-form-item>
          <el-form-item label="角色id：">
            <el-input v-model="roleForm.roleId" placeholder="角色id"></el-input>
          </el-form-item>
          <el-form-item label="修改值">
            <el-input-number v-model="amount"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeExp(1)">修改玩家经验值</el-button>
            <el-button type="primary" @click="changeExp(2)">修改玩家VIP经验值</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "changeexp",
  data() {
    return {
      roleForm: {
        openId: "FE1B6793470827BF3D1987CB58ECB522",
        roleId: "61A9000001"
      },
      amount: 0
    };
  },
  methods: {
    changeExp(index) {
      let params = {
        partition: this.$store.state.serverId,
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        amount: this.amount
      };
      let url;
      if (index === 1) {
        url = "api/gm/changeexp";
        params.cmdid = 4127
      } else {
        url = "api/gm/changevipexp";
        params.cmdid = 4205
      }
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp);
          if (resp.data.msg.Result === 0) {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.el-row {
  padding: 10px;
  border-radius: 20px;
}
.el-col {
  height: 100%;
  text-align: left;
}
.el-col form {
  height: 100%;
}
.el-col form div {
  height: 100%;
  line-height: 100%;
}
.el-row:nth-of-type(1) {
  background: #eaecf3;
}
.el-row:nth-of-type(1) h1 {
  padding: 20px;
}
.el-form-item {
  margin: 5px;
}
.el-input-number {
  line-height: 38px !important;
}
</style>

