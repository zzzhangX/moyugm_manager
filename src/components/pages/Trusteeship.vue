<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form :inline="true" :model="roleForm" class="demo-form-inline">
          <el-form-item label="玩家id：">
            <el-input v-model="roleForm.PlayerOpenid" placeholder="玩家id"></el-input>
          </el-form-item>
          <el-form-item label="研发id：">
            <el-input v-model="roleForm.TestOpenid" placeholder="研发id"></el-input>
          </el-form-item>
          <el-form-item label="操作类型：">
            <el-select v-model="roleForm.OperType" placeholder="类型">
              <el-option label="替换" value="1"></el-option>
              <el-option label="还原" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="延迟执行时间（秒）：">
            <el-input-number v-model="roleForm.DelayTime" @change="handleChange" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="trusteeship">托管</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "trusteeship",
  data() {
    return {
      roleForm: {
        PlayerOpenid: "FE1B6793470827BF3D1987CB58ECB522",
        TestOpenid: "",
        OperType: "1",
        DelayTime: ""
      }
    };
  },
  created() {},
  methods: {
    handleChange(value) {
      this.roleForm.DelayTime = value;
    },
    trusteeship() {
      let url = "api/gm/replaceopenid";
      let params = {
        partition: this.$store.state.serverId,
        playerOpenid: this.roleForm.PlayerOpenid /* 玩家openid */,
        testOpenid: this.roleForm.TestOpenid /* 研发openid */,
        operType: Number(this.roleForm.OperType) /* 操作类型（1替换 2还原） */,
        delayTime: this.roleForm.DelayTime /* 延迟执行时间（秒） */
      };
      console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp.data);
          if (resp.data.msg.Result === 0) {
            this.$message({
              showClose: true,
              message: "托管成功",
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
  padding: 20px;
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

