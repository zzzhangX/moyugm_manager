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
          <el-form-item label="排行榜类型：">
            <el-select v-model="value" placeholder="类型">
              <el-option
                v-for="item in rankType"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="rankingList">查看排行</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="rankList" v-show="flag">
          <h2>{{rankName}}排行榜</h2>
          <el-table :data="RankList" style="width: 100%">
            <el-table-column prop="Ranking" label="名次"></el-table-column>
            <el-table-column prop="RoleId" label="角色id"></el-table-column>
            <el-table-column prop="RoleName" label="角色名称"></el-table-column>
            <el-table-column prop="PraisedNum" label="被赞次数"></el-table-column>
            <el-table-column prop="Score" label="分数"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "rankingList",
  data() {
    return {
      roleForm: {
        openId: "FE1B6793470827BF3D1987CB58ECB522",
        roleId: "61A9000001",
        pageNo: 1
      },
      rankType: [
        { label: "战力", value: 1 },
        { label: "等级", value: 2 },
        { label: "威望", value: 3 },
        { label: "恶魔塔", value: 4 },
        { label: "军团", value: 5 },
        { label: "幻兽", value: 6 },
        { label: "装备评分", value: 7 }
      ],
      value: 1,
      rankName: "",
      RankList: [],
      flag: false
    };
  },
  methods: {
    exchange(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].RoleName = decodeURI(arr[i].RoleName); //转名字
      }
      return arr;
    },
    rankingList() {
      this.flag = true;
      let url = "api/query/ranklist";
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        type: Number(this.value),
        pageNo: this.roleForm.pageNo,
        cmdid: 4229
      };
      console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp);
          this.rankName = decodeURI(resp.data.msg.RankName);
          this.RankList = this.exchange(resp.data.msg.RankList);
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
.el-row:nth-of-type(1) {
  background: #eaecf3;
}
.el-row:nth-of-type(1) h1 {
  padding: 20px;
}
.el-form-item {
  margin: 5px;
}
.rankList {
  border: 1px solid red;
}
.rankList h2{
  text-align: center !important;
  padding: 10px
}
</style>