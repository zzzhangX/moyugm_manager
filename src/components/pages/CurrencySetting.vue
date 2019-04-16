<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-form :inline="true" :model="roleForm" class="demo-form-inline">
          <el-form-item label="玩家id：">
            <el-input v-model="roleForm.openId" placeholder="玩家id"></el-input>
          </el-form-item>
          <el-form-item label="角色id：">
            <el-input v-model="roleForm.roleId" placeholder="角色id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setting(1)">修改月卡</el-button>
            <el-button type="primary" @click="setting(2)">设置货币</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 修改魔龙卡 -->
    <el-dialog title="修改魔龙卡" :visible.sync="monthcard_Visible" width="20%">
      <div>
        <el-form label-width="120px">
          <el-form-item :label-position="labelPosition" label="类型：">
            <el-select v-model="cardType" placeholder="类型" style="width: 100%;">
              <el-option label="周卡" value="1"></el-option>
              <el-option label="月卡" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-position="labelPosition" label="数量（天）：">
            <el-input-number v-model="amount" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="changeCard">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改货币 -->
    <el-dialog title="设置货币" :visible.sync="currency_Visible" width="20%">
      <div>
        <el-form label-width="120px">
          <el-form-item :label-position="labelPosition" label="类型：">
            <el-select v-model="currencyType" placeholder="类型" style="width: 100%;">
              <el-option label="游戏币" value="4123"></el-option>
              <el-option label="魔石" value="4125"></el-option>
              <el-option label="绑定魔石" value="4203"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-position="labelPosition" label="数量：">
            <el-input-number v-model="amount" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="changeCurrency">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "currencySetting",
  data() {
    return {
      labelPosition: "left",
      roleForm: {
        openId: "FE1B6793470827BF3D1987CB58ECB522",
        roleId: "61A9000001"
      },
      monthcard_Visible: false,
      currency_Visible: false,
      cardType: "1",
      amount: 0,
      currencyType: "4123"
    };
  },
  created() {},
  methods: {
    setting(index) {
      switch (index) {
        case 1:
          this.monthcard_Visible = true;
          break;
        case 2:
          this.currency_Visible = true;
          break;
      }
    },
    //修改月卡
    changeCard() {
      let url = "api/gm/changemonthcard";
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        type: Number(this.cardType),
        amount: this.amount,
        cmdid: 4245
      };
      console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.msg.RetMsg === "success") {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "修改失败，请返回重试",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: "修改失败，请返回重试",
            type: "error"
          });
        });
      this.reset();
    },
    // 重置弹窗
    reset() {
      this.cardType = "1";
      this.amount = 0;
      this.currencyType = "4123";
      this.monthcard_Visible = false;
      this.currency_Visible = false;
    },
    //修改游戏币，魔石，绑定魔石
    changeCurrency() {
      let url = "api/gm/setcurrency";
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        type: Number(this.currencyType),
        amount: this.amount
      };
      console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.msg.RetMsg === "success") {
            this.$message({
              showClose: true,
              message: `成功添加${this.amount}个魔石`,
              type: "success"
            });

            this.reset();
          } else {
            this.$message({
              showClose: true,
              message: "修改失败，请返回重试",
              type: "error"
            });
            this.reset();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: "修改失败，请返回重试",
            type: "error"
          });
          this.reset();
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
