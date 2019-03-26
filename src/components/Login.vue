<template>
  <div class="login-wrap">
    <ChooseLang/>
    <div class="ms-login">
      <div class="ms-title">{{ $t("login.title") }}</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :placeholder="$t('login.placeholderUsername')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            :placeholder="$t('login.placeholderPwd')"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">{{ $t("login.submit") }}</el-button>
        </div>
        <p class="login-tips">{{msg}}</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import ChooseLang from "./common/ChooseLang";
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    ChooseLang: ChooseLang
  },
  methods: {
    submitForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.ruleForm.username === "admin" &&
            this.ruleForm.password === "111"
          ) {
            this.$message({
              message: this.$t("login.success"),
              type: "success",
              duration: 1000
            });
            localStorage.setItem("username", this.ruleForm.username);
            localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtb3l1LmFwaSIsIm5hbWUiOiJhZG1pbiIsImV4cCI6MTU1NDE3NjI5OX0=.D329UKK83QuasDccgqzPs2zuhCAyqL1tOA+hSoQ42BA=");
            this.$router.replace("/home");
          } else {
            this.$message({
              showClose: true,
              message: this.$t("login.error"),
              type: "error"
            });
            this.$refs[formName].resetFields();
          }
        } else {
          this.$message({
            showClose: true,
            message: this.$t("login.warning"),
            type: "warning"
          });
          return false;
        }
      });
    }
  },
  mounted() {
    if (localStorage.getItem("username")) {
      this.$router.replace("/home");
    }
  },
  computed: {
    rules() {
      return {
        username: [
          {
            required: true,
            message: this.$t("login.rules.username"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("login.rules.password"),
            trigger: "blur"
          }
        ]
      };
    },
    msg() {
      return this.$t("login.msg");
    }
  }
};
</script>

<style scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  /* background-image: url("../assets/bg.jpg"); */
  background-color: rgb(52, 204, 153);
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
}
.ms-login {
  box-shadow: 8px 8px 3px #88888879;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #e4ffb1;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background-color: rgba(30, 127, 207, 0.842);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #ff3c52;
  display: none;
}
.language{
  float: right;
}
</style>
