<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-18 09:36:06
 * @LastEditors: caoyuanling a2607954957@foxmail.com
 * @LastEditTime: 2023-06-13 10:53:38
 * @FilePath: \vue\src\views\components\map.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="comp-map">
    <div id="map"></div>
  </div>
</template>

<script>
import { qingdao } from "@/libs/qd-map/qingdao";

export default {
  name: "comp-map",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const This = this;
      // console.log(uploadedDataURL)

      function showProvince() {
        var name = "qingdao";
        // myChart.showLoading();
        // 定义一个 echarts 实例
        var myChart = This.$echarts.init(document.getElementById("map"));
        let datas = {
          黑龙江: {
            research: 1000,
            order: 2400,
            repair: 200,
          },
        };
        let unit = '万元';
        compMap(qingdao);

        function compMap(geoJson) {
          This.$echarts.registerMap(name, geoJson);

          myChart.setOption({
            tooltip: {
              show: true,
              enterable: true, //鼠标可进入浮层内
              triggerOn: "click", // 点击触发
              backgroundColor: "white",
              padding: 10,
              extraCssText:
                "background-image:url("+import("@/assets/dh-bg/框.png")+");  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);border-radius: 24px;opacity: 0.8;border: 2px solid white;width: 174px;height: 140px;",
              textStyle: {
                color: "red",
              },
              formatter: function (params) {
                return `
              <ul class="map-tooltip">
                <li class="title">
                  <p class="circle"></p>
                  <p class="province">区域</p>
                  <p class="province-name" style="color:#04BFFC">${params.name}</p>
                </li>
                <li>
                  <p class="name" >项目数量:</p>
                  <p class="color" style="color:#04BFFC">${5}</p>
                </li>
                <li>
                  <p class="name">监控点数量:</p>
                  <p class="color" style="color:#04BFFC">${9}</p>
                </li>
              </ul>
            `;
              },
            },
            geo: {
              show: true,
              map: "qingdao",
              label: {
                normal: {
                  show: false,
                  color: "#fff",
                },
                emphasis: {
                  show: false,
                  color: "#fff",
                },
              },
              zoom: 1.2,
              roam: false,
              itemStyle: {
                normal: {
                  areaColor: "rgba(78, 159, 202, .5)",
                  borderWidth: 1,
                  borderColor: "#8dc2d6",
                  shadowColor: "rgba(80, 163, 186, .8)",
                  shadowBlur: 50,
                },
                emphasis: {
                  areaColor: "rgba(107, 176, 207, .6)",
                },
              },
            },
            series: [
              {
                type: "effectScatter",
                coordinateSystem: "geo",
                data: [
                  {
                    name: "",
                    value: [120.075966, 36.800892, 0],
                  },
                ],
                symbolSize: 14,
                label: {
                  normal: {
                    show: false,
                  },
                  emphasis: {
                    show: false,
                  },
                },
                //   itemStyle: {
                //     normal: {
                //       color: '#e93f42',
                //       shadowBlur: 5,
                //       shadowColor: '#f00'
                //     }
                //     }
                itemStyle: {
                  color: "#e93f42",
                },
              },
              {
                type: "scatter",
                coordinateSystem: "geo",
                data: [
                  {
                    name: "山东省青岛市市北区富源一路118号明翠雅庭1单元4层401室",
                    value: [120.42036504006357, 36.1097004800983, 0],
                  },
                  {
                    name: "山东省青岛市市北区富源一路118号明翠雅庭1单元4层401室",
                    value: [120.42036504006357, 36.1097004800983, 0],
                  },
                  {
                    name: "山东省青岛市市南区增城路7号海信燕岛国际公寓小区增城路7号商服楼1层2号网点室",
                    value: [120.39433776955278, 36.05488272319778, 0],
                  },
                  {
                    name: "山东省青岛市市南区徐州路98号丙班芙春天2号楼4层408室",
                    value: [120.37293214343087, 36.07913360762258, 0],
                  },
                  {
                    name: "山东省青岛市李沧区虎山路海尔公寓5号楼2单元2层202室",
                    value: [120.40810234113933, 36.172197780363774, 0],
                  },
                  {
                    name: "山东省青岛市胶州市北京东路269号御花园1号楼1单元1层102室",
                    value: [120.02547287889087, 36.265168148066195, 0],
                  },
                  {
                    name: "山东省青岛市胶州市北京东路269号御花园1号楼1单元1层101室",
                    value: [120.02547287889087, 36.265168148066195, 0],
                  },
                  {
                    name: "山东省青岛市胶州市北京东路269号御花园1号楼1单元1层101室",
                    value: [120.02547287889087, 36.265168148066195, 0],
                  },
                  {
                    name: "山东省青岛市李沧区虎山路海尔公寓5号楼2单元2层202室",
                    value: [120.40810234113933, 36.172197780363774, 0],
                  },
                  {
                    name: "山东省青岛市黄岛区舟山岛街95号小区7层706室",
                    value: [120.20898089131913, 36.04261756134677, 0],
                  },
                ],
                symbolSize: 12,
                showEffectOn: "render",
                rippleEffect: {
                  brushType: "stroke",
                },
                hoverAnimation: true,
                itemStyle: {
                  normal: {
                    color: "yellow",
                    shadowBlur: 5,
                    shadowColor: "yellreow",
                  },
                },
              },

              {
                type: "map",
                mapType: "qingdao",
                aspectScale: 0.75,
                zoom: 1.2,
                geoIndex: 1,
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      color: "#fff",
                    },
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      color: "#fff",
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    borderColor: "#9dc6d6",
                    areaColor: "rgba(78, 159, 202, .8)",
                  },
                  emphasis: {
                    areaColor: "#6bb0cf",
                  },
                },
                animation: false,
                data: [
                  {
                    name: "市北区",
                    value: 338,
                  },
                  {
                    name: "市南区",
                    value: 284,
                  },
                  {
                    name: "李沧区",
                    value: 103,
                  },
                  {
                    name: "黄岛区",
                    value: 84,
                  },
                  {
                    name: "城阳区",
                    value: 74,
                  },
                  {
                    name: "崂山区",
                    value: 48,
                  },
                  {
                    name: "即墨市",
                    value: 48,
                  },
                  {
                    name: "胶州市",
                    value: 34,
                  },
                  {
                    name: "平度市",
                    value: 16,
                  },
                  {
                    name: "莱西市",
                    value: 11,
                  },
                ],
              },
            ],
            visualMap: {
              show: false,
              min: 11,
              max: 338,
              left: "left",
              top: "bottom",
              text: ["高", "低"],
              seriesIndex: [2],
              inRange: {
                color: ["#2d5e87", "#204765"],
              },
              textStyle: {
                color: "#fff",
              },
            },
          });
        }
        myChart.on("click", (params) => {
          console.log(params);
        });
      }

      var currentIdx = 0;

      showProvince();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comp-map {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#map {
  width: 66%;
  height: 75%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>
