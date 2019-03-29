<template>
  <div>phantomInfo</div>
</template>
<script>
export default {
  name: "phantomInfo",
  data() {
    return {};
  },
  created() {
    let url = "api/gm/updateEud";
    let params = `{
        "partition":${this.$store.state.serverId},
        "openId":"FE1B6793470827BF3D1987CB58ECB522",
        "roleId":"61A9000001",
        "index":1,
        "type":1,
        "value":1
        }`;
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
};
</script>
<style scoped>
</style>


