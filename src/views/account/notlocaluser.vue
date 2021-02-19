<template>
  <div>
    <div class="weui-tab">
    <div class="weui-msg">
      <div class="weui-msg">
        <div class="weui-msg__icon-area">
          <i class="weui-icon-info weui-icon_msg"></i>
        </div>
        <div class="weui-msg__text-area">
          <h2 class="weui-msg__title">未能查询到您在肇庆地区参保登记信息，请核实您的认证身份</h2>
          <p id="pmsg" class="weui-msg__desc">{{pmsg}}</p>
        </div>
        <p class="weui-msg__desc"></p>
        <p class="weui-btn-area">
          <a v-on:click="gohome()" class="weui-btn weui-btn_primary">返回</a>
        </p>
        <p></p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Year: [2018, 2019, 2020],
      CurrentYear: "",
      pmsg: ""
    };
  },
  methods: {
    gohome() {
      let ot = this;
      ot.$router.push("/");
    }
  },
  mounted() {
    let ot = this;
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