<template>
   <div class="weui-footer" style="margin-top:20px;margin-bottom:20px">
      <p class="weui-footer__links">
        <a href="javascript:void(0);" class="weui-footer__link" v-on:click="footerevent()">肇庆社保智能服务平台</a>
      </p>
      <p class="weui-footer__text">Copyright © 2016-{{currentYear}}</p>
    </div>
</template>

<script>
export default {
    name:'footer',
    computed:{
      currentYear:{
        get(){
          return new Date().getFullYear()
        }
      }
    },
    methods:{
       footerevent(){
         let ot = this
        //  let account = JSON.parse(localStorage.getItem('setAccount'))
        //  let area = account.area
        //  if (area && area != '') {
        //    console.log('area',area)
        //    ot.$router.push('oauthbook')
        //  }
        console.log('点击了footer')
      }
    }
}
</script>

<style>

</style>