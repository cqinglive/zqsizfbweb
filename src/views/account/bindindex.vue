<template>
  <div>
    <div class="weui-msg">
      <div class="weui-cells__title" style="text-align:left">
        温馨提示：
        <br>
        您一经注册或使用肇庆社保智能服务平台即视为同意授权确认本平台提取及使用您的个人信息以及使用过程中所填写的数据。申请注册绑定操作必须是参保人本人或经参保人合法授权，严禁未经参保人同意非法注册他人参保身份进行信息查询，即使注册后解除微信绑定后，本平台将采取相应的技术手段永久保存您注册使用时的相关个人信息。如参保人本人发现个人信息被非法使用，务必及时提出申诉，非法使用者将按国家相关规定承担法律责任。
      </div>
    </div>
    <div id="registinfo" class="weui-cells weui-cells_form" style="font-size:14px">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            id="TelPhone"
            type="tel"
            placeholder="请输入手机号"
            isvalid="yes"
            errormsg
            checkexpession="Mobile"
          />
        </div>
        <div class="weui-cell__ft">
          <button
            id="generateverifycode"
            v-on:click="generateverifycode()"
            class="weui-vcode-btn"
          >获取验证码</button>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            id="VerifyCode"
            type="text"
            placeholder="请输入验证码"
            isvalid="yes"
            errormsg="验证码"
            checkexpession="NotNull"
            maxlength="4"
          />
        </div>
      </div>

      <div class="weui-msg__opr-area">
        <button
          type="button"
          id="registandbind"
          v-on:click="regist()"
          class="weui-btn weui-btn_primary"
          style="width:85%"
        >注册账号并绑定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bindindex",
  data() {
    return {
      val: ""
    };
  },
  methods: {
    regist() {
      //注册并绑定
      let ot = this;
      var verify = $("#VerifyCode").val();

      //往wx_user_info表写入信息

      var wxuser = JSON.parse(window.localStorage.getItem("setWxinfo"));
      var account = JSON.parse(window.localStorage.getItem("setAccount"));
      var postData = new Object();
      postData.OpenId = wxuser.openid;
      postData.WxName = wxuser.nickname;
      postData.Headimgurl = wxuser.headimgurl;
      postData.Sex = wxuser.sex;
      postData.TelPhone = $("#TelPhone").val();
      postData.Identity = account.idcard;
      postData.Name = account.name;
      postData.SocialId = account.socialid;
      postData.verifycode = verify;

      if (!verify) {
        $.toast("请输入4位验证码!", "cancel");
        return false;
      }
      if (!$("#TelPhone").val()) {
        $.toast("请输入手机号码!", "cancel");
        return false;
      }

      $.showLoading("正在处理...");
      ot.$axios({
        url: `/web/wechat/RegistAndBind`,
        method: "post",
        async: false,
        data: postData
      })
        .then(res => {
          if (res.data.code == 0) {
            $.toast(res.data.msg);
            setTimeout(function() {
              //页面跳转
              window.localStorage.setItem(
                "setAccount",
                JSON.stringify({
                  openid: wxuser.openid,
                  nickname: wxuser.nickname,
                  name: account.name,
                  idcard: account.idcard,
                  phone: $("#TelPhone").val(),
                  imgurl: wxuser.headimgurl
                })
              );
              $.hideLoading();
              ot.$router.push("bindsuccess");
            }, 1000);
          } else {
            $.toast(res.data.msg, "cancel");
            setTimeout(function() {
              $.hideLoading();
            }, 3000);
          }
        })
        .catch(err => {
          console.log(err);
          //关闭加载样式
          $.hideLoading();
        });
      console.log("regis");
    },
    generateverifycode() {
      //验证码生成
      let ot = this;
      var phone = $("#TelPhone").val();
      if (phone == null || phone == undefined || phone == "") {
        $.toast("请先输入手机号码！", "cancel");
        return false;
      }
      ot.$axios
        .get(`/web/wechat/GenerateVerifyCode/${phone}`)
        .then(res => {
          if (res.data.code == 0) {
            ot.wait(); //60s
            $.toast(res.data.msg);
          } else {
            $.toast(res.data.msg, "cancel");
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log("generateverifycode");
    },
    wait() {
      var wait = 60;
      $("#generateverifycode").attr("disabled", "disabled");
      var interval = setInterval(function() {
        var time = --wait;
        $("#generateverifycode").html(time + "秒后可再次发送");
        if (time <= 0) {
          $("#generateverifycode").html("获取验证码");
          $("#generateverifycode").removeAttr("disabled");
          clearInterval(interval);
        }
      }, 1000);
    }
  },
  mounted() {
    let ot = this;
  },
  destroyed() {
    $.hideLoading();
  }
};
</script>

<style>
</style>