<template>
  <div>
    <div class="grid__2k">
      <div class="posRel">
        <div ref="NativePlace" style="width:100%;height:500px;"></div>
        <img ref="mapSvg" id="mapSvg" class="posAbs" v-show="false" hidden style="width:500px;height:500px;top:0;" src="../../../assets/image/2.jpg">
      </div>
      <div>
        <img ref="mapSvgAreaMap" hidden style="width:100%;height:500px" src="../../../assets/image/2.jpg">
        <div ref="areaMap" style="width:100%;height:500px;"></div>
      </div>
    </div>
    
  </div>
</template>

<script>
import * as echarts from 'echarts';
import China from '@/assets/js/China.json';
import GuangXi from '../../../assets/js/GuangXi.json';
export default {
  props: {},
  components: {},
  watch: {},
  computed: {},
  data () {
    return {
    };
  },
  mounted () {
    let that = this;
    setTimeout(function () {
      that.NativePlace();
      that.initAreaMap();
    },200)
  },
  created () {},
  methods: {
    NativePlace(){
      var mydata = [
        { name: "黑龙江省",value:[128.540736,46.925779], data: 3 ,},
        { name: "广东省", value:[113.307774,23.053927],data: 30 },
        { name: "广西壮族自治区", value:[108.828032,23.762308],data: 3000 },
      ]
      var myChart = echarts.init(this.$refs.NativePlace)
      let mapLabel = require('../../../assets/image/home/mapLabel.png');
      let mapIcon = require('../../../assets/image/home/mapIcon.png');
      myChart.clear()
      echarts.registerMap('mapStype', China);
      let optionMap = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name;
          }
        },
        visualMap: {
          show: true,
          type: 'piecewise',
          calculable: true,
          seriesIndex:[0],
          showLabel: true,
          itemSymbol: 'rect',
          left: 20,
          bottom: 30,
          itemWidth: 20,
          itemHeight: 6,
          inRange: {
            color: ['rgba(6, 194, 231,0.8)']
          },
          padding: 0,
          pieces: [
            { min: 400, label: '400以上', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
            { min: 300, max: 399,label: '300~399', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
            { min: 200, max: 299, label: '200~299', symbol: 'rect' },
            { min: 100, max: 199, label: '100~199', symbol: 'rect' },
            { min: 1, max: 99, label: '1~100', symbol: 'rect' },
            { min: 0, max: 0, label: '无数据', symbol: 'rect' }
          ],
          
          align: "left",
          itemGap: 5,
          textStyle: {
            color: '#fff'
          },
        },
        geo: [
          {
            map: "mapStype",
            animation:true,
            animationDurationUpdate:0.1,
            geoIndex: 1,
            zoom: 1,
            // center: this.deployInfo.center,//当前视角的中心点
            // regionHeight: 4, //地图厚度
            layoutCenter: ["50%", "44%"],
            layoutSize: "80%",
            zlevel: 4,
            show: true,
            // aspectScale: 1,
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff",
                  fontSize: "16"
                }
              },
              emphasis: {
                show: true,
                label: {
                  formatter: function(params) { // 鼠标经过的回调函数  
                    // console.log('hover', params)
                    // dataObj = params;
                    return params.name
                  },
                },
                textStyle: {
                  color: "#fff"
                }
              }
            },
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  // 隐藏地图// 为 0 时不绘制该图形
                  normal: {
                    opacity: this.regionsMap ? 1:0,
                  }
                },
                // 隐藏文字
                label: {show: false},
              }
            ],
            roam: false, // 是否允许缩放
            itemStyle: {
              normal: {
                areaColor:'rgb(26, 92, 158,0.15)',
                borderWidth: 1,
                borderColor: 'rgb(222, 238, 255,0.5)',
                shadowColor: '#1773c3',
                shadowBlur: 20,
                
              },
              emphasis: {
                borderColor: 'rgb(222, 238, 255,0.5)',
                areaColor:'rgb(26, 92, 158,0.6)',
              }
            }
          },
          // {
          //   map: "mapStype",
          //   animation:true,
          //   animationDurationUpdate:0,
          //   geoIndex: 2,
          //   zoom: 1,
          //   // center: this.deployInfo.center,//当前视角的中心点
          //   layoutCenter: ["50%", "44%"],
          //   layoutSize: "80%",
          //   zlevel: 3,
          //   // aspectScale: 1,/
          //   silent: true,
          //   label: {
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   roam: false, // 是否允许缩放
          //   regions: [
          //     {
          //       name: "南海诸岛",
          //       itemStyle: {
          //         // 隐藏地图// 为 0 时不绘制该图形
          //         normal: {opacity: this.regionsMap ? 1:0, }
          //       },
          //       // 隐藏文字
          //       label: {show: false},
          //       emphasis: {
          //         show: false
          //       }
          //     }
          //   ],
          //   itemStyle: {
          //     // areaColor:'rgb(0, 58, 140,0.5)',
          //     areaColor:'rgba(0,58,140,0.3)',
          //     shadowColor: '#1773c3',
          //     shadowBlur: 20,
          //     borderWidth: 0
          //   }
          // },
          {
            map: "mapStype",
            animation:true,
            animationDurationUpdate:0,
            geoIndex: 3,
            zoom: 1,
            // center: this.deployInfo.center,//当前视角的中心点
            layoutCenter: ["50%", "44%"],
            layoutSize: "80%",
            zlevel: 2,
            // aspectScale: 1,
            silent: true,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false, // 是否允许缩放
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  // 隐藏地图// 为 0 时不绘制该图形
                  normal: {opacity: this.regionsMap ? 1:0, }
                },
                // 隐藏文字
                label: {show: false},
                emphasis: {
                  show: false
                }
              }
            ],
            itemStyle: {
              areaColor: {
                image: this.$refs.mapSvg, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              },
              // areaColor:'rgba(0,58,140,1)',
              // shadowColor: '#1773c3',
              // shadowBlur: 20,
              // borderWidth: 0
            }
          },
          {
            map: "mapStype",
            animation:true,
            animationDurationUpdate:0,
            geoIndex: 4,
            zoom: 1,
            // center: this.deployInfo.center,//当前视角的中心点
            layoutCenter: ["50%", "45.5%"],
            layoutSize: "80%",
            zlevel: 1,
            // aspectScale: 1,
            silent: true,
            label: {
              emphasis: {
                show: false
              }
            },
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  // 隐藏地图// 为 0 时不绘制该图形
                  normal: {opacity: this.regionsMap ? 1:0, }
                },
                // 隐藏文字
                label: {show: false},
                emphasis: {
                  show: false
                }
              }
            ],
            roam: false, // 是否允许缩放
            itemStyle: {
              borderWidth: 1,
              areaColor:'#030a17',
              shadowColor: '#1773c3',
              shadowBlur: 60,
            }
          },
          {
            map: "mapStype",
            animation:true,
            animationDurationUpdate:0,
            geoIndex: 3,
            zoom: 1,
            // center: this.deployInfo.center,//当前视角的中心点
            layoutCenter: ["50%", "44%"],
            layoutSize: "80%",
            zlevel: 2,
            // aspectScale: 1,
            silent: true,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false, // 是否允许缩放
            regions: [
              {
                name: "南海诸岛",
                itemStyle: {
                  // 隐藏地图// 为 0 时不绘制该图形
                  normal: {opacity: this.regionsMap ? 1:0, }
                },
                // 隐藏文字
                label: {show: false},
                emphasis: {
                  show: false
                }
              }
            ],
            itemStyle: {
              areaColor: {
                image: this.$refs.mapSvg, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              },
              // areaColor:'rgba(0,58,140,1)',
              // shadowColor: '#1773c3',
              // shadowBlur: 20,
              // borderWidth: 0
            }
          },
          
        ],
        series: [
          {
            type: 'map',
            map: 'china',
            geoIndex: 1,
            zoom: 1.2,
            // aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
                color: 'rgba(255,255,255,0.9)'
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: 'rgba(2, 41, 80, 0.3)',
                borderWidth: 1,//设置外层边框
                // borderColor: '#01215c',
                // shadowColor: 'rgba(38,108,198, 1)',
                // shadowBlur: 5,
                // shadowOffsetY: 2
              },
              emphasis: {
                areaColor: 'rgba(38,108,198, 0.6)'
              }
            },
            data: mydata
          },
          {
            tooltip: {
              show: false
            },
            type: "effectScatter",
            coordinateSystem: "geo",
            rippleEffect: {
              scale: 6,
              brushType: "stroke"
            },
            showEffectOn: "render",
            itemStyle: {
              color: "#0ff"
            },
            symbol: "circle",
            symbolSize: [10, 5],
            symbolOffset: [0, -1],
            data: mydata,
            zlevel: 5
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            itemStyle: {
              opacity: 1
            },
            symbolSize: [46, 62],
            symbolOffset: [0, -20],
            zlevel: 6,
            symbol:'image://' + mapIcon,
            data: mydata
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                color: "#fff",
                formatter: function(params) {
                  return params.data.data;
                },
                // offset: [10, 3]
              },
              emphasis: {
                show: false
              }
            },
            // itemStyle: {
            //   opacity: 1
            // },
            symbol:'image://' + mapLabel,
            symbolSize: [81, 27],
            symbolOffset: [0, -60],
            zlevel: 6,
            data: mydata
          },
          // {
          //   type: "map",
          //   coordinateSystem: "geo",
          //   symbolSize: [0, 1],
          //   label: {
          //     normal: {
          //       show: false,
          //       color: "#fff",
          //       fontSize: "16",
          //       formatter: function(params) {
          //         return params.data.name;
          //       },
          //       offset: [0, 20]
          //     },
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   itemStyle: {
          //     color:'#0ff',
          //     opacity: 1
          //   },
          //   zlevel: 6,
          //   data: mydata
          // }
        ]
      }
      if (optionMap && typeof optionMap === "object") {
        myChart.setOption(optionMap, true);
      }
      window.addEventListener('resize', myChart.resize);
    },
    initAreaMap(){
      var myChart = echarts.init(this.$refs.areaMap);
			echarts.registerMap("mapStype", GuangXi);
      let option = {}
      let mapLabel = require('../../../assets/image/home/mapLabel.png');
      // this.mapCenter = [104.114129, 37.550339]
      let data = [
        {name:"百色市",value:[106.6003,23.9227],datas:12},
        {name:"河池市",value:[107.8638,24.5819],datas:11},
        {name:"玉林市",value:[110.2148,22.3792],datas:6},
      ]
      option={
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name;
          }
        },
        geo: [
          {
            map: "mapStype",
            geoIndex: 1,
            zoom: 1,
            layoutCenter: ["50%", "44%"],
            layoutSize: "80%",
            zlevel: 4,
            show: true,
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff",
                  fontSize: "16"
                }
              },
              emphasis: {
                show: true,
                label: {
                  formatter: function(params) { // 鼠标经过的回调函数  
                    return params.name
                  },
                },
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: false, // 是否允许缩放
            itemStyle: {
              normal: {
                areaColor:'rgb(0,0,0,0)',
                borderWidth: 1,
                borderColor: 'rgb(222, 238, 255,0.5)',
                shadowColor: '#1773c3',
                shadowBlur: 20,
              },
              emphasis: {
                borderColor: 'rgb(222, 238, 255,0.5)',
                areaColor:'rgb(26, 92, 158,0.6)',
              }
            }
          },
          {
            map: "mapStype",
            geoIndex: 3,
            zoom: 1,
            // center: this.deployInfo.center,//当前视角的中心点
            layoutCenter: ["50%", "44%"],
            layoutSize: "80%",
            zlevel: 2,
            // aspectScale: 1,
            silent: true,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false, // 是否允许缩放
            itemStyle: {
              areaColor: {
                image: this.$refs.mapSvgAreaMap, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
              },
            }
          },
          {
            map: "mapStype",
            animation:true,
            animationDurationUpdate:0,
            geoIndex: 4,
            zoom: 1,
            // center: this.deployInfo.center,//当前视角的中心点
            layoutCenter: ["50%", "45.5%"],
            layoutSize: "80%",
            zlevel: 1,
            // aspectScale: 1,
            silent: true,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false, // 是否允许缩放
            itemStyle: {
              borderWidth: 1,
              areaColor:'#030a17',
              shadowColor: '#1773c3',
              shadowBlur: 60,
            }
          }
        ],
        series: [
          {
            type: 'map',
            geoIndex: 1,
            zoom: 1.2,
            // aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
                color: 'rgba(255,255,255,0.9)'
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: false,
            data: data
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                color: "#fff",
                fontWeight:500,
                fontSize:18,
                verticalAlign:'top',
                lineHeight:-26,
                formatter: function(params) {
                  return params.data.name + '         '+ params.data.datas;
                },
              },
              emphasis: {
                show: false
              },
            },
            itemStyle: {
              opacity: 1
            },
            symbol:'image://' + mapLabel,
            symbolSize: [160, 70],
            symbolOffset: [0, 0],
            zlevel: 6,
            data: data
          },
        ]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option,true);
      }
      window.addEventListener('resize', myChart.resize);
    },
  },
  beforeCreated () {},
  beforeMounted () {},
  beforeUpdated () {},
  updated () {},
  beforeDestroyed () {},
  destroyed () {},
}

</script>
<style lang='less' scoped>
</style>