<template>
  <div>
    <div v-if="notyear" class="weui-tab">
      <div class="weui-navbar">
        <a
          v-on:click="conditionsearch(item)"
          v-for="(item ,i) in Year"
          :key="i"
          class="weui-navbar__item"
        >
          {{item}}
          <i class="weui-icon-success" v-if="item == CurrentYear" style="font-size: 18px;"></i>
        </a>
      </div>
      <div class="weui-tab__panel"></div>
    </div>
    <div v-if="notyear" class="weui-cells__title">
      <span>{{CurrentYear}}</span>
      <span>{{Tip}}</span>
    </div>

    <!-- comtent -->
    <div v-if="empty" class="weui-msg">
      <div class="weui-msg">
        <div class="weui-msg__icon-area">
          <i class="weui-icon-info weui-icon_msg"></i>
        </div>
        <div class="weui-msg__text-area">
          <h2 class="weui-msg__title">查询结果</h2>
          <p class="weui-msg__desc">
            您在
            <span>{{CurrentYear}}</span>年内没有相关业务记录
          </p>
        </div>
        <p class="weui-msg__desc"></p>
        <p class="weui-btn-area">
          <a v-on:click="gohome()" class="weui-btn weui-btn_primary">前往社保微信门户</a>
        </p>
        <p></p>
      </div>
    </div>

    <!-- 个人基本信息查询 -->
    <div v-if="gerenjiben" v-loading="true">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人编号</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac001}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>性别</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac004}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>民族</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac005}}</div>
        </div>
        <!-- <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>常住所在地地址</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae006}}</div>
        </div> -->
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人身份</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac012}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>用工形式</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac013}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>离退休状态</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac084}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>人员登记状态</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bac062}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>手机号码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac067}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>出生日期</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac006}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参加工作时间</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac007}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参保地区</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab034}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人管理码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac999}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>人员类型</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.akc021}}</div>
        </div>
      </div>
    </div>

    <!-- 养老缴费信息查询 -->
    <div v-if="yanglao">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>缴费年月</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae003}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位编码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab999}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参保地区</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab034}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位名称</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab004}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参保身份</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac066}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人管理码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac999}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>社会保障号码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac002}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费月数</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae189}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费基数</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae180}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人缴费</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae022}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位缴费</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae020}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位缴费划入</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae021}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>到账时间</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab191}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>险种类型</p>
          </div>
          <div class="weui-cell__ft">城镇企业职工基本养老保险</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>业务类别</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae316}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费类型</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aaa115_1}}</div>
        </div>
      </div>
    </div>

    <!-- 失业缴费信息查询 -->
    <div v-if="shiye">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>缴费年月</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae003}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位编码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab999}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>所属经办机构</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab034}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位名称</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab004}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参保身份</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac066}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人管理码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac999}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>社保保险号码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac002}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费月数</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae189}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费基数</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae180}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人缴费</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae022}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位缴费</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae020}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位缴费划入</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae021}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>到账时间</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab191}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>险种类型</p>
          </div>
          <div class="weui-cell__ft">工伤保险</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>业务类别</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae316}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费类型</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aaa115_1}}</div>
        </div>
      </div>
    </div>

    <!-- 工伤缴费信息查询 -->
    <div v-if="gongshang">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>缴费年月</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae003}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位编码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab999}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参保地区</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab034}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位名称</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab004}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参保身份</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac066}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人管理码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac999}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>社会保障号码</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac002}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费月数</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae189}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费基数</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae180}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人缴费</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae022}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位缴费</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae020}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位缴费划入</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae021}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>到账时间</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab191}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>险种类型</p>
          </div>
          <div class="weui-cell__ft">工伤保险</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>业务类别</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae316}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费类型</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aaa115_1}}</div>
        </div>
      </div>
    </div>

    <!-- 退休认证信息查询 -->
    <div v-if="yanglaotxrz">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>所属区</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.baf307}}</div>
        </div>
        <!-- <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>居住地址</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae006}}</div>
        </div> -->
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位名称</p>
          </div>
          <div class="weui-cell__ft">{{itemdata. aab069}}</div>
        </div>
        
        <!-- <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>登记地址</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bze001}}</div>
        </div> -->
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>险种类型</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae140}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>待遇发放状态</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae116}}</div>
        </div>
       
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>最后一次认证结果</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aaa094}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>最后一次认证方式</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bic734}}</div>
        </div>
         <div class="weui-cell" style="font-weight:700">
          <div class="weui-cell__bd">
            <p>最后一次认证时间</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae230}}</div>
        </div>
      </div>
    </div>

    <!-- 职工医保 -->
    <div v-if="zgyb">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>所属年月</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAE003}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位名称</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAB004}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费基数</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAE180}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位缴费金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.DWTC}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位划入个账金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.DWZH}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人缴费金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.GRZH}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>合计金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.HJ}}元</div>
        </div>
      </div>
    </div>

    <!-- 城乡医保 -->
    <div v-if="cxyb">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费所属期</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAE003}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAE020}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>户主</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAE044}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>户主地址</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAC010}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>所属经办机构</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAB034}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费方式</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.BAC180}}</div>
        </div>
      </div>
    </div>

    <!-- 补充医保 -->
    <div v-if="bcyb">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>所属年月</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAE003}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位名称</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAB004}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.HJ}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费标志</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.BAE152}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>所属经办机构</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAB034}}</div>
        </div>
      </div>
    </div>

    <!-- 生育保险 -->
    <div v-if="syyb">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>所属年月</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAE003}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位名称</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAB004}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>缴费基数</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAE180}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位缴费比例</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.DWBL}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>单位缴费金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.DWTC}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>合计金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.HJ}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>所属经办机构</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAB034}}</div>
        </div>
      </div>
    </div>

    <!-- 医保个账 -->
    <div v-if="ybgz">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>所属年月</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.ZZ_FFNY_19}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>待遇金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.ZZ_HBJE_19}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>发放方式</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.ZZ_KZLX_19}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>所属经办机构</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.AAB034_19}}</div>
        </div>
      </div>
    </div>

    <!-- 人员参保信息 -->
    <div v-if="yycbxx">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>个人参保日期</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac030}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参保组织编号</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab001}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人编号</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac001}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>险种类型</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae140}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参保身份</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac066}}</div>
        </div>
      
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人缴费状态</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac031}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>首次参保日期</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac049}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>参保地区</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aab034}}</div>
        </div>
      </div>
    </div>

    <!-- 职工养老发放信息查询 -->
    <div v-if="zgylff">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>发放年月</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae003}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>待遇类型</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bad305}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>待遇金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae019}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>发放渠道</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae145}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>发放状态</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae023}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>支付银行</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae118}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>所属区</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.baf307}}</div>
        </div>
      </div>
    </div>

    <!-- 失业待遇发放信息查询 -->
    <div v-if="sydyff">
      <div v-if="empty == false" class="weui-cells" style="font-size:12px">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div class="weui-cell__ft">{{Account.name}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>证件号码</p>
          </div>
          <div class="weui-cell__ft">{{Account.idcard}}</div>
        </div>
      </div>

      <div
        :v-if="empty == false"
        v-for="itemdata in responsedata"
        :key="itemdata"
        class="weui-cells"
        style="font-size:12px"
      >
        <div class="weui-cell" style="background-color:#FFFFF0">
          <div class="weui-cell__bd">
            <p>发放年月</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae003}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>所属区</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.baf307}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>待遇项目</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aaa036}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>应付类型</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aaa088}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>个人编号</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aac001}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>发放银行</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae118}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>户名</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae009}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>银行账号</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae010}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>支付状态</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bae023}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>业务类别</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.bad305}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>实发金额</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.aae019}}元</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>失业时间</p>
          </div>
          <div class="weui-cell__ft">{{itemdata.ajc090}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "allquery",
  data() {
    return {
      value: "",
      notyear: true,
      Account: null,
      Year: [2018, 2019, 2020],
      CurrentYear: "2020",
      Tip: "",
      empty: false,
      gerenjiben: false, //个人基本信息
      yanglao: false, //养老
      shiye: false, //失业
      gongshang: false, //工伤
      yanglaotxrz: false, //养老退休认证
      zgyb: false, //职工医保
      cxyb: false, //城乡医保
      bcyb: false, //补充医保
      syyb: false, //生育医保
      ybgz: false, //医保个账
      yycbxx: false, //人员参保信息
      zgylff: false, //职工养老发放信息查询
      sydyff: false, //失业待遇发放信息查询
      TYWT_GRJBXX_GGCX_01: [], //个人基本信息查询
      TYWT_ZGSB_GGCX_01: [], //养老缴费信息查询
      TYWT_ZGSB_GGCX_02: [], //失业缴费信息查询
      TYWT_ZGSB_GGCX_04: [], //工伤缴费信息查询
      TYWT_YLTXRZ_01: [], //养老退休认证信息查询
      responsedata: [] //存放数据
    };
  },
  methods: {
    gohome() {
      this.$router.push("/");
    },
    conditionsearch(y) {
      //点击年份
      let ot = this;
      let flag = this.$store.getters.getFlag;
      ot.responsedata = [];
      ot.CurrentYear = y;
      let url = ``;
      switch (flag) {
        case "TYWT_GRJBXX_GGCX_01":
          //个人基本信息查询
          ot.notgeren = false;
          ot.gerenjiben = true;
          ot.Tip = "年个人基本信息查询 业务查询结果：";
          url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
          break;
        case "TYWT_ZGSB_GGCX_01":
          //养老缴费信息查询
          ot.yanglao = true;
          ot.Tip = "年养老缴费信息查询 业务查询结果：";
          url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
          break;
        case "TYWT_ZGSB_GGCX_02":
          //失业缴费信息查询
          ot.shiye = true;
          ot.Tip = "年失业缴费信息查询 业务查询结果：";
          url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
          break;
        case "TYWT_ZGSB_GGCX_04":
          //工伤缴费信息查询
          ot.gongshang = true;
          ot.Tip = "年工伤缴费信息查询 业务查询结果：";
          url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
          break;
        case "TYWT_YLTXRZ_01":
          //养老退休认证信息查询
          ot.notyear = false;
          ot.yanglaotxrz = true;
          ot.Tip = "年养老退休认证信息查询 业务查询结果：";
          url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
          break;
        case "07":
          //职工医保
          ot.zgyb = true;
          ot.Tip = "年职工医保信息查询 业务查询结果：";
          url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
          break;
        case "12":
          //城乡医保
          ot.cxyb = true;
          ot.Tip = "年城乡医保信息查询 业务查询结果：";
          url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
          break;
        case "11":
          //补充医保
          ot.bcyb = true;
          ot.Tip = "年补充医保信息查询 业务查询结果：";
          url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
          break;
        case "10":
          //生育保险
          ot.syyb = true;
          ot.Tip = "年生育保险信息查询 业务查询结果：";
          url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
          break;
        case "19":
          //医保个账
          ot.ybgz = true;
          ot.Tip = "年医保个账信息查询 业务查询结果：";
          url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
          break;
        case "TYWT_RYCBXX_01":
          //人员参保信息
          ot.yycbxx = true;
          ot.Tip = "年人员参保信息 业务查询结果：";
          url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
          ot.notyear = false;
          break;
        case "TYWT_ZGYL_DYCX_01":
          //职工养老发放信息查询
          ot.zgylff = true;
          ot.Tip = "年职工养老发放信息查询 业务查询结果：";
          url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
          break;
        case "TYWT_SYE_DYCX_03":
          //失业待遇发放信息查询
          ot.sydyff = true;
          ot.Tip = "年失业待遇发放信息查询 业务查询结果：";
          url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
          ot.notyear = false;
          break;
        default:
          break;
      }

      $.showLoading("查询中......");
      ot.$axios
        .get(url)
        .then(res => {
          let code = res.data.code;
          $.hideLoading();
          switch (code) {
            case 1:
              if (res.data.data == null) {
                ot.empty = true;
                ot.responsedata = [];
              } else {
                ot.empty = false;
                ot.responsedata = res.data.data.resultBody.queryList;
              }

              $.toast("查询成功!",500);
              break;
            case 0:
              if (res.data.data == null) {
                ot.empty = true;
                ot.responsedata = [];
              } else {
                ot.empty = false;
                ot.responsedata = res.data.data.resultBody.queryList;
              }
              $.toast("查询成功!",500);
              break;
            //都是失败
            default:
              ot.empty = true;
              break;
          }
          console.log(res);
        })
        .catch(err => {
          $.hideLoading();
          $.toast("查询失败!", "cancel");
          console.log(err);
        });
    }
  },
  mounted() {
    let ot = this;
    /**
     * 获取参数(flag)，判断是哪个查询
     * 接口接收openid参数
     */
    let flag = this.$store.getters.getFlag;
    ot.responsedata = [];
    ot.Account = JSON.parse(window.localStorage.getItem("setAccount"));
    //新需求和原来保存的接口地址不一样
    let url = ``;
    //ot.Account = {openid : 'orbc0v308yshrgiLAVcRLIH1fgfY'}
    switch (flag) {
      case "TYWT_GRJBXX_GGCX_01":
        //个人基本信息查询
        ot.notyear = false;
        ot.gerenjiben = true;
        ot.Tip = "";
        url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
        break;
      case "TYWT_ZGSB_GGCX_01":
        //养老缴费信息查询
        ot.yanglao = true;
        ot.Tip = "年养老缴费信息查询 业务查询结果：";
        url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
        break;
      case "TYWT_ZGSB_GGCX_02":
        //失业缴费信息查询
        ot.shiye = true;
        ot.Tip = "年失业缴费信息查询 业务查询结果：";
        url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
        break;
      case "TYWT_ZGSB_GGCX_04":
        //工伤缴费信息查询
        ot.gongshang = true;
        ot.Tip = "年工伤缴费信息查询 业务查询结果：";
        url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
        break;
      case "TYWT_YLTXRZ_01":
        //养老退休认证信息查询
        ot.notyear = false;
        ot.yanglaotxrz = true;
        ot.Tip = "年养老退休认证信息查询 业务查询结果：";
        url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
        break;
      case "07":
        //职工医保
        ot.zgyb = true;
        ot.Tip = "年职工医保信息查询 业务查询结果：";
        //url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
        url = `/web/social30/MAIN_PROC_YL_MONTH/${ot.Account.openid}/${ot.Account.idcard}/${ot.CurrentYear}`;
        break;
      case "12":
        //城乡医保
        ot.cxyb = true;
        ot.Tip = "年城乡医保信息查询 业务查询结果：";
        //url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
         url = `/web/social30/GX_05/${ot.Account.openid}/${ot.Account.idcard}/${ot.CurrentYear}`;
        break;
      case "11":
        //补充医保
        ot.bcyb = true;
        ot.Tip = "年补充医保信息查询 业务查询结果：";
        url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
        break;
      case "10":
        //生育保险
        ot.syyb = true;
        ot.Tip = "年生育保险信息查询 业务查询结果：";
        //url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
         url = `/web/social30/MAIN_PROC_SY_MONTH/${ot.Account.openid}/${ot.Account.idcard}/${ot.CurrentYear}`;
        break;
      case "19":
        //医保个账
        ot.ybgz = true;
        ot.Tip = "年医保个账信息查询 业务查询结果：";
        //url = `/web/oldsocial/query/${ot.Account.openid}/${ot.Account.idcard}/${flag}/${ot.CurrentYear}`;
         url = `/web/social30/YIL_03/${ot.Account.openid}/${ot.Account.idcard}/${ot.CurrentYear}`;
        break;
      case "TYWT_RYCBXX_01":
        //人员参保信息
        ot.yycbxx = true;
        ot.Tip = "年人员参保信息 业务查询结果：";
        url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
         ot.notyear = false;
        break;
      case "TYWT_ZGYL_DYCX_01":
        //职工养老发放信息查询
        ot.zgylff = true;
        ot.Tip = "年职工养老发放信息查询 业务查询结果：";
        url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
        break;
      case "TYWT_SYE_DYCX_03":
        //失业待遇发放信息查询
        ot.sydyff = true;
        ot.Tip = "年失业待遇发放信息查询 业务查询结果：";
        url = `/web/social/${flag}?openid=${ot.Account.openid}&idcard=${ot.Account.idcard}&year=${ot.CurrentYear}`;
        ot.notyear = false;
        break;
      default:
        ot.notyear = false;
        ot.Tip = "";
        break;
    }

    $.showLoading("查询中......");
    ot.$axios
      .get(url)
      .then(res => {
        let code = res.data.code;
        $.hideLoading();
        switch (code) {
          case 1:
            if (res.data.data == null) {
              ot.empty = true;
              ot.responsedata = [];
            } else {
              ot.empty = false;
              ot.responsedata = res.data.data.resultBody.queryList;
            }
            $.toast("查询成功!",500);
            break;
          case 0:
            if (res.data.data == null) {
              ot.empty = true;
              ot.responsedata = [];
            } else {
              ot.empty = false;
              ot.responsedata = res.data.data.resultBody.queryList;
            }
            $.toast("查询成功!",500);
            break;
          //都是失败
          default:
            ot.empty = true;
            break;
        }
        console.log(res);
      })
      .catch(err => {
        $.hideLoading();
        $.toast("查询失败!", "cancel");
        console.log(err);
      });
    console.log("进入查询页面");
  },
  created() {
    let ot = this;
    ot.CurrentYear = new Date().getFullYear();
    ot.Year = [ot.CurrentYear - 2, ot.CurrentYear - 1, ot.CurrentYear];
    console.log(new Date().getFullYear());
  },
  destroyed() {
    $.hideLoading();
  }
};
</script>

<style>
p {
  font-size: 14px;
}

.weui-cell__ft {
  font-size: 14px;
}
</style>
