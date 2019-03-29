<template>
  <div>托管trusteeship</div>
</template>
<script>
export default {
  name: "trusteeship",
  data() {
    return {};
  },
  created() {
    let url = "api/gm/replaceopentid";
    let params = `{
        "partition":${this.$store.state.serverId},
        "openId":"FE1B6793470827BF3D1987CB58ECB522",
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

