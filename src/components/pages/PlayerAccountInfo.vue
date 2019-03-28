<template>
  <div class="PlayerAccountInfo">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input v-model="roleName" placeholder="请输入玩家昵称"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="searchRoleId">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "PlayerAccountInfo",
  data() {
    return {
      roleName:''
    };
  },
  created() {
    
  },
  methods: {
    searchRoleId(){

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
</style>


