<template>
  <div v-show="show">
    <div class="block">
      <span class="demonstration">
        <div class="weui-msg">
          <div class="weui-cells__title" style="text-align:left">滑动以改变大小</div>
        </div>
      </span>
      <el-slider v-model="size" :step="10" :show-tooltip="false" @change="resize()"></el-slider>
    </div>
    
    <div class="pdfList" style="position:relative;overflow:auto;">
      <!-- 填充canvas节点 -->
    </div>
  </div>
</template>

<script>
// import PDFJS from "pdfjs-dist";
import PDFJS from 'pdfjs-dist';
export default {
  name: "showpdf",
  data() {
    return {
      size: 50,
      data: "",
      b: 0.2,
      show: false,
      scale: 100
    };
  },
  methods: {
    resize() {
      //放大或缩小
      let ot = this;
      ot.showPdf();
    },
    async showPdf() {
      let ot = this;
      ot.b = ot.size / 100;
      let pdfList = document.querySelector(".pdfList"); //通过querySelector选择DOM节点,使用document.getElementById()也一样
      pdfList.innerHTML = null;
      //后台传过来的
      let base64 = ot.data; //获得bas464编码
      let decodedBase64 = atob(base64); //使用浏览器自带的方法解码
      let pdf = await PDFJS.getDocument({ data: decodedBase64 }); //返回一个pdf对象
      let pages = pdf.numPages; //声明一个pages变量等于当前pdf文件的页数
      for (let i = 1; i <= pages; i++) {
        //循环页数
        let canvas = document.createElement("canvas");
        let page = await pdf.getPage(i); //调用getPage方法传入当前循环的页数,返回一个page对象
        let scale = ot.b; //缩放倍数，1表示原始大小
        let viewport = page.getViewport(scale);
        let context = canvas.getContext("2d"); //创建绘制canvas的对象
        canvas.height = viewport.height; //定义canvas高和宽
        canvas.width = viewport.width;
        let renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext);

        canvas.className = "canvas"; //给canvas节点定义一个class名,这里我取名为canvas
        pdfList.appendChild(canvas); //插入到pdfList节点的最后
      }
      $.hideLoading();
      ot.show = true;
    },
    load() {
      let ot = this;

      ot.data = sessionStorage.getItem("pdfbase64");
      // ot.data = ot.$store.getters.getPdfdata
      ot.showPdf();
    }
  },
  mounted() {
    
    let ot = this;
    $.showLoading("载入中...");
    ot.load();
  },
  created() {
    //PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.min.js");
    PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.min.js")
  }
};
</script>

<style>

</style>