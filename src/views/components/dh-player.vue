<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-18 16:23:30
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-12 14:24:06
 * @FilePath: \vue\src\views\components\dh-player.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="playerContainer">
    <!-- videoId="dhplayer" // 唯一标识
    windowType="0" // 0-实时预览，3-录像回放，7-录像回放(支持倒放)
    ref="dhplayerRef" // 通过此引用去调用dhplayer内部的方法API。
    @createSuccess="createSuccess" // 插件创建成功回调
    @createError="createError" // 插件创建失败回调 -->
    <!-- 左侧人流模块 -->
    <div class="People-counting">
      <Home></Home>
      <flowDataChart></flowDataChart>
    </div>

    <!-- 视频模块 -->
    <div class="view-bg">
      <div class="view" style="height: 462px; width: 820px">
        <div class="title1">实时监控</div>
        <DHPlayer
          videoId="dhplayer"
          ref="dhplayerRef"
          :shieldClass="['dialog','zhezhao', 'el-message-box']"
          :windowType="windowType"
          :request="ajaxRequest"
          :showBar="false"
          @createSuccess="createSuccess"
          @realSuccess="realSuccess"
          @talkSuccess="talkSuccess"
          @talkError="talkError"
          @playbackSuccess="playbackSuccess"
          @playbackError="playbackError"
          @playbackFinish="playbackFinish"
          @dbClickWindow="dbClickWindow"
        ></DHPlayer>
        <div
          style="
            width: 819px;
            text-align: left;
            overflow-x: auto;
            white-space: nowrap;
            display: flex;
            gap: 10px;
          "
        >
          <!-- <img
            class="imgs"
            v-for="(item, index) in imgArr"
            :key="index"
            :src="
              'https://140.249.211.40:7443/evo-apigw/evo-oss/' +
              item.picCode +
              '?token=' +
              dhToken
            "
          /> -->
        </div>
      </div>
      <div style="overflow：hidden;">
        <div class="title2">云台控制</div>
        <!-- <el-button
          style="position: absolute; bottom: 100px; right: 150px"
          @click="screenshot"
          round
          >回放截图</el-button
        > -->
        <div
          id="dhplayer-pan-tilt"
          style="
            width: 300px;
            height: 300px;
            margin-top: 200px;
            margin-left: 20px;
          "
        ></div>
      </div>
    </div>

    <!-- <button @click="windowType = 0">实时预览</button> -->
    <!-- <button @click="windowType = 3">录像回放</button> -->
  </div>
</template>

<script>
import DHPlayer from "./dhplayer/index.vue";
import api from "../../libs/dahua/factory";
import flowDataChart from "./flow-data-chart.vue";
import viewMixins from "@/mixins/viewMixins";
export default {
  name: "MyPlayer",
  mixins: [viewMixins],
  components: {
    DHPlayer,
    flowDataChart,
  },
  props: {
    channelCode: {
      type: String,
      required: true,
    },
    deviceCode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      windowType: 0,
      imgArr: [],
      prodDhBaseUrl: this.$util.prodDhBaseUrl,
    };
  },

  computed: {
    ajaxRequest() {
      return this.windowType === 0
        ? {
            real: this.fetchRealRtsp, // 实时预览
            talk: api.fetchTalkRtsp, // 对讲 (需要对讲则必传)
            stopTalk: api.stopTalk, // 停止对讲 (需要对讲则必传)
            setPtzDirection: api.setPtzDirection, // 云台方向控制 （使用云台则必传）
            setPtzCamera: api.setPtzCamera, // 云台镜头控制 （使用云台则必传）
          }
        : {
            playbackByTime: api.fetchPlaybackByTime, // 根据时间录像回放
            playbackByFile: api.fetchPlaybackByFile, // 根据文件录像回放
            queryRecord: api.queryRecord, // 查询录像
          };
    },
  },

  mounted() {
    // 获取回放截图
    this.imgs();
    // 初始化完成记录进入页面时间
    this.$nextTick(() => {
      this.sumTime();
    });
  },
  async beforeDestroy() {
    // 标签关闭用当前时间减去进入页面时间统计出使用时长
    let monitorTime = new Date() - sessionStorage.sumTime;
    sessionStorage.removeItem("sumTime");

    this.$http.post(this.$util.prodBaseUrl + "/api/userStatistics/countTime", {
      monitorTime,
    });
  },

  methods: {
    /**
     * @函数功能: 视频窗口双击操作
     * @出口参数:
     * @函数备注:
     */
    dbClickWindow() {
      this.$refs.dhplayerRef.setFullScreen();
    },
    // 回放截图
    async screenshot() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/video/catchDMC",
        { deviceCode: this.deviceCode, channelId: this.channelCode }
      );
    },

    /**
     * @函数功能: 获取回放图片
     * @出口参数:
     * @函数备注:
     */
    async imgs() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/picInfo/list",
        { channelCode: this.channelCode }
      );

      this.imgArr = res.data;
    },

    fetchRealRtsp(params) {
      return new Promise((resolve, reject) => {
        this.$http
          .post(this.$util.prodBaseUrl + "/api/video/startVideo", {
            channelId: this.channelCode,
          })
          .then((res) => {
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    createSuccess() {
      // 初始化云台
      this.$refs.dhplayerRef.initPanTilt("dhplayer-pan-tilt");
      this.windowType === 0 ? this.startReal() : this.startPlayback();
      this.$refs.dhplayerRef.setTabControlBtn(["BTN_CLOSE"]);
    },
    // 实时预览
    startReal() {
      let CH = this.channelCode;

      this.$refs.dhplayerRef.startReal([
        {
          channelId: CH, // 通道id
          snum: 0, // 播放的窗口序号 (从0开始计数，表示第一个窗口)
          deviceType: 5, // 设备类别 (用于对讲使用)
          cameraType: "2", // 摄像头类型 (用于云台)
          capability: "00000000000000000000000000000001", // 能力集 (用于云台)
        },
      ]);
    },
    // 录像回放
    startPlayback() {
      this.$refs.dhplayerRef.startPlayback([
        {
          channelId: "1000233$1$0$0", // 通道id
          name: "通道名称", // 通道名称
          startTime: "2022-10-26 00:00:00", // 开始时间
          endTime: "2022-10-26 23:59:59", // 结束时间
          recordSource: 2, // 2-录像 3-中心
          streamType: 0, // 0-所有码流 1-主码流  2-辅码流
          snum: 0, //  播放的窗口序号 (从0开始计数，表示第一个窗口)
        },
      ]);
    },
    realSuccess(info) {
      // 返回通道信息
      console.log("实时预览成功", info);
    },
    realError(info, err) {
      // 放回通道信息和错误提示
      console.log("实时预览失败", info, err);
    },
    talkSuccess(info) {
      // 返回通道信息
      console.log("对讲成功", info);
    },
    talkError(info, err) {
      // 返回通道信息和错误码
      console.log("对讲失败", info, err);
    },
    playbackSuccess(info) {
      // 返回通道信息
      console.log("录像播放成功", info);
    },
    playbackError(info, err) {
      // 返回通道信息和错误消息
      console.log("录像播放失败", info, err);
    },
    playbackFinish(info) {
      // 返回通道信息
      console.log("当前录像播放完成", info);
    },
    /**
     * @函数功能: 统计监控使用时长
     * @出口参数:
     * @函数备注:
     */
    sumTime() {
      // 定时每1min刷新token，如果时间间隔为半小时，停止刷新token  备注：大华接口的token
      if (!sessionStorage.sumTime) {
        sessionStorage.sumTime = +new Date();
      }
    },
  },
};
</script>

<style scoped>
.view-bg {
  display: flex;
  width: 1260px;
  height: 800px;
  position: absolute;
  right: 81px;
  bottom: 76px;
  background: url(../../assets/dh-bg/view-bg.png) no-repeat center / cover;
}

.view {
  margin-top: 110px;
  margin-left: 62px;
}

.ws-pan-tilt {
  width: 297px;
  height: 297px;
  margin-left: 62px;
  margin-top: 119px;
}

.imgs {
  width: 201px;
}

.People-counting {
  padding-top: 54px;
  width: 1762px;
  height: 826px;
  margin-top: 213px;
  margin-left: 79px;
  background: url(@/assets/dh-bg/大框.png) no-repeat left center / cover;
}

.title1,
.title2 {
  width: 200px;
  height: 42px;
  color: #fff;
  font-size: 36px;
  background: url(@/assets/dh-bg/arrow.png) no-repeat left 20px;
}
.title1 {
  margin-bottom: 19px;
}
.title2 {
  margin-top: 166px;
  margin-left: 20px;
}
</style>
