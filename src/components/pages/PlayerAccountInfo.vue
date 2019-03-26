<template>
  <div class="PlayerAccountInfo">
    PlayerAccountInfo
    <button @click="havaTry">test</button>
  </div>
</template>
<script>
export default {
  name: "PlayerAccountInfo",
  methods: {
    havaTry() {
      let url = "http://192.168.1.82:8000/query/userinfo";
      let params = '{"serverId":25001,"openId":"FE1B6793470827BF3D1987CB58ECB522"}';
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
</style>


