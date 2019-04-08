<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="输入玩家id">
            <el-input v-model="openId" placeholder="玩家id"></el-input>
          </el-form-item>
          <el-form-item label="操作白名单">
            <el-select v-model="operType" collapse-tags style="width: 100%;" placeholder="请选择">
              <el-option
                v-for="(item,index) in operTypeArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="whiteListSearch">查看白名单状态</el-button>
            <el-button type="primary" @click="operateWhiteList">确认操作</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "whiteList",
  data() {
    return {
      // (1添加、2解除、3开启白名单、4关闭白名单)
      openId: "FE1B6793470827BF3D1987CB58ECB522",
      state: "",
      operType:1,
      operTypeArr: [
        {label: "添加",value: 1},
        {label: "解除",value: 2},
        {label: "开启白名单",value: 3},
        {label: "关闭白名单",value: 4},
      ]
    };
  },
  methods: {
    //白名单状态查询
    whiteListSearch() {
      let url = "api/gm/whiteliststate";
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.openId
      };
      console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          resp.data.msg.State === 0
            ? (this.state = "非白名单状态")
            : (this.state = "白名单状态");
          this.$message({
            message: `此玩家处于${this.state}`
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 操作白名单
    operateWhiteList(){
      let url = "api/gm/whitelistoper";
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.openId,
        operType:this.operType
      };
      console.log(params)
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp)
          if(resp.data.msg.Result === 0){
            this.$message({
              message:'操作成功',
              type:'success'
            })
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

