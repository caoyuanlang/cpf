/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-17 09:47:30
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-30 15:24:05
 * @FilePath: \vue\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { http } from "./request/http"
import * as echarts from "echarts";


import XEUtils from 'xe-utils'
import VXEUtils from 'vxe-utils'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Home from "@/views/GlobalComponents/home";
Vue.component("Home", Home)


Vue.use(VXEUtils, XEUtils, { mounts: ['cookie'] })
XEUtils.setup({
  formatStringMatchs: {
    E: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  }
});
Vue.use(ElementUI);

Vue.prototype.$echarts = echarts;
Vue.prototype.$http = http;
Vue.prototype.$util = http.util;



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
