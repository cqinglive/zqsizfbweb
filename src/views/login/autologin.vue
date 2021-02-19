<template>
  <span></span>
</template>

<script>
/* eslint-disable */
import common from "../../utils/common.js"
import config from "../../config.json";
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
    },
    loginwx() {
      /**
       1 第一步：用户同意授权，获取code

       2 第二步：通过code换取网页授权access_token

       3 第三步：刷新access_token（如果需要）

       4 第四步：拉取用户信息(需scope为 snsapi_userinfo)

       5 附：检验授权凭证（access_token）是否有效
       */
      let ot = this;

      ot.$emit("footer", false);
      ot.$nextTick(() => {
        //snsapi_userinfo、snsapi_base

        let iswechatbrowser = ot.iswechatbrowser();
        if (iswechatbrowser) {
          let url = `http://${document.domain}/#/`;
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
    },
    loginzfb() {
      /**
       * 支付宝网页应用登陆
       * 商户/开发者通过以下的 URL 拼接规则拼接用户授权的 URL 地址，该地址展示给用户，用户需在支付宝端点开 URL 地址，并点击授权，商户/开发者即可获得用户的授权。
          url拼接规则：https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=APPID&scope=SCOPE&redirect_uri=ENCODED_URL
       */

      let ot = this;
      ot.$emit("footer", false);
      let url = `http://${document.domain}/#/`;
      window.location.href = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021001175636241&scope=auth_base&redirect_uri=${encodeURIComponent(
        url
      )}`;
    }
  },
  beforeCreate() {
    let ot = this;
    ot.$emit("footer", false);
  },
  created() {},
  mounted() {
    let ot = this;
    let params = ot.$route.params;
    let interfaceid = params.interfaceid;
    $.showLoading("获取信息中...");
    ap.getAuthCode({ appId: `${config.appid}`, scopes: ["auth_user"] }, res => {
      //需要判断是同意、拒绝
      switch (res.error) {
        case 2:
          //参数错误
          $.hideLoading();
          ot.$router.push("/");
          break;
        case 10:
          //获取授权过程中的其他错误
          $.hideLoading();
          ot.$router.push("/");
          break;
        case 11:
          //用户取消
          $.hideLoading();
          ot.$router.push("/");
          break;
        case 12:
          //rpc 网络错误
          $.hideLoading();
          ot.$router.push("/");
          break;
        case 15:
          //授权回调地址不合法，请保证已配置 https 开头的授权回调地址, 且当前页面地址需要和配置的一致
          $.hideLoading();
          ot.$router.push("/");
          break;
        default:
          //其他的都是成功
          ot.$axios.get(`/web/ZFB/oauth?authCode=${res.authCode}`).then(resp => {
            //接口返回的信息
            let userinfo = {
              cert_no: resp.data.data.cert_no,
              cert_type: resp.data.data.cert_type,
              is_certified: resp.data.data.is_certified,
              user_id: resp.data.data.user_id,
              user_name: resp.data.data.user_name,
              token : resp.data.data.token
            };

            ot.$store.commit("setOauthflag", true);
            ot.$store.commit("setUserinfo", userinfo);
            localStorage.setItem('userid',`${userinfo.user_id}`)
            localStorage.setItem('token',`${userinfo.token}`)
            // let Pars = `442801195310101170,梁建宁`
            let Pars = `${common.Encrypt(userinfo.cert_no)},${common.Encrypt(userinfo.user_name)}`;
            ot.$axios({
              url: `/web/socialzfb/Identification/01/${Pars}`,
              method: "get",
              headers:{
                "token":localStorage.getItem('token')
              }
            })
              .then(res => {
                let resdata = res.data;
                let data = resdata.data;
                let code = resdata.code;
                $.hideLoading();
                //测试本地医保数据
                // userinfo.socialid = '11131217'
                //根据接口返回数据跳转页面
                switch (code) {
                  case 0:
                    //身份认证通过(将社保号写入使用)
                    userinfo.socialid = data.AAC001;
                    ot.$store.commit("setUserinfo", userinfo);
                    break;
                  case -1:
                    //自定义错误
                    alert(resdata.msg);
                    break;
                  default:
                    userinfo.socialid = "00000000";
                    ot.$store.commit("setUserinfo", userinfo);
                    break;
                }
                //根据interfaceid决定到哪个页面
                if (interfaceid === "TYWT_YLTXRZ_01") {
                  ot.$router.push("otherindex");
                } else if (interfaceid === "111") {
                  //自助报表验证
                  ot.$router.push("querypdf");
                } else {
                  ot.$router.push("allquery");
                }
                // ot.$router.push("/");
              })
              .catch(err => {
                $.hideLoading();
              });
          });
          break;
      }
    });
  },
  destroyed() {
    let ot = this;
    ot.$emit("footer", true);
  }
};
</script>

<style>
</style>
