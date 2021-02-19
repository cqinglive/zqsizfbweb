<template>
  <div v-show="complete">
    <!-- 已经直接将数据group by好了，存放在businesstype，之前已循环好，所以只用了busiesstype里面的分类 -->
    <div class="menu" v-for="itemtype in businesstype" :key="itemtype[0].BUSINESSTYPEID">
      <div class="weui-panel__hd" style="font-size:14px">{{itemtype[0].BUSINESSTYPENAME}}</div>
      <div class="weui-grids">
        <a
          href="javascript:"
          v-for="item in businessinfo.filter(i=>i.BUSINESSTYPEID == itemtype[0].BUSINESSTYPEID)"
          :key="item.BUSINESSID"
          v-on:click="jumpbus(item.BUSINESSID,item.INTERFACEID)"
          class="weui-grid js_grid"
          style="background-color:white"
        >
          <div class="weui-grid__icon">
            <img :src="item.BUSINESSIMG" alt />
          </div>
          <p class="weui-grid__label">
            <span style="font-size:14px">{{item.BUSINESSSHORTNAME}}</span>
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config.json";
import common from "../../utils/common.js"
export default {
  name: "home",
  data() {
    return {
      value: "",
      msg:"test",
      homeimg: false,
      businessinfo: [],
      businesstype: [],
      openid: "",
      complete: false
    };
  },
  methods: {
    groupBy(array, f) {
      const groups = {};
      array.forEach(function(o) {
        const group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
      });
      return Object.keys(groups).map(function(group) {
        return groups[group];
      });
    },
    load() {
      //加载首页
      let ot = this;

      let flag = "1";
      ot.$axios
        .get(`/web/menu/getAll/${flag}`)
        .then(res => {
          console.log("listment", res);
          ot.homeimg = true;
          ot.businessinfo = res.data.data.listmenu;
          let user = res.data.data.user;

          ot.businessinfo.forEach(item => {
            item.BUSINESSIMG = config.iconurl + item.BUSINESSIMG;
          });
          //分类
          ot.businesstype = ot.groupBy(ot.businessinfo, function(item) {
            return [item.BUSINESSTYPEID, item.BUSINESSTYPENAME];
          });
          ot.complete = true;

          console.log(res);
        })
        .catch(err => {
          //401时，如果code为0，认为是更新缓存
          console.log(err);
        });
    },
    jumpbus(id, interfaceid) {
      //这一步授权
      let ot = this;
      let oauthflag = ot.$store.getters.getOauthflag;
      ot.$store.commit("setFlag", interfaceid);
      if (oauthflag && oauthflag == true) {
        //判断有无实名
        let iscertified = ot.$store.getters.getIscertified;

        if (iscertified !== "T") {
          //未实名（提示:您还未进行支付宝实名认证，请通过认证后再操作）
          ot.$router.push("notcertified");
          return;
        } else {
          //判断是否本地参保
          let notlocal = ot.$store.getters.getNotlocal;
          if (notlocal == 1) {
            ot.$router.push("notlocaluser");
            return;
          } else {
            //如果是养老退休认证查询的话，跳转到另外的页面
            if (interfaceid === "TYWT_YLTXRZ_01") {
              ot.$router.push("otherindex");
            } else if (interfaceid === "111") {
              //自助报表验证
              ot.$router.push("querypdf");
            } else {
              ot.$router.push("allquery");
            }
            return;
          }
        }
      } else {
        if (interfaceid === "111") {
          //自助报表验证
          ot.$router.push("querypdf");
        } else {
          //授权
          // ot.$router.push({name:"autologin",params:{interfaceid:interfaceid}});
          ot.zfboauth(interfaceid);
        }
      }
      console.log(id);
    },
    //支付宝授权
    zfboauth(interfaceid) {
      let ot = this;
      let notlocal = 0; //不是本地参保
      $.showLoading("获取信息中...");
      ap.getAuthCode(
        { appId: `${config.appid}`, scopes: ["auth_user"] },
        res => {
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
              ot.$axios
                .get(`/web/ZFB/oauth?authCode=${res.authCode}`)
                .then(resp => {
                  //接口返回的信息
                  let userinfo = {
                    cert_no: common.Decrypt(resp.data.data.cert_no),
                    cert_type: resp.data.data.cert_type,
                    is_certified: resp.data.data.is_certified,
                    user_id: common.Decrypt(resp.data.data.user_id),
                    user_name: common.Decrypt(resp.data.data.user_name),
                    token: resp.data.data.token
                  };

                  ot.$store.commit("setIscertified", userinfo.is_certified);
                  ot.$store.commit("setOauthflag", true);
                  ot.$store.commit("setUserinfo", userinfo);
                  localStorage.setItem("userid", `${userinfo.user_id}`);
                  localStorage.setItem("token", `${userinfo.token}`);
                  if (userinfo.is_certified !== "T") {
                    //未实名（提示:您还未进行支付宝实名认证，请通过认证后再操作）
                    ot.$router.push("notcertified");
                    return;
                  } else {
                    // let Pars = `442801195310101170,梁建宁`
                    let Pars = `${common.Encrypt(userinfo.cert_no)},${common.Encrypt(userinfo.user_name)}`;
                    ot.$axios({
                      url: `/web/socialzfb/Identification/01/${Pars}`,
                      method: "get",
                      headers: {
                        token: localStorage.getItem("token")
                      }
                    })
                      .then(res => {
                        let resdata = res.data;
                        let data = resdata.data;
                        let code = resdata.code;
                        $.hideLoading();
                        // 测试本地医保数据
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
                          case 106:
                            //您输入身份信息不存在参保记录，请到当地社保局咨询
                            //再调用人员参保信息查询(TYWT_RYCBXX_01)接口，再次判断有无参保
                            ot.$axios({
                              url: `/web/socialzfb/TYWT_RYCBXX_01?username=${common.Encrypt(userinfo.user_name)}&idcard=${common.Encrypt(userinfo.cert_no)}`,
                              method: "get",
                              headers: {
                                token: localStorage.getItem("token")
                              }
                            }).then(resp => {
                              let data = resp.data;
                              if (data.code == 1) {
                                if (data.data == null) {
                                  ot.$store.commit("setNotlocal", 1);
                                  notlocal = 1;
                                  ot.$router.push("notlocaluser");
                                  return;
                                }
                              } else {
                                ot.$store.commit("setNotlocal", 1);
                                notlocal = 1;
                                ot.$router.push("notlocaluser");
                                return;
                              }
                            });
                            break;
                          default:
                            userinfo.socialid = "00000000";
                            ot.$store.commit("setUserinfo", userinfo);
                            break;
                        }
                        //如果没有在肇庆参保，跳转到未参保页面
                        if (notlocal == 1) {
                          ot.$router.push("notlocaluser");
                        } else {
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
                        }
                      })
                      .catch(err => {
                        $.hideLoading();
                      });
                  }
                });
              break;
          }
        }
      );
    }
  },
  created() {
    let ot = this;
    ot.$nextTick(() => {
      console.log("进入主页面");
    });
  },
  mounted() {
    let ot = this;
    console.log(common.Encrypt('test'))
    ot.load();
  },
  beforeCreate() {},
  destroyed() {
    $.hideLoading();
  }
};
</script>

<style scoped>
.menu {
  border: 2px solid #efeff4;
  border-radius: 15px;
  margin-top: 10px;
}
.weui-grids {
  border-radius: 15px;
}
</style>