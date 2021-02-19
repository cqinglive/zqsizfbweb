/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //这里放全局参数
    value: 'test',
    flag: '',
    account: { name: '', idcard: '', socialid: '', openid: '', phone: '' },
    userinfo: null,
    wxinfo: null,
    code: '',
    oauthflag: null,
    pdfdata:'',
    iscertified:null,  //是否实名了
    notlocal:0  //是否肇庆本地参保
  },

  mutations: {
    //这里是set方法
    setValue(state, v) {
      state.value = v;
    },
    setFlag(state, f) {
      state.flag = f;
    },
    setAccount(state, a) {
      state.account = a
    },
    setUserinfo(state, a) {
      state.userinfo = a
    },
    setWxinfo(state, w) {
      state.wxinfo = w
    },
    setCode(state, c) {
      state.code = c
    },
    setOauthflag(state, c) {
      state.oauthflag = c
    },
    setPdfdata(state,c){
      state.pdfdata = c
    },
    setIscertified(state,c){
      state.iscertified = c
    },
    setNotlocal(state,c){
      state.notlocal = c
    }
  },

  getters: {
    //这里是get方法   
    getValue: state => state.value,
    getFlag: state => state.flag,
    getAccount: state => state.account,
    getUserinfo: state => state.userinfo,
    getWxinfo: state => state.wxinfo,
    getCODE: state => state.code,
    getOauthflag: state => state.oauthflag,
    getPdfdata: state => state.pdfdata,
    getIscertified: state => state.iscertified,
    getNotlocal: state => state.notlocal
  }
})
