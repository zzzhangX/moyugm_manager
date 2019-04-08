<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="20">
        <el-form :inline="true" :model="roleForm" class="demo-form-inline">
          <el-form-item>
            <h4>充值查询</h4>
          </el-form-item>
          <el-form-item label="玩家id：">
            <el-input v-model="roleForm.openId" placeholder="玩家id"></el-input>
          </el-form-item>
          <el-form-item label="角色id：">
            <el-input v-model="roleForm.roleId" placeholder="角色id"></el-input>
          </el-form-item>
          <el-form-item label="选择时间：">
            <el-date-picker
              v-model="time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="rechargeSearch">查询充值</el-button>
            <el-button type="primary" @click="rechargeEdit">修改充值</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <div v-show="historySearch">
          <h5>充值魔石数：{{HChargeMagicStone}}</h5>
          <h5>交易获得魔石数：{{HTradeMagicStone}}</h5>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="20">
        <el-form :inline="true" :model="roleForm" class="demo-form-inline">
          <el-form-item>
            <h4>活动充值查询:</h4>
          </el-form-item>
          <el-form-item label="活动id">
            <el-input v-model="activityId" placeholder="活动id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dailypaynum">活动期间每日累充金额</el-button>
            <el-button type="primary" @click="rechargeEdit">满足设定金额的总天数</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 修改玩家直购类的累充值 -->
    <el-dialog title="修改玩家直购类的累充值" :visible.sync="recharge_Visible" width="20%">
      <div>
        <el-form>
          <el-form-item label="数量：">
            <el-input-number v-model="amount"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="changeRecharge">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "recharge",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      roleForm: {
        openId: "FE1B6793470827BF3D1987CB58ECB522",
        roleId: "61A9000001"
      },
      time: "",
      historySearch: false,
      recharge_Visible: false,
      HChargeMagicStone: 0,
      HTradeMagicStone: 0,
      timeSearch: false,
      amount: 0,
      activityId: 0
    };
  },
  methods: {
    // 充值查询
    rechargeSearch() {
      this.historySearch = true;
      let url = "api/query/totalpay";
      console.log(this.time);
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        beginTime: this.$exchangeDate(this.time[0]),
        endTime: this.$exchangeDate(this.time[1])
      };
      console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp);
          this.HChargeMagicStone = resp.data.msg.HChargeMagicStone;
          this.HTradeMagicStone = resp.data.msg.HTradeMagicStone;
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: "修改失败，请返回重试",
            type: "error"
          });
        });
    },
    reset() {
      this.amount = 0;
      this.recharge_Visible = false;
    },
    rechargeEdit() {
      this.recharge_Visible = true;
    },
    // 修改充值
    changeRecharge() {
      let url = "api/gm/changepayvalue";
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        amount: this.amount
      };
      console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp);
          this.reset();
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: "修改失败，请返回重试",
            type: "error"
          });
        });
    },
    dailypaynum() {
      let url = "api/query/dailypaynum";
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        activityId: Number(this.activityId)
      };
      console.log(params)
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: "修改失败，请返回重试",
            type: "error"
          });
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
.el-row {
  margin-top: 5px;
  background: #eaecf3;
}
.el-form-item {
  margin: 5px;
}
.el-input-number {
  line-height: 38px !important;
}
</style>

