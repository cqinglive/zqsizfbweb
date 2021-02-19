<template>
  <div style="height:400px;margin-bottom:100px">
    <div class="weui-msg">
      <div class="weui-cells__title" style="text-align:left">
        本功能是专门提供参保人通过肇庆市社保经办机构自助服务终端打印职工医疗保险、
        生育保险相关报表的验证功能（温馨提示：不支持养老、失业和工伤保险自助服务终端打印报表验证，具体查验方式请按报表说明操作）</div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">报表验证码</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="username"
          name="username"
          type="text"
          v-model="code"
          @input="codeinput($event)"
          placeholder="请输入报表右上方验证码"
          maxlength="20"
        />
      </div>
    </div>
    <div class="weui-msg__opr-area">
      <button
        type="button"
        id="searchother"
        v-on:click="submit()"
        class="weui-btn weui-btn_mini weui-btn_primary"
      >提交</button>
    </div>
  </div>
</template>

<script>
//20200509163012081714
export default {
  name: "querypdf",
  data() {
    return {
      code: ""
    };
  },
  methods: {
    codeinput(e) {
      let ot = this;
      ot.code = e.target.value;
    },
    submit() {
      let ot = this;
      if (ot.code.length < 20) {
        $.toast("请输入正确的验证码!", "cancel");
        setTimeout(function() {
          $.hideLoading();
        }, 1500);
        return;
      }
      $.showLoading("查询中...");
      ot.$axios
        .get(`/web/file/exportbase64pdf/${ot.code}`,{
          headers:{
                "token":localStorage.getItem('token')
              }
        })
        .then(resp => {
          
          $.hideLoading();
          let data = resp.data;
          let code = data.code;
          if (code == 0) {
            //报表正常
            sessionStorage.setItem("pdfbase64", data.data);
            // ot.$store.commit('setPdfdata',data.data)
            ot.$router.push("showpdf");
          } else {
            //异常
            $.toast(data.data, "cancel");
            setTimeout(function() {
              $.hideLoading();
            }, 1000);
            return;
          }
        })
        .catch(err => {
          $.hideLoading();
          console.log(err);
        });
      console.log("submit");
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

<style scoped>
.weui-msg__opr-area {
  margin-bottom: 25px;
  text-align: center;
}
</style>