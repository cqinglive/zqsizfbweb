<template>
  <div v-if="show" class="content">
    <div class="weui-msg">
      <div class="weui-msg__icon-area">
        <img :src="wxdatainfo.headimgurl" style="width: 93px;height: 93px; border-radius: 50px;" />
      </div>
      <div class="weui-msg__icon-area">{{wxdatainfo.nickname}}</div>
      <div class="weui-cells__title">您即将绑定您的账号，请输入以下信息：</div>
      <div id="baseinfo">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">参保姓名</label>
          </div>
          <div class="weui-cell__bd">
            <input
              class="weui-input"
              id="username"
              name="username"
              type="text"
              placeholder="请输入您的参保姓名"
              isvalid="yes"
              errormsg="参保姓名"
              checkexpession="NotNull"
            />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">证件号码</label>
          </div>
          <div class="weui-cell__bd">
            <input
              class="weui-input"
              id="idnumber"
              name="idnumber"
              type="text"
              placeholder="请输入证件号码"
            />
          </div>
        </div>
        <div class="weui-msg__opr-area">
          <button
            type="button"
            id="nextstep"
            v-on:click="nextstep()"
            class="weui-btn weui-btn_primary"
            style="width:85%"
          >下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 绑定页面
 * 请求过来，如果用户已经绑定，即跳转到bindsuccess页面
 */
export default {
  name: "bindverify",
  data() {
    return {
      val: "",
      wxdatainfo: { headimgurl: "", nickname: "" },
      show:false
    };
  },
  methods: {
    nextstep() {
      //点击下一步
      let ot = this;
      var pdata = new Object();
      pdata.Type = "01";
      var name = $("#username").val();
      var idnum = $("#idnumber").val();
      if (name == "") {
        $.toptip("请输入姓名!", "error");
        return false;
      }
      if (idnum == "") {
        $.toptip("请输入身份证号码!", "error");
        return false;
      }
      pdata.Pars = `${idnum},${name}`
      $.showLoading("处理中...");
      ot.$axios({
        url: `/web/social/Identification/01/${pdata.Pars}`,
        method: "get"
      })
        .then(res => {
          let resdata = res.data;
          let data = resdata.data;
          let code = resdata.code;
          $.hideLoading();
          //根据接口返回数据跳转页面
          switch (code) {
            case 0:
              //身份认证通过
              window.localStorage.setItem(
                "setAccount",
                JSON.stringify({
                  name: name,
                  idcard: idnum,
                  socialid: data.AAC001,
                  openid: "",
                  phone: ""
                })
              );
              ot.$router.push("bindindex");
              break;
            case -1:
              //自定义错误
              alert(resdata.msg);
              break;
            case -999:
              //用户已经绑定了
              ot.$router.push("errorindex");
              localStorage.setItem("errmsg", resdata.msg);
              break;
            default:
              window.localStorage.setItem("out_errmsg", resdata.msg); //将提示信息写入本地缓存
              ot.$router.push("noresult");
              break;
          }
        })
        .catch(err => {
          $.hideLoading();
          console.log(err);
        });
    }
  },
  mounted() {
    let ot = this;
    ot.wxdatainfo = JSON.parse(window.localStorage.getItem("setWxinfo"));
    console.log("mounted:" + ot.wxdatainfo);
  },
  beforeCreate() {
    let ot = this;
    var url = window.location.href; //获取当前url
    let splitcode = url.split("?");
    if (splitcode.length <= 1) {
      return;
    }

    var url = window.location.href; //获取当前url
    var cs = url.split("?")[1].split("=")[1]; //获取?之后的参数字符串
    let code = cs;
    let credentials = window.localStorage.getItem("credentials");
    console.log("credentials" + credentials);

    console.log(credentials == null);

    // if (credentials) {
    //   //已经登陆过
    //   console.log("?????");
    //   ot.$router.push("bindsuccess");
    //   return;
    // }
    //通过code换取网页授权access_token
    ot.$axios
      .get(`/web/wechat/Wechatoauth?code=${code}`)
      .then(res => {
        let resdata = res.data.data;
        let rescode = res.data.code;

        if (rescode == 0) {
          //绑定成功，跳转到bindsuccess
          window.localStorage.setItem("openid", resdata.OPEN_ID);
          window.localStorage.setItem(
            "setAccount",
            JSON.stringify({
              openid: resdata.OPEN_ID,
              nickname: resdata.nickname,
              name: resdata.USER_NAME,
              idcard: resdata.ID_NUMBER,
              phone: resdata.CONTACT_MOBILE,
              area:resdata.AREA,
              imgurl: resdata.headimgurl
            })
          );
          ot.$router.push("bindsuccess");
        } else if (rescode == -1) {
          ot.show = true
          if (resdata != null) {
            ot.wxdatainfo = resdata;
            window.localStorage.setItem("setWxinfo", JSON.stringify(resdata));
            console.log("111" + JSON.stringify(res));
          }
        } else if (rescode == -2) {
          //啥也不干
          ot.$router.push("oauthbind");
          console.log("aaa" + JSON.stringify(res));
          console.log(
            "bbb" + JSON.parse(window.localStorage.getItem("setWxinfo"))
          );
        }
        //正常流程
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        alert("oauth error");
      });
  },
  destroyed() {
    $.hideLoading();
  }
};
</script>

<style id="__WXWORK_INNER_SCROLLBAR_CSS">
.content {
  height: 1000px;
}

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
