<template>
  <div>
    <div id="main" style="width:100%;height:800px;padding:0px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
// import work from '@/assets/js/work.json';
import China from '@/assets/js/China.json';
import worldmap from '@/assets/image/worldmap.jpg'
import mapL from '@/assets/image/map.png'
import bathymetry from '@/assets/image/bathymetry_4k.jpg'
export default {
  props: {},
  components: {},
  watch: {},
  computed: {},
  data () {
    return {
      chinaJson:null,
      data:[
        {
          name: "黑龙江",
          value: [128.540736,46.925779],
          datas: 1350004
        },
        {
          name: "广东",
          value: [113.307774,23.053927],
          datas: 3350004
        },
        {
          name: "青海",
          value: [96.087904,35.88886],
          datas: 335000
        },
        {
          name: "山西",
          value: [111.615222,35.948722],
          datas: 935000
        },
      ]
    };
  },
  mounted () {
    // this.initMap3D();
    this.initMap2d();
  },
  created () {},
  methods: {
    initMap3D(chinaJson){
      let that = this
      this.chinaJson = chinaJson ? chinaJson:China
      // var ROOT_PATH = 'https://echarts.apache.org/examples';
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
			echarts.registerMap("china", this.chinaJson)

      // var ROOT_PATH = 'https://echarts.apache.org/examples';
      var option;
      let dataObj = ''
      option = {
        // title: {
        // 	text: '全国行政区划3D地图',
        // 	x: 'center',
        // 	top: "20",
        // 	textStyle: {
        // 		color: '#000',
        // 		fontSize: 24
        // 	}
        // },
        tooltip: {
          show: true,
        },
        geo3D: {
          map: 'china',
          roam: true,
          regionHeight: 4, //地图厚度
          // realisticMaterial:{
          //   detailTexture:mapL
          // },
          // environment:mapL,
          // groundPlane:{
          //   show:true,
          // },
          itemStyle: {
            color: 'rgba(38,108,198, 0.2)',
            // opacity: 0.8,
            // borderWidth: 0.8,
            borderColor: '#c3d7de',
            shadowColor: 'rgba(38,108,198, 0.9)',
            shadowBlur: 10,
            shadowOffsetY: 4,
            areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: '#09132c' /* 0% 处的颜色*/
                        }, {
                            offset: 1,
                            color: '#274d68'  /* 100% 处的颜色*/
                        }],
                        globalCoord: true /* 缺省为 false*/
                    },
            opacity: 1,
            borderWidth: 0.8,
            // borderColor: 'rgb(62,215,213)'
          },
          
          label: {
            show: true,
            // formatter: function(params) { // 鼠标经过的回调函数  
            //     // console.log('hover', params)
            //     dataObj = params;
            //     return params.name
            //   },
            textStyle: {
                color: '#fff', //地图初始化区域字体颜色
                fontSize: 14,
                opacity: 1,
                backgroundColor: 'rgba(0,23,11,0)'
                //backgroundColor: 'rgba(53,171,199,0)'
            },
          },
          emphasis: { //当鼠标放上去  地区区域是否显示名称
            // label: {
            //     show: true,
            //     textStyle: {
            //         color: '#fff',
            //         fontSize: 16,
            //         backgroundColor: 'rgba(0,23,11,0)'
            //     }
            // }
            // disabled: true, //是否可以被选中
            label: {
              formatter: function(params) { // 鼠标经过的回调函数  
                // console.log('hover', params)
                dataObj = params;
                return params.name
              },
              // textStyle: {
              //   color: '#fff',
              //   fontSize: 16,
              //   backgroundColor: 'rgba(0,23,11,0)'
              // }
            },
            
          },
          //shading: 'lambert',
          // light: { //光照阴影
          //   main: {
          //     color: '#fff', //光照颜色
          //     intensity: 0.8, //光照强度
          //     // shadowQuality: 'high', //阴影亮度
          //     shadow: false, //是否显示阴影
          //     alpha: 55,
          //     beta: 10
          //   },
          //   ambient: {
          //     intensity: 0.3
          //   }
          // },
          viewControl: {
            distance: 85, // 地图视角 控制初始大小
            // rotateSensitivity: 0, // 旋转
            // zoomSensitivity: 0, // 缩放
            // autoRotate: false,
            // maxBeta: Infinity,
            // minBeta: -Infinity,
            // beta: -15, //旋转视角
            alpha: 65, //视角
            panMouseButton: 'left',
            rotateMouseButton: 'right',
            center: [-1, 0, 5],
          },
          // regions: [{
          //   name: '南海诸岛',
          //   itemStyle: {
          //     Color: 'rgba(0, 10, 52, 1)',
          //     borderColor: 'rgba(0, 10, 52, 1)'
          //   },
          //   emphasis: {
          //     areaColor: 'rgba(0, 10, 52, 1)',
          //     borderColor: 'rgba(0, 10, 52, 1)'
          //   }
          // }],
        },
        series: [{
						type: 'scatter3D',
						coordinateSystem: 'geo3D',
						itemStyle: {
							color: '#000',
							opacity: 1,
						},
						zlevel: 1,
						// symbol: 'path://M133 409 c-37 -11 -73 -52 -73 -84 0 -28 71 -172 101 -203 26 -29 32 -24 84 67 52 93 63 142 41 176 -18 27 -72 56 -103 54 -10 0 -32 -5 -50 -10z m72 -63 c16 -12 17 -16 6 -30 -7 -9 -21 -16 -31 -16 -10 0 -24 7 -31 16 -11 14 -10 18 6 30 10 8 22 14 25 14 3 0 15 -6 25 -14z',
						// symbol: 'circle',
						// symbolSize: [40, 50],
						// data: [{
						// 	name: '标记点',
						// 	value: [120.256616, 30.239604, 100],
						// 	// info: require('../assets/icon/dianwei.png'),
						// }],
				}]
      };
      // myChart.getZr().on('dblclick', (clickparams)=> {
      //   console.log(dataObj);
      //   if (dataObj.name == '河南') {
      //     this.chinaJson = require('@/assets/json/henan.json')
      //     echarts.registerMap("china", this.chinaJson)
      //   }else{
      //     this.chinaJson = require('@/assets/json/china.json')
      //     echarts.registerMap("china", this.chinaJson)
      //   }
      //   // 解决方法一
      //   myChart.dispatchAction({ //来用程序主动渲染选框
      //     type: "restore",//restore 重置 option 事件。
      //   });
      //   option && myChart.setOption(option);
        
      // });
      myChart.getZr().on('dblclick', (clickparams)=> {
					console.log(dataObj);
					if (dataObj.name == '广西壮族自治区') {
						this.chinaJson = require('@/assets/js/45.json')
						echarts.registerMap("china", this.chinaJson)
					}else{
						this.chinaJson = require('@/assets/js/China.json')
						echarts.registerMap("china", this.chinaJson)
					}
					// 解决方法一
					// myChart.dispatchAction({ //来用程序主动渲染选框
					// 	type: "restore",//restore 重置 option 事件。
					// });
					// option && myChart.setOption(option);
					
					// 解决方法二
					myChart.dispose(); //地图销毁函数
					this.initMap3D(this.chinaJson) //重新执行初始化地图的方法并传入地图数据
				});
      // option = {
      //   backgroundColor: '#000',
      //   globe: {
      //     baseTexture: worldmap,
      //     heightTexture: bathymetry,
      //     displacementScale: 0.2,
      //     shading: 'realistic',
      //     // environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
      //     // realisticMaterial: {
      //     //   roughness: ROOT_PATH + '/asset/get/s/data-1497599804873-H1SHkG-mZ.jpg',
      //     //   metalness: ROOT_PATH + '/asset/get/s/data-1497599800643-BJbHyGWQW.jpg',
      //     //   textureTiling: [8, 4]
      //     // },
      //     postEffect: {
      //       enable: true
      //     },
      //     viewControl: {
      //       autoRotate: false
      //     },
      //     light: {
      //       main: {
      //         intensity: 2,
      //         shadow: true
      //       },
      //       ambientCubemap: {
      //         // texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
      //         exposure: 2,
      //         diffuseIntensity: 2,
      //         specularIntensity: 2
      //       }
      //     }
      //   }
      // };
      option && myChart.setOption(option);
    },
    initMap2d(chinaJson){
      let data = this.data
      // let dataObj = ''
      this.chinaJson = chinaJson ? chinaJson:China
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
			echarts.registerMap("china", this.chinaJson)
      let option = {}
      option={
        backgroundColor:'#131e42',
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name;
          }
        },
        // visualMap: {
        //   min: 0,
        //   max: 100,
        //   calculable: true,
        //   color: [],
        //   show: false
        // },
        geo: [
          {
            map: "china",
            geoIndex: 1,
            zoom: 1,
            // regionHeight: 4, //地图厚度
            // layoutCenter: ["50%", "50%"],
            // layoutSize: "100%",
            zlevel: 4,
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
            roam: true, // 是否允许缩放
            itemStyle: {
              normal: {
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0,0,0,0.1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(35,109,211,0.39)" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                },
                borderColor: "#309fc3",
                borderWidth: 2
              },
              emphasis: {
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0,0,0,0.1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(12,166,223,0.59)" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          },
          // {
          //   map: "china",
          //   layoutSize: "100%",
          //   geoIndex: 1,
          //   zoom: 1.5,
          //   layoutCenter: ["50%", "50%"],
          //   layoutSize: "100%",
          //   zlevel: 3,
          //   aspectScale: 1,
          //   silent: true,
          //   label: {
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   roam: false, // 是否允许缩放
          //   itemStyle: {
          //     normal: {
          //       borderColor: "rgba(192,245,249,.6)",
          //       borderWidth: 2,
          //       shadowColor: "#2C99F6",
          //       shadowOffsetY: 0,
          //       shadowBlur: 120,
          //       areaColor: "rgba(29,85,139,.2)"
          //     }
          //   }
          // },
          // {
          //   map: "china",
          //   layoutSize: "100%",
          //   geoIndex: 1,
          //   zoom: 1.5,
          //   layoutCenter: ["50%", "51.5%"],
          //   layoutSize: "100%",
          //   zlevel: 2,
          //   aspectScale: 1,
          //   silent: true,
          //   label: {
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   roam: false, // 是否允许缩放
          //   itemStyle: {
          //     areaColor: {
          //       type: "radial",
          //       x: 0.5,
          //       y: 0.5,
          //       r: 0.5,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: "rgba(0,0,0,0.1)" // 0% 处的颜色
          //         },
          //         {
          //           offset: 1,
          //           color: "rgba(61,107,237,0.39)" // 100% 处的颜色
          //         }
          //       ],
          //       global: false // 缺省为 false
          //     },
          //     borderWidth: 0
          //   }
          // },
          // {
          //   map: "china",
          //   layoutSize: "100%",
          //   geoIndex: 1,
          //   zoom: 1.5,
          //   layoutCenter: ["50%", "53.5%"],
          //   layoutSize: "100%",
          //   zlevel: 1,
          //   aspectScale: 1,
          //   silent: true,
          //   label: {
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   roam: false, // 是否允许缩放
          //   itemStyle: {
          //     areaColor: {
          //       type: "radial",
          //       x: 0.5,
          //       y: 0.5,
          //       r: 0.5,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: "rgba(0,0,0,0.1)" // 0% 处的颜色
          //         },
          //         {
          //           offset: 1,
          //           color: "rgba(61,107,237,0.195)" // 100% 处的颜色
          //         }
          //       ],
          //       global: false // 缺省为 false
          //     },
          //     borderWidth: 0
          //   }
          // }
        ],
        series: [
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
            data: data,
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
            symbol:
              "image://data:image/png;base64,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",
            data: data
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                color: "#fff",
                formatter: function(params) {
                  return params.data.datas;
                },
                offset: [10, 3]
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              opacity: 1
            },
            symbol:
              "image://data:image/png;base64,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",
            symbolSize: [81, 27],
            symbolOffset: [0, -60],
            zlevel: 6,
            data: data
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: [0, 1],
            label: {
              normal: {
                show: true,
                color: "#fff",
                fontSize: "16",
                formatter: function(params) {
                  return params.data.name;
                },
                offset: [0, 20]
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              opacity: 1
            },
            zlevel: 6,
            data: data
          }
        ]
      }
      myChart.getZr().on('dblclick', (e)=> {
					// console.log(dataObj);
					// console.log(e);
          let name = e.target.eventData.name
					if (name == '广西壮族自治区') {
						this.chinaJson = require('@/assets/js/45.json')
            this.data = [
              {
                name: "玉林",
                value: [110.164594,22.676123],
                datas: 150004
              },
              {
                name: "南宁",
                value: [108.35246,22.838225],
                datas: 1350004
              },
              {
                name: "桂林",
                value: [110.182991,25.245765],
                datas: 150004
              },
            ]
						echarts.registerMap("china", this.chinaJson)
            // this.initMap2d(this.chinaJson) //重新执行初始化地图的方法并传入地图数据
					}else{
						this.chinaJson = require('@/assets/js/China.json')
            this.data = [
              {
                name: "黑龙江",
                value: [128.540736,46.925779],
                datas: 1350004
              },
              {
                name: "广东",
                value: [113.307774,23.053927],
                datas: 3350004
              },
              {
                name: "青海",
                value: [96.087904,35.88886],
                datas: 335000
              },
              {
                name: "山西",
                value: [111.615222,35.948722],
                datas: 935000
              },
            ]
						echarts.registerMap("china", this.chinaJson)
					}
					// 解决方法一
					// myChart.dispatchAction({ //来用程序主动渲染选框
					// 	type: "restore",//restore 重置 option 事件。
					// });
					// option && myChart.setOption(option);
					
					// 解决方法二
					myChart.dispose(); //地图销毁函数
					this.initMap2d(this.chinaJson) //重新执行初始化地图的方法并传入地图数据
				});
      option && myChart.setOption(option);
    },
    getAirportCoord(idx) {
      return [this.workList.airports[idx][3], this.workList.airports[idx][4]];
    }

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
.a{
  background: transparent;
}
</style>