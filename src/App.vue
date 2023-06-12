<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-17 09:47:30
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-09 16:57:49
 * @FilePath: \vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <!-- <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" id="screen" />
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" id="screen" />

  </div>
</template>

<script>
export default {
  async beforeDestroy() {
    // 标签关闭用当前时间减去进入页面时间统计出使用时长
    let useTime = new Date() - sessionStorage.userTime;
    sessionStorage.removeItem("userTime");

    this.$http.post(this.$util.prodBaseUrl + "/api/userStatistics/countTime", {
      useTime,
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

html,
body {
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.screen-root {
  height: 100%;
  width: 100%;
}

#dhHlsVideoWrappervideoElement {
  width: auto !important;
  height: auto !important;
}
#dhHlsVdieoCloseBtnvideoElement {
  display: none;
}
</style>
