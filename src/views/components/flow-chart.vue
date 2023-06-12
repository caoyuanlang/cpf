<template>
  <div>
    <div class="flow-chart">
      <div id="main1"></div>
      <div class="close" @click="zhezhaoshow(false)"></div>
      <div class="btn1" @click="direction(1)"></div>
      <div class="btn2" @click="direction(-1)"></div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["zhezhaoshow"],
  data() {
    return {
      dataList: "",
      num: 7,
    };
  },
  mounted() {
    // 初始化人流数据表
    // this.initEcharts();
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
      this.dataList = res;
      this.direction();
    },
    direction(i) {
      let sume =
        this.num + i >= 7 && this.num + i <= 14 ? (this.num += i) : this.num;
      let res =
        this.dataList.length > 7
          ? this.dataList.slice(sume - 7, sume).reverse()
          : this.dataList;
      let time = [];
      let outNumber = [];
      let inNumber = [];
      res.forEach((item) => {
        time.push(item.date);
        outNumber.push(item.outNumber);
        inNumber.push(item.inNumber);
      });
      var chartDom = document.getElementById("main1");
      var myChart = this.$echarts.init(chartDom);
      window.addEventListener("resize", function () {
        myChart.resize();
      });

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
            data: time,
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              rotate: 50, // 将标签旋转角度设置为0
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
            data: inNumber,
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
            data: outNumber,
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
  },
};
</script>

<style scoped>
.flow-chart {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: calc(1188 / 1920 * 100vw);
  height: calc(740 / 1080 * 100vh);
  background: url("@/assets/dh-bg/组 69.png") no-repeat center / cover;
  padding: 20px;
}

#main1 {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: calc(960 / 1920 * 100vw);
  height: calc(640 / 1080 * 100vh);
}

.btn1,
.btn2 {
  width: calc(52 / 1920 * 100vw);
  height: calc(52 / 1920 * 100vw);
  position: absolute;
  cursor: pointer;
}

.close {
  position: absolute;
  right: 3vw;
  top: 4vh;
  cursor: pointer;
  width: calc(46 / 1920 * 100vw);
  height: calc(46 / 1920 * 100vw);
  background: url(@/assets/dh-bg/组 68.png) no-repeat left center / cover;
}

.btn1 {
  bottom: 3vh;
  left: 3vw;
  background: url(@/assets/dh-bg/组 66.png) no-repeat left center / cover;
}
.btn2 {
  right: 3vw;
  bottom: 3vh;
  background: url(@/assets/dh-bg/组 67.png) no-repeat left center / cover;
}
</style>
