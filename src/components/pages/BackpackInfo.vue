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
    <el-table :data="bagList" style="width: 90%;" stripe>
      <el-table-column fixed prop="ItemId" label="物品id" align="center"></el-table-column>
      <el-table-column fixed prop="ItemName" label="物品名称" align="center"></el-table-column>
      <el-table-column prop="ItemNum" label="物品数量" align="center"></el-table-column>
      <el-table-column prop="IsBind" label="是否绑定" align="center"></el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd('formAddForm')">取消</el-button>
        <el-button type="primary" @click="sureAddItems('formAddForm')">发放</el-button>
      </div>
    </el-dialog>
    <!-- 删除物品 -->
    <el-dialog title="选择删除数量" :visible.sync="delItemsVisible" width="30%">
      <div class="chooseNum">
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="maxNum" label="描述文字"></el-input-number>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delItemsVisible = false">取消</el-button>
        <el-button type="primary" @click="delNumItems()">删除</el-button>
      </div>
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
      delItemsVisible: false,
      formAddForm: {
        roleId: "",
        itemId: ""
      },
      formDelForm: {
        itemId: "",
        itemNum: ""
      },
      search: "",
      num: 1,
      maxNum: 0,
      delItem: {
        itemNum: 1,
        itemId: "",
        itemName: ""
      },
      visible2: false
    };
  },
  created() {},
  methods: {
    //通过角色id加载背包列表
    searchBagList() {
      let url = "api/query/rolebag";
      let params = {
        partition: this.$store.state.serverId,
        openId: "FE1B6793470827BF3D1987CB58ECB522",
        roleId: this.roleId,
        pageNo: this.pageNo
      };
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
    //转换数据
    exchange(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].ItemName = decodeURI(arr[i].ItemName); //转名字
        arr[i].IsBind === 0
          ? (arr[i].IsBind = "未绑定")
          : (arr[i].IsBind = "绑定"); //今日是否登录
      }
      return arr;
    },
    //增加物品dialog显示
    addItems() {
      this.addItemsVisible = true;
    },
    //取消添加物品
    cancelAdd(formName) {
      this.addItemsVisible = false;
      this.resetForm();
    },
    //确认添加物品
    sureAddItems(formName) {
      console.log(this.formAddForm);
      this.resetForm();
      this.addItemsVisible = false;
    },
    //重置dialog
    resetForm() {
      this.formAddForm = {
        roleId: "",
        itemId: ""
      };
    },
    //删除按钮
    handleDelete(index, row) {
      // console.log(index, row);
      if (row.ItemNum === 1) {
        let params = {
          partition: this.$store.state.serverId,
          openId: "FE1B6793470827BF3D1987CB58ECB522",
          roleId: this.roleId,
          itemId: row.ItemId,
          itemNum: row.ItemNum
        };
        this.$confirm(`是否唯一一个${row.ItemName}`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log(params);
            this.removeItem(params);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.delItemsVisible = true;
        this.maxNum = row.ItemNum;
        this.delItem.itemId = row.ItemId;
        this.delItem.itemName = row.ItemName;
      }
    },
    //打开选择数量面板
    handleChange(value) {
      this.delItem.itemNum = value;
    },
    //删除操作
    delNumItems() {
      let params = {
        partition: this.$store.state.serverId,
        openId: "FE1B6793470827BF3D1987CB58ECB522",
        roleId: this.roleId,
        itemId: this.delItem.itemId,
        itemNum: this.delItem.itemNum
      };
      this.$confirm(
        `是否删除${this.delItem.itemNum}个${this.delItem.itemName}`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          console.log(params);
          this.removeItem(params);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      this.delItemsVisible = false;
    },
    //连接数据删除
    removeItem(params) {
      let url = "api/gm/removeitem";
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp);
          this.searchBagList();
        })
        .catch(err => {
          console.log(err);
        });
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
.el-input-number {
  line-height: 38px !important;
}
.chooseNum {
  padding: 5px 0;
  margin: 5px 0;
}
</style>

