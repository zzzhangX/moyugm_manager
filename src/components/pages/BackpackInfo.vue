<template>
  <div>backpackInfo</div>
</template>
<script>
export default {
  name: "backpackInfo",
  data() {
    return {};
  },
  created() {
    let url = "api/query/rolebag";
    let params = `{
        "partition":${this.$store.state.serverId},
        "openId":"FE1B6793470827BF3D1987CB58ECB522",
        "roleId":"61A9000001",
        "pageNo":1
        }`;
    this.$axios({
      method: "post",
      url: url,
      data: params
    })
      .then(resp => {
        console.log(resp.data)
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
</style>

