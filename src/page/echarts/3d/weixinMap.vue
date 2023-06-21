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
      map.centerAndZoom(new BMapGL.Point(127.747927,47.878188), 7);  // 初始化地图,设置中心点坐标和地图级别
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
      // var bd = new BMapGL.Boundary();
      // // console.log(bd);
      // bd.get('黑龙江', function (rs) {
      //   console.log(rs);
      //     var count = rs.boundaries.length; //行政区域的点有多少个
      //     var pointArray = [];
      //     for (var i = 0; i < count; i++) {
      //         var path = [];
      //         let str = rs.boundaries[i].replace(' ', '');
      //         let points = str.split(';');
      //         for (var j = 0; j < points.length; j++) {
      //             var lng = points[j].split(',')[0];
      //             var lat = points[j].split(',')[1];
      //             path.push(new BMapGL.Point(lng, lat));
      //         }
      //         var prism = new BMapGL.Prism(path, 5000, {
      //             topFillColor: '#5679ea',
      //             topFillOpacity: 0.5,
      //             sideFillColor: '#5679ea',
      //             sideFillOpacity: 0.2

      //         });
      //         map.addOverlay(prism);
      //     }
      // });
      
      var bdary = new BMapGL.Boundary();
      bdary.get('绥化市', function (rs) {
        // 绘制行政区
        for (var i = 0; i < rs.boundaries.length; i++) {
            var path = [];
            var xyArr = rs.boundaries[i].split(';');
            var ptArr = [];
            for (var j = 0; j < xyArr.length; j++) {
                var tmp = xyArr[j].split(',');
                var pt = new BMapGL.Point(tmp[0], tmp[1]);
                ptArr.push(pt);
            }
            var mapmask = new BMapGL.MapMask(ptArr, {
                isBuildingMask: true,
                isPoiMask: true,
                isMapMask: true,
                showRegion: 'inside',
                topFillColor: '#5679ea',
                topFillOpacity: 0.5,
                sideFillColor: '#5679ea',
                sideFillOpacity: 0.9
            });
            map.addOverlay(mapmask);
            var border = new BMapGL.Polyline(ptArr, {
                strokeColor: '#5679ea',
                strokeWeight: 3,
                strokeOpacity: 1
            });
            map.addOverlay(border)
            }
        })
        // 定义XYZLayer图层
        var wms = new BMapGL.XYZLayer({
            useThumbData: true,
            // tileUrlTemplate: 'https://ows.mundialis.de/services/service?&service=WMS&' +
            // 'request=GetMap&layers=TOPO-WMS%2COSM-Overlay-WMS&styles=&format=image%2Fjpeg&' +
            // 'transparent=false&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=[b]',
            // tileUrlTemplate: 'https://mapopen-pub-jsapigl.bj.bcebos.com/tms-bj/[z]/[x]/[y].png',
            tms: true,
            // extent: [12848196.067, 4784679.341, 13080063.094, 5021083.333]
            tileUrlTemplate: require('../../../assets/image/2.jpg'),
        });
        map.addTileLayer(wms);
        // 定义XYZLayer图层
        // var tms = new BMapGL.XYZLayer({
        //     tms: true,
        //     useThumbData: true, 
        //     minZoom: 7,
        //     maxZoom: 12,
        //     tileUrlTemplate: 'https://mapopen-pub-jsapigl.bj.bcebos.com/tms-bj/[z]/[x]/[y].png',
        //     extent: [12848196.067, 4784679.341, 13080063.094, 5021083.333] // "EPSG":3857 左下角坐标，右上角坐标
        // });
        // map.addTileLayer(tms);
        var bd = new BMapGL.Boundary();
        bd.get('绥化市', function (rs) {
          // 定义XYZLayer图层
          // let custom = new BMapGL.XYZLayer({
          //     useThumbData: true,
          //     boundary: rs.boundaries,// 添加掩膜
          //     minZoom: 7,
          //     maxZoom: 12,
          //     tileUrlTemplate: 'https://mapopen-pub-jsapigl.bj.bcebos.com/tms-bj/[z]/[x]/[y].png',
          //     // 自定义图层瓦片请求地址，
          //     // 可使用xTemplate，yTemplate，zTemplate匹配自定义网格编号规则
          //     yTemplate: function (x, y, z) { 
          //         return Math.pow(2, z) - y - 1;
          //     }
          // });
          // map.addTileLayer(custom);
            wms.addBoundary(rs.boundaries); // 添加掩膜
        });
        // --- 添加行政区划 ---
        var dist = new BMapGL.DistrictLayer({
            name: '(绥化市)',
            kind: 1,
            fillColor: '#618bf8',
            fillOpacity: 0.2,
            strokeColor: '#daeafa',
            // viewport: true
        });
        map.addDistrictLayer(dist);

        // --- 行政区划添加鼠标事件 ---
        // dist.addEventListener('mouseover', function (e) {
        //     e.currentTarget.setFillColor('rgba(6, 194, 231,0.6)');
        // });
        // dist.addEventListener('mouseout', function (e) {
        //     e.currentTarget.setFillColor(e.currentTarget.style.fillColor);
        // });
        // var bdary = new BMapGL.Boundary();
        // bdary.get('黑龙江省', function (rs) {       //获取行政区域       
        //     map.clearOverlays();        //清除地图覆盖物  
            
        //     //for循环都删除掉了，只剩下这个
        //     //网上查了下，东西经南北纬的范围
        //     var EN_JW = "180, 90;";         //东北角
        //     var NW_JW = "-180,  90;";       //西北角
        //     var WS_JW = "-180, -90;";       //西南角
        //     var SE_JW = "180, -90;";        //东南角
        //     //4.添加环形遮罩层
        //     var ply1 = new BMapGL.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW, { strokeColor: "none", fillColor: "rgb(246,246,246)", fillOpacity:1, strokeOpacity: 0.5 }); //建立多边形覆盖物

        //     map.addOverlay(ply1);  
        //     //5. 给目标行政区划添加边框，其实就是给目标行政区划添加一个没有填充物的遮罩层
        //     var ply = new BMapGL.Polygon(rs.boundaries[0], { strokeWeight: 2, strokeColor: "#00f",fillColor: "" });
        //     map.addOverlay(ply); 
        //     //map.setViewport(ply.getPath());    //调整视野
        // });

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