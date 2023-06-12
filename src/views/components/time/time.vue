<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-29 15:27:58
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-09 12:15:32
 * @FilePath: \vue - v2.0\src\views\components\time\time.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <span class="timeLeft time">{{ time1 + "  " + time2 }}</span>
    <span class="timeRight time">{{ time3 }}</span>

    <!-- <i class="el-icon-s-custom user time" @click="logout"></i> -->
    <img src="@/assets/dh-bg/user.png" @click="logout" width="30px" class="user time" alt="退出登录">
  </div>
</template>
<script>
export default {
  data() {
    return {
      time1: "",
      time2: "",
      time3: "",
      timer: "",
    };
  },
  mounted() {
    // 获取当前日期
    this.time1 = this.$utils.toDateString(new Date(), "yyyy-MM-dd");
    this.time2 = this.$utils.toDateString(new Date(), "E");

    this.timer = setInterval(() => {
      this.time3 = this.$utils.toDateString(new Date(), "HH:mm:ss");
    }, 1000);
  },
  methods: {
    /**
     * @函数功能: 退出登录
     * @出口参数:
     * @函数备注:
     */
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post(this.$util.prodBaseUrl + "/logout").then(() => {
            location.href = "/";
          });
        })
        .catch(() => {});
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.time {
  font-size: 16px;
  position: absolute;
  top: 10px;
}
.timeLeft {
  left: 50px;
}
.timeRight {
  right: 150px;
}
.user {
  top: 4px;
  right: 120px;
  cursor: pointer;
}
</style>
