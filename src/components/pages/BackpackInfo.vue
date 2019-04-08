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
          <el-form-item>
            <el-popover
              placement="top-end"
              title="选择状态"
              width="150"
              trigger="click"
              v-model="visible"
            >
              <el-select v-model="status" placeholder="请选择">
                <el-option label="背包" value="1"></el-option>
                <el-option label="穿戴" value="2"></el-option>
              </el-select>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="searchList(1)">确定</el-button>
              </div>
              <el-button slot="reference" type="primary">道具列表</el-button>
            </el-popover>
            <el-button type="primary" @click="searchList(2)">背包信息</el-button>
            <el-button type="primary" @click="searchList(3)">装备信息</el-button>
            <el-button type="primary" @click="searchList(4)">法宝信息</el-button>
            <el-button type="primary" @click="searchList(5)">坐骑信息</el-button>
            <el-button type="primary" @click="searchList(6)">时装信息</el-button>
            <el-button type="primary" @click="searchList(7)">称号信息</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 时装信息 -->
    <el-table v-show="isShow.dressinfo" :data="list.dressinfo" style="width: 95%;" stripe>
      <el-table-column prop="Id" label="时装id" align="center"></el-table-column>
      <el-table-column prop="Name" label="时装名称" align="center"></el-table-column>
      <el-table-column prop="IsWearing" label="是否穿戴" align="center"></el-table-column>
      <el-table-column prop="ExpiryTime" label="过期时间" align="center"></el-table-column>
      <el-table-column align="center">
        <!-- <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>-->
      </el-table-column>
    </el-table>
    <!-- 坐骑列表 -->
    <el-table v-show="isShow.appellationinfo" :data="list.appellationinfo" style="width: 95%;">
      <el-table-column prop="Id" label="称号id" align="center"></el-table-column>
      <el-table-column prop="Name" label="称号名称" align="center"></el-table-column>
      <el-table-column prop="IsWearing" label="是否穿戴" align="center"></el-table-column>
      <el-table-column prop="ExpiryTime" label="过期时间" align="center"></el-table-column>
      <el-table-column align="center">
        <!-- <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>-->
      </el-table-column>
    </el-table>
    <!-- 坐骑列表 -->
    <el-table v-show="isShow.mountinfo" :data="list.mountinfo" style="width: 95%;" stripe>
      <el-table-column prop="Id" label="坐骑id" align="center"></el-table-column>
      <el-table-column prop="Name" label="坐骑名称" align="center"></el-table-column>
      <el-table-column prop="IsWearing" label="是否穿戴" align="center"></el-table-column>
      <el-table-column prop="ExpiryTime" label="过期时间" align="center"></el-table-column>
      <el-table-column align="center">
        <!-- <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>-->
      </el-table-column>
    </el-table>
    <!-- 法宝信息 -->
    <div v-show="isShow.talismaninfo">
      <div style="text-align:left">
        <h5>等级：{{Level}},星级：{{Star}}，威能：{{Waillant}}</h5>
        <h4>外观：</h4>
      </div>
      <el-table :data="list.talismaninfo" style="width: 95%;" stripe>
        <el-table-column prop="Name" label="部位" align="center"></el-table-column>
        <el-table-column prop="AStar" label="装备id" align="center"></el-table-column>
        <el-table-column prop="IsActive" label="名称" align="center"></el-table-column>
        <el-table-column prop="IsWearing" label="品质" align="center"></el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleTalisman(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 装备列表 -->
    <el-table v-show="isShow.equipment" :data="list.equipment" style="width: 95%;" stripe>
      <el-table-column prop="Part" label="部位" align="center"></el-table-column>
      <el-table-column prop="EquipId" label="装备id" align="center"></el-table-column>
      <el-table-column prop="Name" label="名称" align="center"></el-table-column>
      <el-table-column prop="Quality" label="品质" align="center"></el-table-column>
      <el-table-column prop="Star" label="星级" align="center"></el-table-column>
      <el-table-column prop="Score" label="评分" align="center"></el-table-column>
      <el-table-column prop="AppendLv" label="追加等级" align="center"></el-table-column>
      <el-table-column prop="GemHoles" label="宝石孔" align="center"></el-table-column>
      <el-table-column prop="SuitId" label="套装id" align="center"></el-table-column>
      <el-table-column prop="SuitName" label="套装名称" align="center"></el-table-column>
      <el-table-column prop="SuitNum" label="套装件数" align="center"></el-table-column>
      <el-table-column prop="Phasic" label="相性" align="center"></el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="changeequipattr(scope.$index, scope.row)">设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 道具列表 -->
    <el-table v-show="isShow.itemlist" :data="list.itemlist" style="width: 90%;" stripe>
      <el-table-column prop="ItemId" label="道具id" align="center"></el-table-column>
      <el-table-column prop="ItemNum" label="当前堆叠数量" align="center"></el-table-column>
      <el-table-column prop="IsBind" label="绑定" align="center"></el-table-column>
      <el-table-column prop="FailureTime" label="失效时间" align="center"></el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,1)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 背包表格 -->
    <el-table v-show="isShow.bagList" :data="list.bagList" style="width: 90%;" stripe>
      <el-table-column fixed prop="ItemId" label="物品id" align="center"></el-table-column>
      <el-table-column fixed prop="ItemName" label="物品名称" align="center"></el-table-column>
      <el-table-column prop="ItemNum" label="物品数量" align="center"></el-table-column>
      <el-table-column prop="IsBind" label="是否绑定" align="center"></el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,2)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <!-- 设置装备属性 -->
    <el-dialog title="设置装备属性" :visible.sync="equipmentVisible" width="20%">
      <div class="chooseNum">
        <el-form >
          <el-form-item label="类型">
            <el-select v-model="equipType" placeholder="请选择">
              <el-option label="追加等级" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值">
            <el-input-number v-model="equipValue" @change="equipChange" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="equipmentVisible = false">取消</el-button>
        <el-button type="primary" @click="equipmentChange()">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "backpackInfo",
  data() {
    return {
      part: 0,
      equipValue: 0,
      equipType: "1",
      equipmentVisible: false,
      isShow: {
        bagList: false,
        itemlist: false,
        equipment: false,
        talismaninfo: false,
        mountinfo: false,
        dressinfo: false,
        appellationinfo: false
      },
      list: {
        itemlist: [],
        bagList: [],
        equipment: [],
        talismaninfo: [],
        mountinfo: [],
        dressinfo: [],
        appellationinfo: []
      },
      Level: 0,
      Star: 0,
      Waillant: 0,
      pageNo: 1,
      addItemsVisible: false,
      delItemsVisible: false,
      roleForm: {
        openId: "FE1B6793470827BF3D1987CB58ECB522",
        roleId: "61A9000001"
      },
      status: "1",
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
      visible: false,
      k: 0
    };
  },
  created() {},
  methods: {
    // 加载列表
    searchList(index) {
      let url;
      let params = {
        partition: this.$store.state.serverId,
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId
      };
      switch (index) {
        case 1:
          url = "api/query/itemlist";
          params.status = Number(this.status);
          break;
        case 2:
          url = "api/query/rolebag";
          params.pageNo = this.pageNo;
          break;
        case 3:
          url = "api/query/equipinfo";
          break;
        case 4:
          url = "api/query/talismaninfo";
          break;
        case 5:
          url = "api/query/mountinfo";
          break;
        case 6:
          url = "api/query/dressinfo";
          break;
        case 7:
          url = "api/query/appellationinfo";
          break;
      }
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          switch (index) {
            case 1:
              this.list.itemlist = this.exchange(resp.data.msg.ItemsList);
              this.isShow = {
                itemlist: true,
                bagList: false,
                equipment: false,
                talismaninfo: false,
                mountinfo: false,
                dressinfo: false,
                appellationinfo: false
              };
              this.visible = false;
              break;
            case 2:
              let arr = resp.data.msg.BagList;
              this.list.bagList = this.exchange(arr);
              this.isShow = {
                itemlist: false,
                bagList: true,
                equipment: false,
                talismaninfo: false,
                mountinfo: false,
                dressinfo: false,
                appellationinfo: false
              };
              break;
            case 3:
              this.list.equipment = this.exchange(resp.data.msg.EquipList);
              this.isShow = {
                itemlist: false,
                bagList: false,
                equipment: true,
                talismaninfo: false,
                mountinfo: false,
                dressinfo: false,
                appellationinfo: false
              };
              break;
            case 4:
              this.list.equipment = resp.data.msg.AppearanceList;
              this.Level = resp.data.msg.Level;
              this.Star = resp.data.msg.Star;
              this.Waillant = decodeURI(resp.data.msg.Waillant);
              this.isShow = {
                itemlist: false,
                bagList: false,
                equipment: false,
                talismaninfo: true,
                mountinfo: false,
                dressinfo: false,
                appellationinfo: false
              };
              break;
            case 5:
              this.list.mountinfo = this.exchange(resp.data.msg.MountList);
              this.isShow = {
                itemlist: false,
                bagList: false,
                equipment: false,
                talismaninfo: false,
                mountinfo: true,
                dressinfo: false,
                appellationinfo: false
              };
              break;
            case 6:
              console.log(resp);
              this.list.dressinfo = this.exchange(resp.data.msg.DressList);
              this.isShow = {
                itemlist: false,
                bagList: false,
                equipment: false,
                talismaninfo: false,
                mountinfo: false,
                dressinfo: true,
                appellationinfo: false
              };
              break;
            case 7:
              console.log(resp);
              this.list.appellationinfo = this.exchange(
                resp.data.msg.AppellationList
              );
              this.isShow = {
                itemlist: false,
                bagList: false,
                equipment: false,
                talismaninfo: false,
                mountinfo: false,
                dressinfo: false,
                appellationinfo: true
              };
              break;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //转换数据
    exchange(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ItemName) {
          arr[i].ItemName = decodeURI(arr[i].ItemName); //转名字
        }
        if (arr[i].IsBind !== undefined) {
          arr[i].IsBind === 0
            ? (arr[i].IsBind = "未绑定")
            : (arr[i].IsBind = "绑定"); //今日是否登录
        }
        if (arr[i].Part) {
          arr[i].Part = decodeURI(arr[i].Part); //转名字
        }
        if (arr[i].Name) {
          arr[i].Name = decodeURI(arr[i].Name); //转名字
        }
        if (arr[i].GemHoles) {
          arr[i].GemHoles = decodeURI(arr[i].GemHoles); //转名字
        }
        if (arr[i].Phasic) {
          arr[i].Phasic = decodeURI(arr[i].Phasic); //转名字
        }
        if (arr[i].IsWearing !== undefined) {
          arr[i].IsWearing === 0
            ? (arr[i].IsWearing = "不是")
            : (arr[i].IsWearing = "是"); //是否穿戴
        }
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
    handleDelete(index, row, k) {
      this.k = k;
      // console.log(index, row);
      if (row.ItemNum === 1) {
        let params = {
          partition: this.$store.state.serverId,
          openId: "FE1B6793470827BF3D1987CB58ECB522",
          roleId: this.roleId,
          itemId: row.ItemId,
          itemNum: row.ItemNum
        };
        this.$confirm(`是否删除唯一一个${row.ItemId}`, "提示", {
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
    // 打开修改装备面板
    equipChange(value) {
      this.equipValue = value;
    },
    //删除操作
    delNumItems() {
      let params = {
        partition: this.$store.state.serverId,
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
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
          // console.log(resp);
          this.searchList(this.k);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //设置装备属性按钮
    changeequipattr(index, row) {
      this.k = 3;
      this.equipmentVisible = true;
      // 1头盔2护肩3衣服4护腕5鞋子6武器7项链8手镯9耳环10戒指
      switch (row.Part) {
        case "头盔":
          this.part = 1;
          break;
        case "护肩":
          this.part = 2;
          break;
        case "衣服":
          this.part = 3;
          break;
        case "护腕":
          this.part = 4;
          break;
        case "鞋子":
          this.part = 5;
          break;
        case "武器":
          this.part = 6;
          break;
        case "项链":
          this.part = 7;
          break;
        case "手镯":
          this.part = 8;
          break;
        case "耳环":
          this.part = 9;
          break;
        case "戒指":
          this.part = 10;
          break;
      }
    },
    equipmentChange() {
      let url = "api/gm/changeequipattr";
      let params = {
        partition: this.$store.state.serverId,
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        part: this.part,
        type: Number(this.equipType),
        value: Number(this.equipValue),
        cmdid: 4257
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp);
          if (resp.data.msg.Result === 0) {
            this.$message({
              type: "success",
              message: "设置成功!"
            });
            this.searchList(this.k);
            this.equipmentVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 设置法宝属性
    handleTalisman(){
      
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
</style>

