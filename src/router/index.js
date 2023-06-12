/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-17 09:47:30
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-09 15:51:18
 * @FilePath: \vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import Pf from "@/views/public-fund/pf-map.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  // 地图页面
  {
    path: "/pf",
    name: "pf",
    component: Pf,
    meta: {
      title: "BI大屏-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统",
      keepAlive: true  // 需要缓存 

    },

  },
  // 人流统计摄像头
  {
    path: "/tvideo/:channelCode/:deviceCode",
    name: "tvideo",
    component: () => import("@/views/public-fund/traffic-video"),
    meta: {
      title: "人流统计-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-实时监控",
      keepAlive: true  // 需要缓存 
    },

  },
  // 进度摄像头
  {
    path: "/svideo/:channelCode",
    name: "svideo",
    component: () => import("@/views/public-fund/schedule-video"),
    meta: {
      title: "进度查看-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-实时监控",
      keepAlive: true  // 需要缓存 

    },

  },
  {
    path: "/backend",
    name: "backend",
    component: () => import("@/views/backend"),
    children: [{
      path: "system/user",
      name: "user",
      meta: { title: "用户管理-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-后台管理" },
      component: () => import("@/views/system/user")

    },
    {
      path: "system/dept",
      name: "dept",
      component: () => import("@/views/system/dept"),
      meta: { title: "部门管理-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-后台管理" },


    },
    {
      path: "system/role",
      name: "role",
      component: () => import("@/views/system/role"),
      meta: { title: "角色管理-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-后台管理" },

    },
    {
      path: "device/device",
      name: "device",
      component: () => import("@/views/device/device"),
      meta: { title: "设备管理-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-后台管理" },

    },
    {
      path: "log/logininfor",
      name: "logininfor",
      component: () => import("@/views/log/logininfor"),
      meta: { title: "登录日志-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-后台管理" },

    },
    {
      path: "log/operlog",
      name: "operlog",
      component: () => import("@/views/log/operlog"),
      meta: { title: "操作日志-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-后台管理" },

    },
    {
      path: "monitor/online",
      name: "online",
      component: () => import("@/views/monitor/online"),
      meta: { title: "在线用户-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-后台管理" },

    },
    {
      path: "monitor/users",
      name: "users",
      component: () => import("@/views/monitor/users"),
      meta: { title: "用户统计-青岛公积金-中国中商银行青岛市分行2199智慧信贷系统-后台管理" },

    },

    ]
  },
];







const router = new VueRouter({
  routes,
});



// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : '';
  // 如果没有next 不会护法下一个钩子函数
  next();
})





export default router;
