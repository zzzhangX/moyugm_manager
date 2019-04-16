<template>
  <div class="header">
    <div class="logo">
      <span>{{ $t("home.headerTitile") }}</span>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 选择服务器 -->
        <div class="userInfo">
          <el-dropdown size="mini" class="server-id" @command="changeServer">
            <span class="el-dropdown-link">
              <i class="fa fa-user"></i>
              {{value}}
              <i class="el-icon-arrow-down el-icon--rights"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in serverlist"
                :key="index"
                :command="item.id"
              >{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 语言栏 -->
        <ChooseLang/>
        <!-- 用户名下拉菜单 -->
        <div class="userInfo">
          <el-dropdown size="mini" class="user-name" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="fa fa-user"></i>
              {{username}}
              <i class="el-icon-arrow-down el-icon--rights"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changePwd">{{ $t("home.changePwd") }}</el-dropdown-item>
              <el-dropdown-item divided command="logout">{{ $t("home.logout") }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 修改密码弹框 -->
    <el-dialog :title="$t('home.changePwd')" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" status-icon ref="form">
        <el-form-item :label="$t('home.oldPwd')" :label-width="formLabelWidth" prop="oldPwd">
          <el-input v-model="form.oldPwd" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.newPwd')" :label-width="formLabelWidth" prop="newPwd">
          <el-input v-model="form.newPwd" auto-complete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelChange('form')">{{ $t("home.cancel") }}</el-button>
        <el-button type="primary" @click="submitForm">{{ $t("home.sure") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ChooseLang from "./ChooseLang";
export default {
  data() {
    return {
      serverlist: [
        {
          name:'雷鸣大陆',
          id:25001
        }
      ],
      value: "",
      name: "unsigned",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        oldPwd: "",
        newPwd: ""
      }
    };
  },
  components: {
    ChooseLang: ChooseLang
  },
  computed: {
    username() {
      let username = localStorage.getItem("username");
      return username ? username : this.name;
    },
    rules() {
      return {
        oldPwd: [
          {
            required: true,
            message: this.$t("home.rules.nullPwd"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: this.$t("home.rules.wrongPwd"),
            trigger: "blur"
          }
        ],
        newPwd: [
          {
            required: true,
            message: this.$t("home.rules.nullPwd"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: this.$t("home.rules.wrongPwd"),
            trigger: "blur"
          }
        ]
      };
    }
  },
  created() {
    this.chooseServer();
    this.serverList();
  },
  methods: {
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
            // console.log(this.serverlist);
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command === "logout") {
        this.$confirm(
          this.$t("home.comfirm.title"),
          this.$t("home.comfirm.msg"),
          {
            confirmButtonText: this.$t("home.sure"),
            cancelButtonText: this.$t("home.cancel"),
            type: "warning"
          }
        )
          .then(() => {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            this.$router.push("/");
          })
          .catch(() => {});
      } else {
        this.dialogFormVisible = true;
      }
    },
    //选择服务器事件
    changeServer(command) {
      this.$store.commit("changeServe", command);
      this.chooseServer();
    },
    chooseServer() {
      // console.log(this.serverlist);
      // console.log(this.$store.state.serverId)
      for (var i = 0; i < this.serverlist.length; i++) {
        // console.log(this.serverlist[i].id)
        // console.log(this.serverlist[i].name)
        if (this.$store.state.serverId === this.serverlist[i].id) {
          this.value = this.serverlist[i].name;
          // console.log(this.serverlist[i].name)
        }
      }
    },
    //取消修改密码
    cancelChange(form) {
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    },
    //修改密码
    submitForm() {
      // this.$refs.form.validate( valid => {
      //     if (valid) {
      //         this.dialogFormVisible = false;
      //         this.$axios.post('/api/pwd', {
      //             oldPwd: this.form.oldPwd,
      //             newPwd: this.form.newPwd
      //         }).then( (response) => {
      //             if (response.data.code === 0) {
      //                 localStorage.removeItem('username');
      //                 localStorage.removeItem('token');
      //                 this.$router.push('/login');
      //             } else {
      //                 this.form.newPwd = '';
      //                 this.form.oldPwd = '';
      //                 this.$message.warning(response.data.msg);
      //             }
      //         }).catch( (error) => {
      //             if(error.response){
      //                 console.log(error.response.status + error.response.statusText);
      //             } else {
      //                 console.log('The request was made but no response was received :' + error.request);
      //             }
      //         });
      //     } else {
      //         return false;
      //     }
      // });
    }
  }
};
</script>
<style scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  background-color: rgb(5, 18, 31);
  color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 1px;
  user-select: none;
}
.header .logo {
  text-align: left;
  line-height: 60px;
  padding-left: 1%;
}
.header-user-con {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.userInfo {
  margin: 0 15px;
}
.el-dropdown-link {
  font-weight: bold;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 15px;
}
.server-id {
  margin-right: 15px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
