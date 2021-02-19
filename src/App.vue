<template>
  <div id="app" style="margin-top:-0px">
    <router-view v-on:footer="footer"  />
    <play-footer v-if="show"  ></play-footer>
  </div>
</template>

<script>
import Footer from './views/shared/footer.vue'
export default {
  name: "App",
  data(){
    return {
      show:true
    }
  },
  components:{ 'play-footer':Footer },
  methods:{
      //是否显示底部
      footer:function (bool) {
        
          this.show = bool;

      }
  },
  destroyed(){
    
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.el-slider__bar {
  height: 6px;
  background-color: #1aad19;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  position: absolute;
}

.el-slider__button {
  width: 16px;
  height: 16px;
  border: 2px solid #1aad19;
  background-color: #fff;
  border-radius: 50%;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.el-slider__runway {
  width: 95%;
  height: 6px;
  margin: 16px 0;
  background-color: #e4e7ed;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
  margin-left: 10px;
}
</style>
