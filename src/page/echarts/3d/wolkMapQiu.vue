<template>
  <div>
    <div id="main" style="width:100%;height:800px;padding:0px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import word from '@/assets/js/word';
import China from '@/assets/js/China.json';
import map from '@/assets/image/map.png'
import starfield from '@/assets/image/starfield.jpg'
// import worldChina from '@/assets/js/world-china.js'
export default {
  props: {},
  components: {},
  watch: {},
  computed: {},
  data () {
    return {
      wordList:null,
      chinaGeoJson:null,
      worldChinaMap:null,
    };
  },
  mounted () {
    this.wordList = word;
    
    // this.worldChinaMap = worldChina
    this.initMap3D();
  },
  created () {},
  methods: {
    initMap3D(){
      // var canvas = document.createElement('canvas');
      // var mapChart = echarts.init(canvas, null, {
      //     width: 1620, height: 800
      // });
      this.chinaGeoJson = China
      let dataObj = ''
      // echarts.registerMap('china', this.chinaGeoJson);
      // mapChart.setOption({
      //   backgroundColor: 'rgba(0, 31, 62)',

      //   series : [
      //     {
      //       type: 'map',
      //       map: 'china',
      //       // type: 'scatter3D',
			// 			// coordinateSystem: 'geo3D',
      //       // 绘制完整尺寸的 echarts 实例
      //       top: 0, left: 0,
      //       right: 0, bottom: 0,
      //       boundingCoords: [[-180, 90], [180, -90]]
      //     }
      //   ]
      // });
      // let features = this.chinaGeoJson.features
      // console.log(this.chinaGeoJson);
      // let data = features.map(item => {
      //   // console.log(item.properties);
      //   return [item.properties.cp[0],item.properties.cp[1],item.properties.childNum]
      // })
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      echarts.registerMap("china", this.chinaGeoJson)
      var option= {
        // backgroundColor: 'rgba(120, 31, 62,1)',
        globe: {
          baseTexture: map,
          // heightTexture:'../../../assets/image/starfield.jpg',
          environment:map,
          displacementScale: 10,
          displacementQuality:'ultra',
          shading: 'lambert',
          atmosphere: {
            show: true
          },
          light: {
            ambient: {
              intensity: 2
            },
            main: {
              intensity: 1
            }
          },
          viewControl: {
            projection:'',
            autoRotate: true,
            autoRotateDirection:'cw',
            autoRotateSpeed:20,
            autoRotateAfterStill:4,
            damping:0,
            zoomSensitivity:10,
            targetCoord: [116.46, 39.92],
            // rotateSensitivity:5,
            maxDistance:600,
            animation:true,
          },
          layers:[],
        },
        // visualMap: {
        //   max: 40,
        //   calculable: true,
        //   realtime: false,
        //   inRange: {
        //     colorLightness: [0.2, 0.9]
        //   },
        //   textStyle: {
        //     color: '#fff'
        //   },
        //   controller: {
        //     inRange: {
        //       color: 'orange'
        //     }
        //   },
        //   outOfRange: {
        //     colorAlpha: 0
        //   }
        // },
        geo3D: {
          map: 'china',
          roam: true,
          regionHeight: 4, //地图厚度
          itemStyle: {
            color: '#326a9a',
            opacity: 0.8,
            borderWidth: 0.8,
            borderColor: '#c3d7de'
          },
          label: {
            show: false,
          },
          emphasis: { //当鼠标放上去  地区区域是否显示名称
            disabled: true, //是否可以被选中
            label: {
              formatter: function(params) { // 鼠标经过的回调函数  
                // console.log('hover', params)
                dataObj = params;
                return params.name
              },
            },
          },
          //shading: 'lambert',
          light: { //光照阴影
            main: {
              color: '#fff', //光照颜色
              intensity: 1.2, //光照强度
              // shadowQuality: 'high', //阴影亮度
              shadow: false, //是否显示阴影
              alpha: 55,
              beta: 10
            },
            ambient: {
              intensity: 0.3
            }
          },
          viewControl: {
            distance: 180, // 地图视角 控制初始大小
            // rotateSensitivity: 0, // 旋转
            // zoomSensitivity: 0, // 缩放
            // autoRotate: false,
            // maxBeta: Infinity,
            // minBeta: -Infinity,
            // beta: -15, //旋转视角
            alpha: 80, //视角
            panMouseButton: 'left',
            rotateMouseButton: 'right',
            center: [-1, 0, 5],
          },
          regions: [{
            name: '南海诸岛',
            itemStyle: {
              Color: 'rgba(0, 10, 52, 1)',
              borderColor: 'rgba(0, 10, 52, 1)'
            },
            emphasis: {
              areaColor: 'rgba(0, 10, 52, 1)',
              borderColor: 'rgba(0, 10, 52, 1)'
            }
          }],
        },
        series: [
          {
            type: 'scatter3D',
						coordinateSystem: 'geo3D',
            // zoom:0.1,
						itemStyle: {
							color: '#000',
							opacity: 1,
						},
						zlevel: 1,
						// symbol: 'path://M133 409 c-37 -11 -73 -52 -73 -84 0 -28 71 -172 101 -203 26 -29 32 -24 84 67 52 93 63 142 41 176 -18 27 -72 56 -103 54 -10 0 -32 -5 -50 -10z m72 -63 c16 -12 17 -16 6 -30 -7 -9 -21 -16 -31 -16 -10 0 -24 7 -31 16 -11 14 -10 18 6 30 10 8 22 14 25 14 3 0 15 -6 25 -14z',
						symbol: 'circle',
						symbolSize: [40, 50],
						// data: [{
						// 	name: '标记点',
						// 	value: [120.256616, 30.239604, 100],
						// 	// info: require('../assets/icon/dianwei.png'),
						// }],
          }
          // {
          //   type: 'map3D',
          //   coordinateSystem: 'globe',
          //   // data: this.chinaGeoJson,
          //   barSize: 0.6,
          //   minHeight: 0.2,
          //   silent: true,
          //   itemStyle: {
          //     color: 'orange'
          //   }
          // }
        ]
      }
      // myChart.georoam()
      option && myChart.setOption(option);
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