<template>
  <div>
    <div id="allmap" style="width:100%;height:800px;"></div>
  </div>
</template>

<script>
import customMap from '@/assets/js/custom_map.json'
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
    this.styleJson = customMap
    this.initMap();
  },
  created () {},
  methods: {
    initMap(){
    // GL版命名空间为BMapGL
      var map = new BMapGL.Map("allmap");    // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(118.5, 27.5), 5);  // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      // map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式
      // map.setTilt(50);
      map.setMapStyleV2({styleJson: this.styleJson});
      // var bd = new BMapGL.Boundary();
      // bd.get('广东', function (rs) {
      //     var hole = new BMapGL.Polygon(rs.boundaries, {
      //         fillColor: 'blue',
      //         fillOpacity: 0.2
      //     });
      //     map.addOverlay(hole);
      // });
      var bd = new BMapGL.Boundary();
      // console.log(bd);
      bd.get('广东', function (rs) {
        console.log(rs);
          var count = rs.boundaries.length; //行政区域的点有多少个
          var pointArray = [];
          for (var i = 0; i < count; i++) {
              var path = [];
              let str = rs.boundaries[i].replace(' ', '');
              let points = str.split(';');
              for (var j = 0; j < points.length; j++) {
                  var lng = points[j].split(',')[0];
                  var lat = points[j].split(',')[1];
                  path.push(new BMapGL.Point(lng, lat));
              }
              var prism = new BMapGL.Prism(path, 5000, {
                  topFillColor: '#5679ea',
                  topFillOpacity: 0.5,
                  sideFillColor: '#5679ea',
                  sideFillOpacity: 0.9

              });
              map.addOverlay(prism);
          }
      });
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