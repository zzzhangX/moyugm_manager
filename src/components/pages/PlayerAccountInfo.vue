<template>
  <div class="PlayerAccountInfo">
    <el-row :gutter="20">
      <h1>获取玩家号</h1>
      <el-col :span="4">
        <el-input v-model="roleName" placeholder="请输入角色昵称" clearable></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="roleId" placeholder="请输入角色ID" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="searchRoleId">查询</el-button>
      </el-col>
      <el-col :span="6" v-show="isShow">
        <el-input placeholder="请输入内容" :disabled="true" v-model="openId" clearable></el-input>
      </el-col>
      <el-col :span="1" v-show="isShow">
        <el-button
          type="primary"
          v-clipboard:copy="openId"
          v-clipboard:success="copyOpenId"
          v-clipboard:error="onError"
        >复制</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <h1>账号操作</h1>
      <el-col :span="4">
        <el-input v-model="kickuser.openId" placeholder="请输入玩家id" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="handleKickuser">踢下线</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="forbidloginVisible=true">封号</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="permitLogin(1)">解除封号</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="forbidChatVisible=true">禁言</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="permitLogin(2)">解除禁言</el-button>
      </el-col>
    </el-row>
    <!-- 填写封号、禁言信息 -->
    <el-dialog title="填写封号信息" :visible.sync="forbidloginVisible" width="30%">
      <el-form :model="forbitInfo" label-width="140px">
        <el-form-item label="封号时间（秒）：">
          <el-input-number
            v-model="forbitInfo.banTime"
            @change="banTime"
            :min="0"
            style="width: 100%;"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="封号原因：">
          <el-input type="textarea" v-model="forbitInfo.msgContent" style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="makeCancel">取 消</el-button>
        <el-button type="primary" @click="makeSure(1)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="填写禁言信息" :visible.sync="forbidChatVisible" width="30%">
      <el-form :model="forbitInfo" label-width="140px">
        <el-form-item label="禁言时间（秒）：">
          <el-input-number
            v-model="forbitInfo.banTime"
            @change="banTime"
            :min="0"
            style="width: 100%;"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="禁言原因：">
          <el-input type="textarea" v-model="forbitInfo.msgContent" style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="makeCancel">取 消</el-button>
        <el-button type="primary" @click="makeSure(2)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "PlayerAccountInfo",
  data() {
    return {
      forbidChatVisible: false,
      forbidloginVisible: false,
      forbitInfo: {
        banTime: 0,
        msgContent: ""
      },
      roleName: "",
      roleId: "",
      openId: "",
      isShow: false,
      kickuser: {
        openId: "FE1B6793470827BF3D1987CB58ECB522"
      }
    };
  },
  created() {},
  methods: {
    makeCancel() {
      this.forbitInfo = {
        banTime: 0,
        msgContent: ""
      };
      this.forbidloginVisible = false;
      this.forbidChatVisible = false;
    },
    banTime(value) {
      this.forbitInfo.banTime = value;
    },
    // 确认封号，禁言
    makeSure(index) {
      console.log(this.forbitInfo);
      let url;
      let msg = "";
      if (index === 1) {
        url = "api/gm/forbidlogin";
        msg = `封号成功,${this.forbitInfo.banTime}秒`;
      } else if (index === 2) {
        url = "api/gm/forbidchat";
        msg = `禁言成功,${this.forbitInfo.banTime}秒`;
      }
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.kickuser.openId,
        banTime: Number(this.forbitInfo.banTime),
        msgContent: this.forbitInfo.msgContent
      };
      // console.log(params,url);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$message({
              showClose: true,
              message: msg,
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.makeCancel();
    },
    // 解除封号，禁言
    permitLogin(index) {
      let url;
      let msg='';
      if(index === 1){
        url = "api/gm/permitlogin";
        msg = '解除封号成功'
      }else if(index === 2){
        url = "api/gm/permitchat";
        msg = '解除禁言成功'
      }
      let params = {
        partition: Number(this.$store.state.serverId),
        openId: this.kickuser.openId
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp);
          if (resp.data.code === 200) {
            this.$message({
              showClose: true,
              message: msg,
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //连接数据
    searchConnect(params) {
      let url = "api/query/openid";
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          this.openId = resp.data.msg.OpenId;
          if (this.openId !== undefined) {
            this.isShow = true;
          } else {
            this.$message({
              showClose: true,
              message: "检查是否输入正确",
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchRoleId() {
      let params;
      if (this.roleName === "" && this.roleId !== "") {
        params = `{
        "partition":${this.$store.state.serverId},
        "roleId":"${this.roleId}"
        }`;
        this.searchConnect(params);
      } else if (this.roleId === "" && this.roleName !== "") {
        params = `{
        "partition":${this.$store.state.serverId},
        "roleName":"${this.roleName}"
        }`;
        this.searchConnect(params);
      } else if (this.roleId !== "" && this.roleName !== "") {
        params = `{
        "partition":${this.$store.state.serverId},
        "roleName":"${this.roleName}",
        "roleId":"${this.roleId}"
        }`;
        this.searchConnect(params);
      } else {
        this.$message({
          showClose: true,
          message: "请输入昵称或id",
          type: "warning"
        });
      }
    },
    copyOpenId(e) {
      this.$message({
        showClose: true,
        message: "已复制",
        type: "success"
      });
    },
    onError(e) {
      this.$message({
        showClose: true,
        message: "复制失败，请重试",
        type: "error"
      });
    },
    // 踢下线
    handleKickuser() {
      let url = "api/gm/kickuser";
      let params = {
        partition: this.$store.state.serverId,
        openId: this.kickuser.openId
      };
      console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.msg.Result === 0) {
            this.$message({
              showClose: true,
              message: "踢下线成功",
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
* {
  line-height: normal !important;
}
.el-button {
  line-height: 1 !important;
}
.el-row {
  height: 200px;
  padding: 20px;
  border-radius: 20px;
}
.el-row {
  background: #eaecf3;
  margin-top: 5px;
}
.el-row h1 {
  padding: 20px;
}
.el-input-number {
  line-height: 38px !important;
}
</style>


