<template>
<div>
  <span>清除缓存</span>
  <span>{{val}}</span>
</div>
</template>

<script>
export default {
  name: "clearcache",
  data() {
    return {
      val: ""
    };
  },
  methods: {
    load() {}
  },
  beforeCreate() {
    let ot = this;
    console.log("beforeCreate");
  },
  created() {
    let ot = this;
    console.log("created");
  },
  beforeMount() {
    let ot = this;

    console.log("beforeMount");
    return false;
  },
  mounted() {
    let ot = this;
    
    window.localStorage.removeItem("setAccount");
    window.localStorage.removeItem("setWxinfo");
    window.localStorage.removeItem("credentials");
    window.localStorage.removeItem("oauthflag");
    // alert('缓存清除成功!')
    ot.$axios.comm
    ot.$axios
      .get(`/web/menu/getAll/1`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log("mounted");
  },
  destroyed() {
    let ot = this;
    console.log("destroyed");
  }
};
</script>

<style>
</style>