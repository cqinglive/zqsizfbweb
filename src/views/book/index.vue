<template>
  <div>
    <div class="weui-cells__title" style="text-align:left">请您提供下列申请材料。</div>
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">联系人</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="contact"
          name="contact"
          v-model="name"
          type="text"
          placeholder="请输入本次申请业务的联系人名字"
        />
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">联系电话</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="phone"
          name="phone"
          type="text"
          v-model="phone"
          placeholder="请输入参保人或代办人的联系电话"
        />
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">预约业务</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="bookbusiness"
          name="bookbusiness"
          type="text"
          placeholder="请填写预约业务项目"
        />
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">办理业务说明</label>
      </div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__bd">
        <textarea id="businessdesc" class="weui-textarea" placeholder="请输入办理业务说明" rows="3"></textarea>
      </div>
    </div>
    <div id="submit">
      <button
        id="savebusinessinfo"
        class="weui-btn weui-btn_primary"
        style="width:85%;margin-top:30px"
        v-on:click="commitbook()"
      >确认提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookindex",
  data() {
    return {
      val: "",
      area: "",
      name: "", //联系人
      phone: "" //默认电话
    };
  },
  methods: {
    commitbook() {
      //提交预约
      let contact = $("#contact").val();
      let phone = $("#phone").val();
      let bookbusiness = $("#bookbusiness").val();
      let businessdesc = $("#businessdesc").val();
      if (!contact) {
        $.toast("请输入联系人!", "cancel");
        return false;
      }
      if (!phone) {
        $.toast("请输入联系电话!", "cancel");
        return false;
      }
      if (!bookbusiness) {
        $.toast("请输入预约业务!", "cancel");
        return false;
      }

      let account = JSON.parse(window.localStorage.getItem("setAccount"));

      let ot = this;
      let postdata = new Object();
      postdata.Openid = account.openid;
      postdata.Idnumber = account.idcard;
      postdata.Contact = contact;
      postdata.Phone = phone;
      postdata.Bookitem = bookbusiness;
      postdata.Businessdesc = businessdesc;
      $.showLoading("预约中...");
      ot.$axios
        .get(`/web/oldsocial/querytest/${account.openid}/${account.idcard}/21`)
        .then(res => {
          let response = res.data;
          if (response.code == 0) {
            console.log("response", response);
            let curdata = response.data.resultBody.queryList[0];
            console.log("currentdata", curdata);
            ot.area = curdata.AAB034_ID;
            postdata.Area = ot.area;
            ot.$axios({
              url: `/web/bookbusiness/BookBusiness`,
              method: "post",
              data: postdata
            })
              .then(res => {
                $.hideLoading();
                let resdata = res.data.data;
                let rescode = res.data.code;
                if (rescode == 1) {
                  $.toast(res.data.msg, 1000);

                  console.log('postdata',resdata)
                  resdata.USERNAME = account.name

                  setTimeout(function() {
                    ot.$router.push({ name: "bookdetail", params: resdata });
                  }, 1000);
                } else {
                  $.toast(res.data.msg, "cancel");
                }
                console.log(res);
              })
              .catch(err => {
                $.hideLoading();
                console.log(err);
              });
          }

          console.log("areainfo" + res);
          $.hideLoading();
        })
        .catch(err => {
          $.hideLoading();
          console.log(err);
        });
    }
  },
  mounted() {
    let ot = this;
  },
  created() {
    //默认信息填充
    let ot = this;
    let account = JSON.parse(window.localStorage.getItem("setAccount"));
    ot.name = account.name;
    ot.phone = account.phone;
  },
  destroyed() {
    $.hideLoading();
  }
};
</script>

<style>
</style>