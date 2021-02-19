<template>
  <div>
    <div v-if="isoauth != false" class="weui-cells__title" style="text-align:left">目前已提交的预约业务。</div>
    <div class="weui-cells">
      <div v-if="isoauth != false" class="weui-cell">
        <div style="margin-right:20px">县市区</div>
        <div class="weui-cell__bd">联系人</div>
        <div class="weui-cell__bd">提交日期</div>
        <div class="weui-cell__bd">受理状态</div>
      </div>

      <div v-for="item in booklist" :key="item" v-on:click="show(item)" class="weui-cell">
        <!-- <div class="weui-cell__bd">
          <p>{{item.AREA}} &nbsp; {{item.CONTACT}} &nbsp; {{item.CREATEDATE.toString()}} 
            &nbsp; <span v-if="item.ACCEPTFLAG == 1">已受理</span>
            <span v-if="item.ACCEPTFLAG == 0">未受理</span>
          </p>
        </div>-->
        <div style="margin-right:35px">{{item.AREA}}</div>
        <div class="weui-cell__bd">{{item.CONTACT}}</div>
        <div class="weui-cell__bd">{{item.CREATEDATE.toString()}}</div>
        <div class="weui-cell__bd">
          <p>
            <span v-if="item.ACCEPTFLAG == 1">
              已受理
              <i v-if="item.ACCEPTFLAG == 1" class="weui-icon-success"></i>
            </span>
            <span v-if="item.ACCEPTFLAG == 0">未受理</span>
          </p>
        </div>
        <!-- <div class="weui-cell__ft">{{item.CREATEDATE.toString()}}</div> -->
      </div>
      <div v-if="empty" class="weui-msg">
        <div class="weui-cells__title">无数据!</div>
      </div>
      <div v-if="isoauth == false" class="weui-msg">
        <div class="weui-cells__title">无查看权限!</div>
      </div>
    </div>
    <div class="weui-msg__opr-area">
      <button
        type="button"
        id="showall"
        v-on:click="loadalldata()"
        class="weui-btn weui-btn_mini weui-btn_primary"
        style="margin-top:20px"
      >查看全部</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookresult",
  data() {
    return {
      val: "",
      area: "44120000",
      booklist: [],
      empty: false,
      isoauth: true,
      account: null
    };
  },
  methods: {
    show(obj) {
      let ot = this;
      let acceptflag = obj.ACCEPTFLAG;
      if (acceptflag == 1) {
        $.modal({
          title: `已审核预约业务`,
          text: `县市区:${obj.AREA}</br>联系人:${obj.CONTACT}</br>联系方式:${obj.PHONE}</br>
               提交人:${obj.USER_NAME == undefined?"":obj.USER_NAME}</br>提交人手机号:${obj.REGISTPHONE == undefined?"":obj.REGISTPHONE}</br>证件号:${obj.IDNUMBER}</br>提交日期:${obj.CREATEDATE}</br>预约业务:${obj.BOOKITEM}</br>办理业务说明:${obj.BUSINESSDESC == undefined?"":obj.BUSINESSDESC}</br>`,
          buttons: [
            {
              text: "确定",
              className: "default",
              onClick: function() {
                console.log(1);
              }
            }
          ]
        });
        return;
      }
      $.modal({
        title: `未审核预约业务`,
        text: `<span>县市区:${obj.AREA}</span></br>联系人:${obj.CONTACT}</br>联系方式:${obj.PHONE}</br>
               提交人:${obj.USER_NAME == undefined?"":obj.USER_NAME}</br>提交人手机号:${obj.REGISTPHONE == undefined?"":obj.REGISTPHONE}</br>证件号:${obj.IDNUMBER}</br>提交日期:${obj.CREATEDATE}</br>预约业务:${obj.BOOKITEM}</br>办理业务说明:${obj.BUSINESSDESC == undefined?"":obj.BUSINESSDESC}</br>`,
        buttons: [
          {
            text: "受理",
            onClick: function() {
              $.showLoading("受理中...");
              ot.$axios
                .get(`/web/bookbusiness/accept/${ot.account.openid}/${obj.ID}`)
                .then(res => {
                  $.hideLoading();
                  let response = res.data;
                  let code = response.code;
                  if (code == 1) {
                    $.toast(response.msg, 500);
                    ot.loaddata();
                    // ot.loadtest()
                    return;
                  } else {
                    $.toast(response.msg, "cancel");
                  }
                  console.log(res);
                })
                .catch(err => {
                  $.hideLoading();
                  console.log(res);
                });
              console.log(1);
            }
          },
          {
            text: "取消",
            className: "default",
            onClick: function() {
              console.log(2);
            }
          }
        ]
      });
      //   $.alert({
      //     title: obj.USER_NAME,
      //     text: `在${obj.CREATEDATE}预约了${obj.BOOKITEM},联系人:${obj.CONTACT},联系方式:${obj.PHONE}。`,
      //     onOK: function() {
      //       //点击确认
      //     }
      //   });
      console.log(obj);
    },
    loadtest() {
      let ot = this;

      ot.$axios
        .get(`/web/bookbusiness/bookitemlistbyarea/44120000`)
        .then(res => {
          let response = res.data;
          ot.booklist = response.data;
          if (ot.booklist.length == 0) {
            ot.empty = true;
          } else {
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    loaddata() {
      let ot = this;
      ot.account = JSON.parse(window.localStorage.getItem("setAccount"));
      console.log("bookoauthusercache", ot.account);
      //let symbol = ot.isoauthf(ot.account);

      let obj = ot.account;
      ot.$axios
        .get(`/web/bookbusiness/isoauthbooklist/${obj.openid}/${obj.idcard}`)
        .then(res => {
          if (res.data == true) {
            if (!obj.area) {
              ot.area = "0000";
            }
            ot.$axios
              .get(`/web/bookbusiness/bookitemlistbyarea/${obj.area}`)
              .then(res => {
                let response = res.data;
                ot.booklist = response.data;
                if (ot.booklist.length == 0) {
                  ot.empty = true;
                }
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            ot.isoauth = false;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadalldata() {
      let ot = this;
      ot.account = JSON.parse(window.localStorage.getItem("setAccount"));
      console.log("bookoauthusercache", ot.account);
      //let symbol = ot.isoauthf(ot.account);
      let obj = ot.account;
      if (obj == null) {
        return;
      }
      $.showLoading("查询中...");
      ot.$axios
        .get(`/web/bookbusiness/bookitemlistallbyarea/${obj.area}`)
        .then(res => {
          let response = res.data;
          ot.booklist = response.data;
          if (ot.booklist.length == 0) {
            ot.empty = true;
          }
          $.toast("查询成功!", 500);
          setInterval(function() {
            $.hideLoading();
          }, 1000);

          console.log(res);
        })
        .catch(err => {
          $.hideLoading();
          console.log(err);
        });
    },
    isoauthf(obj) {
      //判断有无权限
      let ot = this;
      ot.$axios
        .get(`/web/bookbusiness/isoauthbooklist/${obj.openid}/${obj.idcard}`)
        .then(res => {
          return res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  created() {
    //首页可进，点击事项时根据事项需要登陆
    //通过code换取网页授权access_token
    let ot = this;
    var url = window.location.href; //获取当前url
    let params = ot.$route.params;
    //判断有无限制
    console.log(1);
    let splitcode = url.split("?");
    if (splitcode.length <= 1) {
      //认为是登陆了的，登陆了的存在setAccount
      console.log(2);
      ot.loaddata();
      // ot.loadtest();
      return;
    }
    console.log(3);
    var cs = url.split("?")[1].split("=")[1]; //获取?之后的参数字符串
    let code = cs;
    // let credentials = window.localStorage.getItem("credentials");
    // if (credentials != null && credentials != "") {
    //   //已经登陆过
    //   ot.loaddata();
    //   return;
    // }
    //ot.oauth(code);
    console.log(4);
    ot.$axios
      .get(`/web/wechat/Wechatoauth?code=${code}`)
      .then(res => {
        $.hideLoading();
        let resdata = res.data.data;
        let rescode = res.data.code;
        console.log("bookresult", resdata);
        if (rescode == -1) {
          //未绑定，跳转到绑定页面
          ot.$router.push("noauth");
        } else if (rescode == 0) {
          ot.f = true;
          window.localStorage.setItem(
            "setAccount",
            JSON.stringify({
              name: resdata.USER_NAME,
              idcard: resdata.ID_NUMBER,
              socialid: resdata.SB_NUMBER,
              openid: resdata.OPEN_ID,
              nickname: resdata.OPEN_USER_NAME,
              imgurl: resdata.ICON,
              phone: resdata.CONTACT_MOBILE,
              area: resdata.AREA
            })
          );
          window.localStorage.setItem("credentials", true); //表示登陆成功
          window.localStorage.setItem("oauthflag", true); //表示已授权
          ot.loaddata();
        } else if ((rescode = -2)) {
          console.log("-2");
          ot.$router.push("oauthbook");
          // alert("授权失败!");
          //ot.loaddata();
        }

        console.log(res);
      })
      .catch(err => {
        $.hideLoading();
        console.log("error", err);
        alert("error");
      });
  },
  destroyed() {
    $.hideLoading();
  }
};
</script>

<style>
.weui-dialog__bd {
  text-align: left;
  margin-left: 5%;
}
</style>