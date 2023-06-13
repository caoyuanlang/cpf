<template>
  <div>
    <div class="button">进出人流统计</div>
    <div class="more" @click="zhezhaoshow">更多</div>
    <div style="width: 480px; height: 500px; margin-left: 30px" id="main"></div>
    <h2 class="h2">日均总入：{{ avgCount.avgCount }}人</h2>
    <h2 class="h2">七日内日均入：{{ avgCount.avgSevenCount }}人</h2>
    <h2 class="h2">当前园区内总人数：{{avgCount.inNumber}}</h2>
  </div>
</template>

<script>
export default {
  inject: ["zhezhaoshow"],
  data() {
    return {
      show: true,
      avgCount: {
        avgCount: "",
        avgSevenCount: "",
      },
    };
  },
  mounted() {
    // 初始化人流数据表
    this.initEcharts();
    // 获取日均总入，七日内日均入
    this.getAvgCount();
  },
  methods: {
    /**
     * @函数功能: 初始化人流数据表
     * @出口参数:
     * @函数备注: 使用 echarts
     */
    async initEcharts() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/number/list"
      );
      let time = [];
      let outNumber = [];
      let inNumber = [];
      res.forEach((item) => {
        time.push(item.date);
        outNumber.push(item.outNumber);
        inNumber.push(item.inNumber);
      });

      var chartDom = document.getElementById("main");
      var myChart = this.$echarts.init(chartDom);

      var option;
      option = {
        // title: {
        //   text: "进出人流统计",
        //   left:55,
        //   textStyle: { color: "#D5E2FF", fontSize: 34,fontWeight:400 },
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          right: "40",
          feature: {
            // dataView: {
            //   title: "数据视图",
            //   show: true,
            //   readOnly: false,
            //   lang: ["数据视图", "关闭", "刷新"],
            // },
            magicType: {
              show: true,
              type: ["line", "bar"],
              title: {
                line: "切换为折线图",
                bar: "切换为柱状图",
              },
            },
            restore: { title: "还原", show: true },
            // saveAsImage: { title: "保存为图片", show: true },
          },
        },
        legend: {
          data: ["进入", "离开", "折线"],
          formatter: function (name) {
            return "{a|" + name + "}";
          },
          textStyle: {
            color: "#000000",
            fontWeight: 400,
            fontSize: 28,
            lineHeight: 20,
            rich: {
              a: {
                fontSize: 18,
                verticalAlign: "bottom",
              },
            },
          },
        },
        textStyle: {
          color: "#fff",
        },
        xAxis: [
          {
            type: "category",
            data: time.splice(0, 5).reverse(),
            axisLabel: {
              rotate: 50, // 将标签旋转角度设置为0
            },
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "人数",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} 人",
            },
          },
        ],
        series: [
          {
            name: "进入",
            type: "bar",
            itemStyle: {
              color: "#3678a1",
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + " 人";
              },
            },
            data: inNumber.splice(0, 5).reverse(),
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
          },
          {
            name: "离开",
            type: "bar",
            itemStyle: {
              color: "#6990e7",
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + " 人";
              },
            },
            data: outNumber.splice(0, 5).reverse(),
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
          },
          // {
          //   name: "折线",
          //   type: "line",
          //   yAxisIndex: 0,
          //   tooltip: {
          //     valueFormatter: function (value) {
          //       return value + " 人";
          //     },
          //   },
          //   data: [
          //     2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
          //   ],
          // },
        ],
      };

      option && myChart.setOption(option);
    },
    /**
     * @函数功能: 显示大的人流统计表
     * @出口参数:
     * @函数备注:
     */

    /**
     * @函数功能: 获取日均总入，七日内日均入
     * @出口参数:
     * @函数备注:
     */
    async getAvgCount() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/number/avgCount"
      );
      let request = await this.$http.post(
        this.$util.prodBaseUrl + "/api/number/pepoleCounting"
      );
      if (res.code === 200) {
        this.avgCount = res.data;
        this.avgCount.inNumber = request.inNumber;
      }
    },
  },
};
</script>

<style scoped>
div {
  --text-color: #d5e2ff;
}

.button {
  padding-left: 8px;
  font-weight: 400;
  font-size: 34px;
  margin-left: 70px;
  width: 220px;
  height: 48px;
  color: var(--text-color);
  background: url("@/assets/dh-bg/arrow.png") no-repeat left center / 9px 12px;
}
.more {
  margin-left: 70px;
  width: 85px;
  height: 42px;
  line-height: 42px;
  background: url("@/assets/dh-bg/矩形1.png") no-repeat left center / cover;
  cursor: pointer;
  color: var(--text-color);
}
.h2 {
  text-align: left;
  color: #fff;
  padding-left: 40px;
}
</style>
