<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="玩家id：">
            <el-input v-model="openId" placeholder="请输入玩家进行查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchRoleInfo">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table :data="roleListArr" style="width: 100%;margin:auto " fit>
      <el-table-column fixed prop="RoleId" label="角色ID" width="110" align="center"></el-table-column>
      <el-table-column fixed prop="RoleName" label="角色名" width="100" align="center"></el-table-column>
      <el-table-column prop="RoleSex" label="性别" width="100" align="center"></el-table-column>
      <el-table-column prop="Job" label="职业" width="100" align="center"></el-table-column>
      <el-table-column prop="Level" label="等级" width="100" align="center"></el-table-column>
      <el-table-column prop="TotalFight" label="战斗力" width="100" align="center"></el-table-column>
      <el-table-column prop="AttributeGrade" label="属性评分" width="100" align="center"></el-table-column>
      <el-table-column prop="Prestige" label="威望" width="100" align="center"></el-table-column>
      <el-table-column prop="Peerage" label="爵位" width="100" align="center"></el-table-column>
      <el-table-column prop="Legion" label="所属军团" width="100" align="center"></el-table-column>
      <el-table-column prop="CreateTime" label="角色创建时间" width="180" align="center"></el-table-column>
      <el-table-column prop="LastLoginTime" label="最后登录时间" width="180" align="center"></el-table-column>
      <el-table-column prop="LastLogoutTime" label="最后登出时间" width="180" align="center"></el-table-column>
      <el-table-column prop="MagicStone" label="当前魔石" width="100" align="center"></el-table-column>
      <el-table-column prop="BoundMagicStone" label="当前绑定魔石" width="110" align="center"></el-table-column>
      <el-table-column prop="GoldCoin" label="当前金币" width="100" align="center"></el-table-column>
      <el-table-column prop="WarExploit" label="战勋" width="100" align="center"></el-table-column>
      <el-table-column prop="DevilCoin" label="恶魔币" width="100" align="center"></el-table-column>
      <el-table-column prop="IsLogin" label="当日是否登录" width="110" align="center"></el-table-column>
      <el-table-column fixed="right" width="500" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleSearch(scope.$index, scope.row,1)">VIP</el-button>
          <el-button size="mini" type="danger" @click="handleSearch(scope.$index, scope.row,2)">军团</el-button>
          <el-button size="mini" type="danger" @click="handleSearch(scope.$index, scope.row,3)">属性</el-button>
          <el-button size="mini" type="danger" @click="handleSearch(scope.$index, scope.row,4)">名人堂</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleSearch(scope.$index, scope.row,5)"
          >被禁止排行</el-button>
          <el-button size="mini" type="danger" @click="rolevalue(scope.$index, scope.row)">昵称修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- VIP信息 -->
    <el-dialog title="VIP信息" :visible.sync="VIP_Visible" width="20%">
      <div>
        <p>
          <span>等级：</span>
          <span>{{VIPform.Level}}</span>
        </p>
        <p>
          <span>经验：</span>
          <span>{{VIPform.Exp}}</span>
        </p>
        <p>
          <span>结束时间：</span>
          <span>{{VIPform.EndTime}}</span>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="VIP_Visible = false">取 消</el-button>
        <el-button type="primary" @click="VIP_Visible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 军团信息 -->
    <el-dialog title="军团信息" :visible.sync="legion_Visible" width="20%">
      <div>{{legionInfo}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="legion_Visible = false">取 消</el-button>
        <el-button type="primary" @click="legion_Visible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色属性 -->
    <el-dialog title="角色属性" :visible.sync="roleAttr_Visible" width="20%">
      <div>{{legionInfo}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleAttr_Visible = false">取 消</el-button>
        <el-button type="primary" @click="roleAttr_Visible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 名人堂 -->
    <el-dialog title="名人堂信息" :visible.sync="famehallinfo_Visible" width="20%">
      <div>
        <p>
          <strong>当前排名：</strong>
          <span>{{famehallinfo.Rank}}</span>
        </p>
        <p>
          <strong>今日完成挑战次数：</strong>
          <span>{{famehallinfo.ChallengeTimes}}</span>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="famehallinfo_Visible = false">取 消</el-button>
        <el-button type="primary" @click="famehallinfo_Visible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 被禁止参加排行榜 -->
    <el-dialog title="被禁止参加排行榜" :visible.sync="banrankinfo_Visible" width="20%">
      <div v-show="Ban">此玩家未被禁止参加排行榜</div>
      <div v-show="noBan">禁止待完善</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="banrankinfo_Visible = false">取 消</el-button>
        <el-button type="primary" @click="banrankinfo_Visible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改昵称 -->
    <el-dialog title="昵称修改" :visible.sync="change_Visible" width="25%">
      <el-form :model="roleForm" ref="roleForm">
        <el-form-item label="玩家id" label-width="100">
          <el-input disabled v-model="roleForm.openId" auto-complete="off" width="10"></el-input>
        </el-form-item>
        <el-form-item label="角色id" label-width="100">
          <el-input disabled v-model="roleForm.roleId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色原昵称" label-width="100">
          <el-input disabled v-model="roleForm.RoleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="modifyRoleName" label="角色新昵称" label-width="100">
          <el-input v-model="roleForm.modifyRoleName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="send('roleForm')">确 定</el-button>
        <el-button @click="resetForm()">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import search from '../common/Search'
export default {
  name: "PlayerRoleInfo",
  data() {
    return {
      openId: "FE1B6793470827BF3D1987CB58ECB522",
      roleListArr: [],
      VIP_Visible: false,
      legion_Visible: false,
      roleAttr_Visible: false,
      famehallinfo_Visible: false,
      banrankinfo_Visible: false,
      change_Visible: false,
      VIPform: {
        Level: "",
        Exp: "",
        EndTime: ""
      },
      famehallinfo: {
        ChallengeTimes: "",
        Rank: ""
      },
      labelPosition: "right",
      legionInfo: "",
      pageNo: 1,
      Ban: false,
      noBan: false,
      roleForm: {
        modifyRoleName: "",
        openId: "",
        roleId: "",
        RoleName: ""
      }
    };
  },
  // components:{
  //   search:search
  // },
  created() {},
  methods: {
    resetForm() {
      this.roleForm.modifyRoleName = "";
    },
    rolevalue(param1, param2) {
      this.roleForm.openId = this.openId;
      this.roleForm.roleId = param2.RoleId;
      this.roleForm.RoleName = param2.RoleName;
      this.change_Visible = true;
      console.log(param2);
    },
    send(formName) {
      console.log(this.roleForm);
      this.$confirm("确认修改昵称？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.changerolename();
            } else {
              return false;
            }
          });
        })
        .catch(() => {});
    },
    changerolename() {
      let url = "api/gm/changerolename";
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        modifyRoleName: decodeURI(this.roleForm.modifyRoleName)
      };
      this.$axios({
        method: "post", //连接方式
        url: url, //接口地址
        data: params //参数
      })
        //回调函数
        .then(resp => {
          if (resp.data.code == 200) {
            console.log(resp.data);
            this.change_Visible = false;
            this.resetForm();
            this.searchRoleInfo();
            // 提示成功消息
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchRoleInfo() {
      if (this.openId === "") {
        this.$message({
          showClose: true,
          message: "请输入玩家账号",
          type: "warning"
        });
      } else {
        let url = "api/query/userinfo";
        let params = {
          partition: Number(this.$store.state.serverId),
          openId: this.openId
        };
        console.log(params)
        this.$axios({
          method: "post",
          url: url,
          data: params
        })
          .then(resp => {
            console.log(resp);
            let arr = resp.data.msg.UserList;
            this.roleListArr = this.exchange(arr);
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "请检查是否输入正确",
              type: "error"
            });
          });
      }
    },
    exchange(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].RoleName = decodeURI(arr[i].RoleName); //转名字
        arr[i].RoleSex == 0 ? (arr[i].RoleSex = "男") : (arr[i].RoleSex = "女"); //转性别
        arr[i].CreateTime = this.exchangeDate(arr[i].CreateTime);
        arr[i].LastLoginTime = this.exchangeDate(arr[i].LastLoginTime);
        arr[i].LastLogoutTime = this.exchangeDate(arr[i].LastLogoutTime); //转日期
        if (arr[i].Job == 1) {
          arr[i].Job = "战士";
        } else if (arr[i].Job == 2) {
          arr[i].Job = "法师";
        } else {
          arr[i].Job = "血族";
        } //转职业
        arr[i].IsLogin === 0
          ? (arr[i].IsLogin = "未登录")
          : (arr[i].IsLogin = "登录"); //今日是否登录
      }
      return arr;
    },
    //角色VIP信息,军团信息,属性,名人堂
    handleSearch(index, row, item) {
      let url;
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.openId,
        roleId: row.RoleId
      };
      switch (item) {
        case 1:
          (url = "api/query/vipinfo"), (this.VIP_Visible = true);
          break;
        case 2:
          (url = "api/query/groupinfo"), (this.legion_Visible = true);
          break;
        case 3:
          (url = "api/query/roleinfo"), (this.roleAttr_Visible = true);
          break;
        case 4:
          (url = "api/query/famehallinfo"), (this.famehallinfo_Visible = true);
          break;
        case 5:
          (url = "api/query/banrankinfo"), (this.banrankinfo_Visible = true);
          params.pageNo = this.pageNo;
          break;
      }
      // console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          switch (item) {
            case 1:
              this.VIPform = resp.data.msg;
              break;
            case 2:
              // console.log(resp);
              this.legionInfo = resp.data.msg;
              if (this.legionInfo === "") {
                this.legionInfo = "暂无军团信息";
              } else {
                this.legionInfo = "待完善。。。";
              }
              break;
            case 3:
              console.log(resp);
              break;
            case 4:
              this.famehallinfo = resp.data.msg;
              break;
            case 5:
              console.log(resp);
              if (resp.data.msg.BanRankInfo_count === 0) {
                this.Ban = true;
                this.noBan = false;
              } else {
                this.Ban = false;
                this.noBan = true;
              }
              break;
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
* {
  line-height: 30px !important;
}
.el-button {
  line-height: 1 !important;
}
.el-table {
  margin-top: 1%;
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
.el-input-number {
  line-height: 38px !important;
}
</style>
