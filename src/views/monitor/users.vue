<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-17 10:09:22
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-26 15:17:58
 * @FilePath: \vue - v2.0\src\views\device\device.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <comTableList
      :tableData="tableData"
      :columnObj="columnObj"
      :paginationShow="false"
    >
    </comTableList>
  </div>
</template>
<script>
import axios from "axios";
import comTableList from "../components/comTableList.vue";

export default {
  components: {
    comTableList,
  },
  data() {
    return {
      tableData: [],
      columnObj: {
        columnData: (() => {
          return [
            { prop: "userName", label: "管理员", width: "" },
            { prop: "deptName", label: "所属机构", width: "" },
            { prop: "loginTimes", label: "本周登录次数", width: "" },
            { prop: "monitorTimes", label: "监控页面查看次数", width: "" },
            {
              prop: "monitorTime",
              label: "实时监控使用时间给",
              render: (h, { row, index, column }) => {
                return [<span>{this.MillisecondToDate(row.monitorTime)}</span>];
              },
            },
          ];
        })(),
      },
    };
  },
  mounted() {
    // 获取用户统计列表
    this.getUsersList();
  },

  methods: {
    /**
     * @函数功能: 获取用户统计列表
     * @出口参数:
     * @函数备注:
     */
    async getUsersList() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/userStatistics/list",
        {}
      );
      console.log(res);
      if (res.code === 200) {
        this.tableData = res.data;
      }
    },
    // 时间格式化
    MillisecondToDate(msd) {
      var time = parseFloat(msd) / 1000;
      if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
          time =
            parseInt(time / 60.0) +
            "分钟" +
            parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
            "秒";
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
          time =
            parseInt(time / 3600.0) +
            "小时" +
            parseInt(
              (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
            ) +
            "分钟" +
            parseInt(
              (parseFloat(
                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
              ) -
                parseInt(
                  (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
                )) *
                60
            ) +
            "秒";
        } else {
          time = parseInt(time) + "秒";
        }
      } else {
        time = "0 时 0 分0 秒";
      }
      return time;
    },
  },
};
</script>
