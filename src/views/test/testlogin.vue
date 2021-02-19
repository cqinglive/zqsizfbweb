<template>
  <span></span>
</template>

<script>
/* eslint-disable */
export default {
  name: "autologin",
  data() {
    return {
      val: ""
    };
  },
  methods: {
    iswechatbrowser() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true; // 是微信端
      } else {
        return false;
      }
    }
  },
  created() {
    /**
       1 第一步：用户同意授权，获取code

       2 第二步：通过code换取网页授权access_token

       3 第三步：刷新access_token（如果需要）

       4 第四步：拉取用户信息(需scope为 snsapi_userinfo)

       5 附：检验授权凭证（access_token）是否有效
       */
    let ot = this;
    //alert(8);
    //window.localStorage.setItem('setAccount',{ name :'111111', idcard : '123456'})
    ot.$nextTick(() => {
      //alert(9);
      let iswechatbrowser = ot.iswechatbrowser();
      //alert(10);
      if (iswechatbrowser) {
        //alert(11);
        let url = `http://${document.domain}/#/testoauth`;
        //alert(url)
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43f9ba7883e76315&redirect_uri=${encodeURIComponent(
          url
        )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      } else {
        setTimeout(function() {
          alert("请在微信浏览器内打开!");
        }, 500);
      }
      console.log(ot.iswechatbrowser());
    });
  }
};
</script>

<style>
</style>
