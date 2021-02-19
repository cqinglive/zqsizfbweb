<template>
  <!-- 退休认证信息查询 -->
  <div>
    <!-- comtent -->
    <div v-if="empty" class="weui-msg">
      <div class="weui-msg">
        <div class="weui-msg__icon-area">
          <i class="weui-icon-info weui-icon_msg"></i>
        </div>
        <div class="weui-msg__text-area">
          <h2 class="weui-msg__title">查询结果</h2>
          <p class="weui-msg__desc">
            没有相关业务记录
          </p>
        </div>
        <p class="weui-msg__desc"></p>
        <p class="weui-btn-area">
          <a v-on:click="gohome()" class="weui-btn weui-btn_primary">返回</a>
        </p>
        <p></p>
      </div>
    </div>
    <div v-if="empty == false" class="weui-cells" style="font-size:12px">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>姓名</p>
        </div>
        <div class="weui-cell__ft">{{name}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>证件号码</p>
        </div>
        <div class="weui-cell__ft">{{idcard}}</div>
      </div>
    </div>

    <div
      :v-if="empty == false"
      v-for="itemdata in responsedata"
      :key="itemdata"
      class="weui-cells"
      style="font-size:12px"
    >
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>所属区</p>
        </div>
        <div class="weui-cell__ft">{{itemdata.baf307}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>单位名称</p>
        </div>
        <div class="weui-cell__ft">{{itemdata.aab069}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>险种类型</p>
        </div>
        <div class="weui-cell__ft">{{itemdata.aae140}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>待遇发放状态</p>
        </div>
        <div class="weui-cell__ft">{{itemdata.aae116}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>最后一次认证结果</p>
        </div>
        <div class="weui-cell__ft">{{itemdata.aaa094}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>最后一次认证方式</p>
        </div>
        <div class="weui-cell__ft">{{itemdata.bic734}}</div>
      </div>
        <div class="weui-cell" style="font-weight:700">
        <div class="weui-cell__bd">
          <p>最后一次认证时间</p>
        </div>
        <div class="weui-cell__ft">{{itemdata.aae230}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../../utils/common.js"
export default {
  name: "index",
  data() {
    return {
      name: "",
      idcard: "",
      responsedata: [],
      empty: false
    };
  },
  methods: {
    gohome(){
      let ot = this
      ot.$router.push('/')
    },
    search() {
      let ot = this;
      let url = `/web/socialzfb/TYWT_YLTXRZ_01_BYOTHER?username=${common.Encrypt(ot.name)}&idcard=${common.Encrypt(ot.idcard)}`;
      $.showLoading("查询中......");
      ot.$axios
        .get(url,{
          headers:{
                "token":localStorage.getItem('token')
              }
        })
        .then(res => {
          let code = res.data.code;
          $.hideLoading();
          switch (code) {
            case 1:
              if (res.data.data == null) {
                ot.empty = true;
                ot.responsedata = [];
              } else {
                ot.empty = false;
                ot.responsedata = res.data.data.resultBody.queryList;
              }

              $.toast("查询成功!", 500);
              break;
            case 0:
              if (res.data.data == null) {
                ot.empty = true;
                ot.responsedata = [];
              } else {
                ot.empty = false;
                ot.responsedata = res.data.data.resultBody.queryList;
              }
              $.toast("查询成功!", 500);
              break;
            //都是失败
            default:
              ot.empty = true;
              break;
          }
          console.log(res);
        })
        .catch(err => {
          $.hideLoading();
          $.toast("查询失败!", "cancel");
          console.log(err);
        });
    }
  },
  mounted() {
    let ot = this;

    let params = ot.$route.params;
    ot.name = params.name;
    ot.idcard = params.idcard;
    ot.search()
    console.log(params);
  },
  created() {
    let ot = this;
  },
  destroyed(){
    $.hideLoading()
  }
};
</script>

<style>

</style>