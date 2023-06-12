<template>
  <div class="pf-map">
    <h1 class="title">
      <Time></Time>
      <img
        src="../../assets/dh-bg/gong.png"
        style="vertical-align: middle"
        width="28px"
        alt=""
      />
      青岛公积金-中国工商银行青岛市分行2199智慧信贷系统
      <img
        src="../../assets/dh-bg/title.png"
        style="vertical-align: middle"
        width="28px"
        alt=""
      />
    </h1>
    <img
      src="@/assets/dh-bg/manage.png"
      class="manageBtn"
      width="30px"
      @click="$router.push('/backend/system/user')"
      alt="管理端"
    />
    <div class="tltleFrame"></div>
    <div class="adapter" id="adapter">
      <!-- 地图组件 -->
        <compMap></compMap>
      <div class="dataList">
        <h1 class="listTitle">机构列表</h1>
        <div><span>序号</span><span>机构名称</span><span>项目数量</span></div>
        <div v-for="(item, index) in listArr" :key="index">
          <span>{{ index + 1 }}</span
          ><span @click="show=true">{{ item.name }}</span
          ><span>{{ item.num }}</span>
        </div>
      </div>

      <div class="videoList" @click="show=false" v-if="show">
        <img style="float: right;" src="@/assets/dh-bg/button.png" alt="">
        <h1 class="listTitle1">项目列表</h1>
        <div><span>序号</span><span>项目名称</span><span>操作</span></div>
        <!-- <div v-for="(item, index) in monitorArr" :key="index">
          <span>{{ index + 1 }}</span
          ><span>{{ item.projectName }}</span
          ><span style="cursor: pointer" @click="getMonitor">查看</span>
        </div> -->
        <div>
          <span> 1</span><span>黄岛碧桂园朱山郡项目</span>
          <span style="cursor: pointer" @click="getMonitor">查看</span>
        </div>
        <div>
          <span> 1</span><span>青岛金王集团有限公司项目</span
          ><span style="cursor: pointer" @click="getMonitor1">查看</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" src="../../../public/js/dhhls.min.js"></script>

<script>
// 地图组件
import compMap from "../components/comp-map.vue";
import Time from "../components/time/time.vue";

export default {
  components: {
    compMap,
    Time,
    dhPlayer: () => import("../components/dh-player.vue"),
  },
  data() {
    return {
      btnShow: false,
      show:false,
      listArr: [
        { id: 1, name: "平度市", num: 3 },
        { id: 2, name: "崂山区", num: 5 },
        { id: 3, name: "李沧区", num: 7 },
        { id: 4, name: "黄岛市", num: 9 },
        { id: 5, name: "即墨区", num: 13 },
        { id: 6, name: "市南区", num: 1 },
      ],
      monitorArr: [
        { id: 1, name: "黄岛碧桂园朱山郡项目", num: "查看" },
        { id: 2, name: "黄岛碧桂园朱山郡项目", num: "查看" },
        { id: 3, name: "青岛金王集团有限公司项目", num: "查看" },
        { id: 4, name: "青岛金王集团有限公司项目", num: "查看" },
        { id: 5, name: "青岛金王集团有限公司项目", num: "查看" },
        { id: 6, name: "李沧上流和苑项目", num: "查看" },
      ],
    };
  },

  created() {},

  mounted() {
    //初始化自适应  ----在刚显示的时候就开始适配一次
    this.handleScreenAuto();
    //绑定自适应函数   ---防止浏览器栏变化后不再适配
    window.onresize = () => this.handleScreenAuto();
    //  获取所有设备ID
    this.deviceId();
    // 获取机构
    this.institution();
    this.projectList();
    this.getRouters();
  },

  deactivated() {
    window.onresize = null;
  },
  methods: {
    /**
     * @函数功能: 获取菜单根据菜单判断是否可以进管理页面
     * @出口参数:
     * @函数备注:
     */
    async getRouters() {
      let res = await this.$http.get(this.$util.prodBaseUrl + "/getRouters");
      res.data.length > 0 ? (this.btnShow = true) : (this.btnShow = false);
    },

    /**
     * @函数功能: 获取所有设备ID
     * @出口参数:
     * @函数备注:
     */
    async deviceId() {
      let res = this.$http.post(
        this.$util.prodBaseUrl + "/api/channelinfo/list"
      );
    },
    /**
     * @函数功能: 获取机构
     * @出口参数:
     * @函数备注:
     */
    async institution() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/system/dept/deptCount"
      );
      this.listArr = res;
    },

    async projectList() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/projectInfo/list"
      );
      this.monitorArr = res.rows;
    },

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
    getMonitor() {
      // this.show=!this.show;
      this.$router.push({
        name: "tvideo",
        params: { channelCode: "1000233$1$0$0", deviceCode: "1000233" },
      });
    },
    getMonitor1() {
      // this.show=!this.show;
      this.$router.push({
        name: "svideo",
        params: { channelCode: "1000233$1$0$0", deviceCode: "1000233" },
      });
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

.manageBtn {
  position: absolute;
  top: 5px;
  right: 90px;
  z-index: 5;
  cursor: pointer;
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
  flex-basis: 15%;
}

.dataList > div > span:nth-child(2) {
  flex-basis: 55%;
}

.dataList > div > span:nth-child(3) {
  flex-basis: 30%;
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
</style>
