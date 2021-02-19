<template>
  <div id="box">
    <div class="weui-msg">
      <div class="weui-msg">
        <div class="weui-msg__icon-area">
          <i class="weui-icon-warn weui-icon_msg"></i>
        </div>
        <div class="weui-msg__text-area">
          <!--<h2 class="weui-msg__title">操作失败</h2>-->
          <h2 class="weui-msg__title">当前微信号尚未绑定参保信息，请您先办理微信注册绑定</h2>
          <p class="weui-msg__desc"></p>
        </div>
        <p class="weui-msg__desc">
          页面自动
          <span id="href" style="color:blue" v-on:click="oauth()">跳转</span> 等待时间：
          <b id="wait">3</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "noauth",
  data() {
    return {
      val: ""
    };
  },
  methods: {
    oauth() {
      let ot = this;
      ot.$router.push("/oauthbind");
    }
  },
  mounted() {
    let ot = this;
    var wait = document.getElementById("wait");
    var interval = setInterval(function() {
      var time = --wait.innerHTML;
      if (time <= 0) {
        ot.$router.push("/oauthbind");
        clearInterval(interval);
      }
    }, 1000);
  },
  beforeCreate() {}
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