<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-17 16:54:26
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-09 16:56:54
 * @FilePath: \vue\src\views\public-fund.vue\map.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEmap
-->
<template>
  <div class="pf-map">
    <h1 class="title">
      <Time></Time>
      <img
        src="../../assets/dh-bg/title.png"
        style="vertical-align: middle"
        width="28px"
        alt=""
      />
      青岛公积金-中国工商银行青岛市分行2199智慧信贷系统
    </h1>
    <div class="tltleFrame"></div>
    <div class="adapter" id="adapter">
      <!-- 视频组件 -->
        <dhPlayer
          :channelCode="channelCode"
          :deviceCode="deviceCode"
        ></dhPlayer>
    </div>

    <div v-if="show" class="zhezhao">
      <flowChart ref="flowChart" v-if="show"></flowChart>
    </div>
  </div>
</template>
<script type="text/javascript" src="../../../public/js/dhhls.min.js"></script>

<script>
import flowChart from "../components/flow-chart.vue";
import Time from "../components/time/time.vue";
import dhPlayer from "../components/dh-player.vue"
export default {
  components: {
    Time,
    flowChart,
    dhPlayer,
  },
  data() {
    return {
      channelCode: null,
      deviceCode: null,
      show: false,
      listArr: [],
      monitorArr: [],
    };
  },
  provide() {
    return {
      zhezhaoshow: (show = true) => {
        this.show = show;
        if (show) {
          this.$nextTick(() => {
            this.$refs.flowChart.initEcharts();
          });
        }
      },
    };
  },
  mounted() {
    //初始化自适应  ----在刚显示的时候就开始适配一次
    this.handleScreenAuto();
    //绑定自适应函数   ---防止浏览器栏变化后不再适配
    window.onresize = () => this.handleScreenAuto();
    // 获取路由传递的设备通道号
    this.channelCode = this.$route.params.channelCode;
    this.deviceCode = this.$route.params.deviceCode;
  },

  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    //数据大屏自适应函数
    handleScreenAuto: () => {
      const designDraftWidth = 1920; //设计稿的宽度
      const designDraftHeight = 1080; //设计稿的高度
      //根据屏幕的变化适配的比例
      const scale =
        document.documentElement.clientWidth /
          document.documentElement.clientHeight <
        designDraftWidth / designDraftHeight
          ? document.documentElement.clientWidth / designDraftWidth
          : document.documentElement.clientHeight / designDraftHeight;
      //缩放比例
      document.querySelector(
        "#adapter"
      ).style.transform = `scale(${scale}) translate(-50%)`;
    },
  },
};
</script>

<style scoped>
.tltleFrame {
  height: 33px;
  background: url(../../assets/dh-bg/tltleFrame.png) no-repeat center / cover;
}

.title {
  color: #fff;
  font-size: 28px;
}

.pf-map {
  width: 100%;
  height: 100%;
  background: url(../../assets/login/bg2.png) no-repeat center / cover;
}

.adapter {
  display: inline-block;
  width: 1920px;
  height: 1080px;
  transform-origin: 0 0;
  position: absolute;
  /* left: calc(50% + 485px); */
  top: 0;
}

.dataList {
  width: 418px;
  height: 613px;
  background: url(../../assets/dh-bg/框.png) no-repeat center / cover;
  position: absolute;
  top: 110px;
  left: 41px;
  color: #fff;
}

.listTitle {
  font-size: 30px;
  text-align: left;
  line-height: 42px;
  margin-top: 28px;
  margin-left: 36px;
}

.dataList > div {
  height: 44px;
  background: url(../../assets/dh-bg/矩形.png) no-repeat center / cover;
  display: flex;
  font-size: 20px;
}

.dataList > div > span:nth-child(1) {
  flex-basis: 20%;
}

.dataList > div > span:nth-child(2) {
  flex-basis: 50%;
}

.dataList > div > span:nth-child(3) {
  flex-basis: 40%;
}

.videoList {
  position: absolute;
  bottom: 139px;
  right: 173px;
  width: 781px;
  height: 376px;
  background: url(../../assets/dh-bg/组\ 36.png) no-repeat center / cover;
  color: #fff;
}

.videoList > div {
  display: flex;
  font-size: 20px;
}
.listTitle1 {
  font-size: 30px;
  text-align: left;
  line-height: 42px;
  margin-top: 18px;
  margin-left: 36px;
}

.videoList > div > span:nth-child(1) {
  flex-basis: 20%;
}

.videoList > div > span:nth-child(2) {
  flex-basis: 50%;
}

.videoList > div > span:nth-child(3) {
  flex-basis: 40%;
}

.zhezhao {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
}
</style>
