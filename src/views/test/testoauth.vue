<template>
  <span></span>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
    let ot = this;
    var url = window.location.href; //获取当前url
    alert(1)
    var cs = url.split("?")[1].split("=")[1]; //获取?之后的参数字符串
    alert(2)
     ot.$axios
          .get(`/web/wechatbak/Wechatoauth?code=${cs}`)
          .then(res => {
              console.log(res)
          })
          .catch(err => {
            alert("error");
            ot.v = err;
          });

    console.log(111);
  }
};
</script>

<style>
</style>