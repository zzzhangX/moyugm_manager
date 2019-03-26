<template>
  <div class="header">
    <div class="logo">
        <span>{{ $t("home.headerTitile") }}</span>     
        </div>
    <div class="header-right">
      <div class="header-user-con">
        <ChooseLang/>
        <!-- 用户名下拉菜单 -->
        <div>
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
            <el-button @click="dialogFormVisible = false">{{ $t("home.cancel") }}</el-button>
            <el-button type="primary">{{ $t("home.sure") }}</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import ChooseLang from "./ChooseLang";
export default {
  data() {
    return {
      name: "unsigned",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        oldPwd: "",
        newPwd: ""
      },
      rules: {
        oldPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
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
    }
  },

  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command === "logout") {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this.$router.push("/");
      } else {
        this.dialogFormVisible = true;
      }
    }
    // submitForm () {
    //     this.$refs.form.validate( valid => {
    //         if (valid) {
    //             this.dialogFormVisible = false;
    //             this.$axios.post('/api/pwd', {
    //                 oldPwd: this.form.oldPwd,
    //                 newPwd: this.form.newPwd
    //             }).then( (response) => {
    //                 if (response.data.code === 0) {
    //                     localStorage.removeItem('username');
    //                     localStorage.removeItem('token');
    //                     this.$router.push('/login');
    //                 } else {
    //                     this.form.newPwd = '';
    //                     this.form.oldPwd = '';
    //                     this.$message.warning(response.data.msg);
    //                 }
    //             }).catch( (error) => {
    //                 if(error.response){
    //                     console.log(error.response.status + error.response.statusText);
    //                 } else {
    //                     console.log('The request was made but no response was received :' + error.request);
    //                 }
    //             });
    //         } else {
    //             return false;
    //         }
    //     });
    // },
  }
};
</script>
<style scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  background-color: rgb(0, 0, 0);
  color: #fff;
  display: flex;
  border-radius: 1px
}
.header .logo {
  text-align: left;
  line-height: 60px;
  flex: 0 0 84%;
}
.header .logo span{
    margin-left: 1%
}
.header-right {
  flex: 0 0 16%;
}
.header-user-con {
  display: flex;
  margin-left: 20px;
  height: 50px;
  align-items: center;
}
.el-dropdown-link{
    font-weight: bold
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 15px;
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
