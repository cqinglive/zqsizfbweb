<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <img :src="wxuserinfo.imgurl" style="width: 93px;height: 93px; border-radius: 50px;" />
    </div>
    <div class="weui-msg__icon-area">{{wxuserinfo.nickname}}</div>
    <div class="weui-cells__title" style="text-align: left">
      您的微信号已成功绑定参保人信息：
      <br />
      姓名：{{name}}
      <br />
      证件号码：{{idcard}}
      <br />
      手机号码：{{phone}}
      <br />
      <br />如果您想变更绑定微信号，请解除绑定后再进行微信绑定操作。
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <button
          type="button"
          id="unbind"
          v-on:click="unbind()"
          class="weui-btn weui-btn_warn"
        >解除微信绑定</button>
        <a v-on:click="gohome()" class="weui-btn weui-btn_primary">前往社保微信门户</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "bindsuccess",
  data() {
    return {
      val: "",
      wxuserinfo: null,
      account: null,
      name:'',
      idcard:'',
      phone:''
    };
  },
  methods: {
    gohome() {
      this.$router.push("/");
    },
    unbind() {
      //解绑
      let ot = this;
      $.confirm(
        "确定解除绑定吗?",
        function() {
          //点击确认后的回调函数
          ot.$axios
            .get(`/web/wechat/Unbind/${ot.wxuserinfo.openid}/${ot.wxuserinfo.idcard}`)
            .then(res => {
              if (res.data.code == 0) {
                //清除掉浏览器缓存
                window.localStorage.removeItem("setAccount");
                window.localStorage.removeItem("setWxinfo");
                window.localStorage.removeItem("credentials");
                window.localStorage.removeItem("oauthflag");
                ot.$router.push("oauthbind");
              } else {
                $.toast(res.data.msg, "cancel");
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
        function() {
          //点击取消后的回调函数
          console.log("取消");
        }
      );
    }
  },
  mounted() {
    let ot = this;
    ot.wxuserinfo = JSON.parse(window.localStorage.getItem("setAccount"));
    ot.name = ot.wxuserinfo.name.replace(/^(.{2})(?:\w+)(.{1})$/, "$1****$2");
    ot.idcard = ot.wxuserinfo.idcard.replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2")
    ot.phone = ot.wxuserinfo.phone.replace(/^(.{2})(?:\w+)(.{1})$/, "$1****$2");
    //alert(ot.wxuserinfo.imgurl)
    window.localStorage.setItem("credentials", true); //表示登陆成功
    window.localStorage.setItem("oauthflag",true); //表示已授权
    //account = JSON.parse(window.localStorage.getItem('setAccount'));
  }
};
</script>

<style id="__WXWORK_INNER_SCROLLBAR_CSS">
::-webkit-scrollbar {
  width: 12px !important;
  height: 12px !important;
}

::-webkit-scrollbar-track:vertical {
}

::-webkit-scrollbar-thumb:vertical {
  background-color: rgba(136, 141, 152, 0.5) !important;
  border-radius: 10px !important;
  background-clip: content-box !important;
  border: 2px solid transparent !important;
}

::-webkit-scrollbar-track:horizontal {
}

::-webkit-scrollbar-thumb:horizontal {
  background-color: rgba(136, 141, 152, 0.5) !important;
  border-radius: 10px !important;
  background-clip: content-box !important;
  border: 2px solid transparent !important;
}

::-webkit-resizer {
  display: none !important;
}
</style>