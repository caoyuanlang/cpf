<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-29 15:27:58
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-09 10:45:25
 * @FilePath: \vue - v2.0\src\views\components\time\time.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="home" @click="$router.push('/pf')">返回首页</div>
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

.home {
  color: #fff;
  line-height: 42px;
  width: 130px;
  height: 43px;
  position: absolute;
  top: 150px;
  left: 120px;
  cursor: pointer;
  background: url(@/assets/dh-bg/组 71.png) no-repeat left center / cover;
}
</style>
