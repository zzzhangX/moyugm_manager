<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input v-model="roleId" placeholder="请输入玩家进行查询"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="searchBagList">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="addItems">增加物品</el-button>
      </el-col>
    </el-row>
    <el-table :data="bagList" style="width: 100%" border>
      <el-table-column fixed prop="ItemId" label="物品id" align="center"></el-table-column>
      <el-table-column fixed prop="ItemName" label="物品名称" align="center"></el-table-column>
      <el-table-column prop="ItemNum" label="物品数量" align="center"></el-table-column>
      <el-table-column prop="IsBind" label="是否绑定" align="center"></el-table-column>
    </el-table>
    <!-- 增加物品弹框 -->
    <el-dialog title="增加物品" :visible.sync="addItemsVisible" width="30%">
      <el-form :inline="true" ref="formAddForm" :model="formAddForm" class="demo-form-inline">
        <el-form-item label="角色id">
          <el-input v-model="formAddForm.roleId" placeholder="角色id"></el-input>
        </el-form-item>
        <el-form-item label="选择物品">
          <el-select v-model="formAddForm.itemId" placeholder="选择物品">
            <el-option label="物品一" value="208140101"></el-option>
            <el-option label="物品二" value="208140102"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelAdd('formAddForm')">取消</el-button>
          <el-button type="primary" @click="sureAddItems('formAddForm')">发放</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "backpackInfo",
  data() {
    return {
      bagList: [],
      pageNo: 1,
      roleId: "61A9000001",
      addItemsVisible: false,
      formAddForm: {
        roleId: "",
        itemId: ""
      }
    };
  },
  created() {},
  methods: {
    searchBagList() {
      let url = "api/query/rolebag";
      let params = `{
        "partition":${this.$store.state.serverId},
        "openId":"FE1B6793470827BF3D1987CB58ECB522",
        "roleId":"${this.roleId}",
        "pageNo":${this.pageNo}
        }`;
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          let arr = resp.data.msg.BagList;
          this.bagList = this.exchange(arr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    exchange(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].ItemName = decodeURI(arr[i].ItemName); //转名字
        arr[i].IsBind === 0
          ? (arr[i].IsBind = "未绑定")
          : (arr[i].IsBind = "绑定"); //今日是否登录
      }
      return arr;
    },
    addItems() {
      this.addItemsVisible = true;
    },
    cancelAdd(formName) {
      this.addItemsVisible = false;
      this.resetForm()
    },
    sureAddItems(formName) {
      console.log(this.formAddForm);
      this.resetForm()
      this.addItemsVisible = false;
    },
    resetForm(){
      this.formAddForm={
        roleId: "",
        itemId: ""
      }
    }
  }
};
</script>
<style scoped>
* {
  line-height: normal !important;
}
.el-row {
  margin-bottom: 10px;
}
.el-button {
  line-height: 1 !important;
}
</style>

