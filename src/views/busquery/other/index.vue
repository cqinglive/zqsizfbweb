<template>
  <div style="height:400px;margin-bottom:100px">
    <div class="weui-msg__opr-area" style="margin-top:20px">
      <button
        type="button"
        id="nextstep"
        v-on:click="searchself()"
        class="weui-btn weui-btn_primary"
        style="width:80%"
      >本人养老资格认证查询</button>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label" >姓名</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="username"
          name="username"
          type="text"
          placeholder="代查他人时输入他人姓名"
        />
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label" >身份证号</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="idnumber"
          name="idnumber"
          type="text"
          placeholder="代查他人时输入他人身份证号"
        />
      </div>
    </div>
    <div class="weui-msg__opr-area">
      <button
        type="button"
        id="searchother"
        v-on:click="searchother()"
        class="weui-btn weui-btn_primary"
        style="width:80%"
      >代他人查询养老资格认证</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "query",
  data() {
    return {};
  },
  methods: {
    searchself() {
      //查自己
      let ot = this;
      ot.$store.commit("setFlag", "TYWT_YLTXRZ_01");
      ot.$router.push("allquery");
    },
    searchother() {
      //代查他人
      let ot = this
      let name = $("#username").val();
      let idnum = $("#idnumber").val();
      let account = JSON.parse(localStorage.getItem("setAccount"))
      console.log('otherindexaccount',account)
      if (name == "") {
        $.toptip("请输入姓名!", "error");
        return false;
      }
      if (idnum == "") {
        $.toptip("请输入身份证号码!", "error");
        return false;
      }
      ot.$router.push({name:"otherquery",params:{name:name,idcard:idnum}})
    }
  },
  created() {
    let ot = this;
  }
};
</script>