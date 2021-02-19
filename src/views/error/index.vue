<template>
  <div id="box">
    <div class="weui-msg">
      <div class="weui-msg">
        <div class="weui-msg__icon-area">
          <i class="weui-icon-warn weui-icon_msg"></i>
        </div>
        <div class="weui-msg__text-area">
          <!--<h2 class="weui-msg__title">操作失败</h2>-->
          <!-- {{errmsg}} -->
          <h2 v-for="item in msgsplit" :key="item" class="weui-msg__title">
            <span style="text-align:left"><p>{{item}}</p></span>
          </h2>
          <p class="weui-msg__desc"></p>
        </div>
        <div class="weui-msg__opr-area">
          <button
            type="button"
            id="nextstep"
            v-on:click="back()"
            class="weui-btn weui-btn_primary"
            style="width:85%"
          >返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "errorindex",
  data() {
    return {
      errmsg: "",
      flag: true,
      msgsplit:[]
    };
  },
  methods: {
    back() {
      let ot = this;
      //ot.$router.go(-1);
      ot.$router.push('oauthbind')
      ot.flag = false;
    }
  },
  mounted() {
    let ot = this;
    let errmsg = localStorage.getItem("errmsg");
    ot.errmsg = errmsg;
    ot.msgsplit = errmsg.split("</br>")
    
  },
  destroyed() {}
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