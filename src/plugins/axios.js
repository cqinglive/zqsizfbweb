/* eslint-disable */

import Vue from 'vue';
import axios from 'axios';
import router from '../router'

// // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.common["token"] = localStorage.getItem('token') == null?"":localStorage.getItem('token')

// axios.defaults.baseURL = "http://test.jiahangit.com.cn:8086";
// axios.defaults.baseURL = "https://wechat.zqsi.gov.cn/";
// axios.defaults.baseURL = "https://wechat-test.zqsi.gov.cn/"
// axios.defaults.baseURL = "https://alipay-test.zqsi.gov.cn/"
// axios.defaults.baseURL = "https://alipay.zqsi.gov.cn/"
axios.defaults.baseURL = "https://alipay.gdzqsi.cn/"
// axios.defaults.baseURL = "http://localhost:8088";


//请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log('请求错误',error)
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  function (config) {
    // // 对响应数据做点什么
    
    return config;
  },
  function (error) {
    // // 对响应错误做点什么
    
    return Promise.reject(error);
  }
);
Vue.prototype.$axios = axios;
