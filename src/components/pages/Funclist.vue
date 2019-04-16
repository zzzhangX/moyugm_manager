<template>
  <div>
    <el-row class="choose">
      <el-col :span="4" :offset="1">
        <el-select style="width:100%" v-model="tablepartition" placeholder="请选择服务器" @change="funcList()">
          <el-option v-for="(item,index) in serverlist" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 游戏功能表格，显示后端传来的游戏功能信息 -->
    <el-row>
      <el-col :span="22" :offset="1">
        <el-table :data="funclistData" stripe style="width: 100%" height="610px">
          <!-- 服务器列，服务器信息，固定在左侧 -->
          <el-table-column fixed prop="partition" label="服务器" width="250px" :show-overflow-tooltip="true" align="center"></el-table-column>
          <!-- 游戏功能id列，游戏功能id信息 -->
          <el-table-column prop="FuncId" label="功能Id" width="250px" :show-overflow-tooltip="true" align="center"></el-table-column>
          <!-- 附件详情列，点击按钮查看对应行附件详情 -->
          <el-table-column prop="itemlist" label="功能开关" width="980px" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              <el-switch v-for="(items,indexs) in switchMsg[scope.$index]" :key="items.indexs" v-model="items.value" :inactive-text="items.text" :disabled="items.value" @change="queren(scope.$index,indexs)">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 分页，对游戏功能表格信息进行分页处理 -->
    <el-row>
      <el-col>
        <div class="block">
          <el-pagination  @current-change="handleCurrentChange" :current-page.sync="pageNo" layout="total, prev, pager, next, jumper" :page-count="this.TotalPageNo">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "ordinarymail",
  // 数据
  data() {
    return {
      switchMsg: [],
      funclistData: [],
      TotalPageNo: 0,
      PageNo: 1,
      FuncList_count: "",
      state: "",
      funcId: "",
      // 分页 每页信息条数
      pageList: [5, 10, 15, 20],
      // 每页页数
      perPage: 20,
      // 页码
      pageNo: 6,
      // 总页数
      totalPage: 0,
      // 表格服务器存储
      tablepartition: "",
      // 服务器列表数组
      serverlist: []
    };
  },
  methods: {
    queren(val, param) {
      this.$confirm("确认修改游戏功能状态？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.only(val, param);
        })
        .catch(() => {
          this.switchMsg[val][param].value = false;
        });
    },
    only(val, param) {
      if (param == 0) {
        if (this.switchMsg[val][param].value == true) {
          this.switchMsg[val][param + 1].value = false;
          this.switchMsg[val][param + 2].value = false;
          this.state = Number(this.switchMsg[val][param].state) ;
          this.funcId = this.funclistData[val].FuncId;
        }
      } else if (param == 1) {
        if (this.switchMsg[val][param].value == true) {
          this.switchMsg[val][param + 1].value = false;
          this.switchMsg[val][param - 1].value = false;
          this.state = Number(this.switchMsg[val][param].state);
          this.funcId = this.funclistData[val].FuncId;
        }
      } else if (param == 2) {
        if (this.switchMsg[val][param].value == true) {
          this.switchMsg[val][param - 1].value = false;
          this.switchMsg[val][param - 2].value = false;
          this.state = Number(this.switchMsg[val][param].state);
          this.funcId = this.funclistData[val].FuncId;
        }
      }
      this.funcControl();
    },
    // 页码改变函数
    handleCurrentChange(val) {
      // 页码改变
      this.PageNo = val;
      this.funcList();
    },
    //获取服务器列表
    serverList() {
      let url = "api/config/serverlist";
      let params = {};
      this.$axios({
        method: "get",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            // console.log(resp);
            this.serverlist = resp.data.msg;
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取游戏功能列表
    funcList() {
      this.switchMsg = [];
      let url = "api/gm/funclist";
      let params = {
        partition: this.tablepartition,
        pageNo: this.PageNo
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            this.funclistData = resp.data.msg.FuncList;
            this.TotalPageNo = resp.data.msg.TotalPageNo;
            this.FuncList_count = resp.data.msg.FuncList_count;
            for (let i = 0; i < this.funclistData.length; i++) {
              let setvalue1;
              let setvalue2;
              let setvalue3;
              if (this.funclistData[i].State == 1) {
                this.setvalue1 = true;
                this.setvalue2 = false;
                this.setvalue3 = false;
              } else if (this.funclistData[i].State == 2) {
                this.setvalue1 = false;
                this.setvalue2 = true;
                this.setvalue3 = false;
              } else if (this.funclistData[i].State == 3) {
                this.setvalue1 = false;
                this.setvalue2 = false;
                this.setvalue3 = true;
              }
              this.switchMsg.push([
                { text: "正常", state: "1", value: this.setvalue1 },
                { text: "置灰", state: "2", value: this.setvalue2 },
                { text: "隐藏", state: "3", value: this.setvalue3 }
              ]);
              this.$set(this.funclistData[i], "partition", this.tablepartition);
            }
            console.log(this.funclistData);
            // console.log(this.TotalPageNo);
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //游戏功能状态修改
    funcControl() {
      console.log(typeof(this.tablepartition))
      console.log(typeof(this.funcId))
      console.log(typeof(this.state))
      let url = "api/gm/setfuncstate";
      let params = {
        partition: this.tablepartition,
        funcId: this.funcId,
        state: this.state
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            console.log(resp.data);
            // console.log(params);
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.funcList();
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted: function() {
    // 加载服务器列表
    this.serverList();
    // this.funcControl()
    // this.funcList();
  }
};
</script>
<style>
/* 顶部表格间隔 */
.el-table {
  margin-top: 1%;
}
/* 表格选择框顶部间隔 */
.choose {
  margin-top: 2%;
}
/* 选择框宽度 */
.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 100%;
}
/* 详情页字体大小 */
.dialog {
  font-size: 17px;
}
/* 详情内部组件间隔 */
.dialogrow,
.dialogbtn {
  margin-bottom: 20px;
}
/* 分页顶部间隔 */
.block {
  margin-top: 30px;
}
.el-switch__label * {
  color: #409eff !important;
}
.el-switch {
  margin: 0 10%; 
}
</style>