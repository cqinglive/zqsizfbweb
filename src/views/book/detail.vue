<template>
  <div>
    <div class="weui-cells__title" style="text-align:left">您已提交的预约内容：</div>
    <!-- （1）提交人（即微信用户关联参保人姓名）:
         （2）提交时间
         （3）显示受理状态：未受理/未受理  根据acceptflag判断 -->

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
          disabled="disabled"
          placeholder="请输入本次申请业务的联系人名字"
        />
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">联系电话</label>
      </div>
      <div class="weui-cell__bd">
        <input class="weui-input" id="phone" name="phone" type="text" disabled="disabled" v-model="phone" placeholder="请输入参保人或代办人的联系电话" />
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
          v-model="business"
          type="text"
          disabled="disabled"
          placeholder="请填写预约业务项目"
        />
      </div>
    </div>
     <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">提交人</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="username"
          name="username"
          v-model="username"
          type="text"
          disabled="disabled"
          placeholder="提交人"
        />
      </div>
    </div>
     <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">提交时间</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="createdate"
          name="createdate"
          v-model="createdate"
          type="text"
          disabled="disabled"
          placeholder="提交时间"
        />
      </div>
    </div>
     <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">受理状态</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="acceptflag"
          name="acceptflag"
          v-model="acceptflag"
          type="text"
          disabled="disabled"
          placeholder="业务受理状态"
        />
      </div>
    </div>

<div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">受理机构</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="acceptflag"
          name="acceptflag"
          v-model="org"
          type="text"
          disabled="disabled"
          placeholder="业务受理状态"
        />
      </div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">联系地址</label>
      </div>
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="acceptflag"
          name="acceptflag"
          v-model="add"
          type="text"
          disabled="disabled"
          placeholder="业务受理状态"
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
          id="acceptflag"
          name="acceptflag"
          v-model="tel"
          type="text"
          disabled="disabled"
          placeholder="业务受理状态"
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
        <textarea id="businessdesc" class="weui-textarea" disabled="disabled" v-model="businessdesc" placeholder="请输入办理业务说明" rows="3"></textarea>
      </div>
    </div>
    <div id="submit">
      <button
        id="savebusinessinfo"
        class="weui-btn weui-btn_primary"
        style="width:85%;margin-top:30px"
        v-on:click="gohome()"
      >返回社保首页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookdetail",
  data() {
    return {
      val: "",
      area: "",
      name:'联系人',//联系人
      phone:'默认电话',//默认电话,
      business:'',//预约业务
      businessdesc:'',//预约业务描述
      username:'',
      createdate:'',
      acceptflag:'',
      org:'',
      add:'',
      tel:''
    };
  },
  methods: {
    gohome() {
      //提交预约
      let ot = this
      ot.$router.push('/')
    },
    	/**
     * 时间格式化，将时间格式转成字符串
     */
    formateDate(datetime) {
      // let  = "2019-11-06T16:00:00.000Z"
        function addDateZero(num) {
            return (num < 10 ? "0" + num : num);
        }
        let d = new Date(datetime);
        let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
        return formatdatetime;
    },
  },
  mounted() {
      let ot = this
      let params = ot.$route.params;
      console.log("params",params)
      ot.name = params.CONTACT
      ot.phone = params.PHONE
      ot.business = params.BOOKITEM
      ot.businessdesc = params.BUSINESSDESC
      ot.username = params.USERNAME
      ot.createdate = params.CREATEDATE
      ot.acceptflag = params.ACCEPTFLAG == "0"?"未受理":"已受理"
      ot.org = params.CITY
      ot.add = params.ADDRESS
      ot.tel = params.CONTACTMOBILE
  },
  created() {
    let ot = this;
  },
  destroyed() {
       $.hideLoading()
  }
};
</script>

<style>
</style>