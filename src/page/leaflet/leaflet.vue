<template>
  <div>
    <!--  -->
    <div>
      <el-button type="primary" @click="applyMarker">默认marker</el-button>
      <el-button type="primary" @click="applyMarker2">自定义marker</el-button>
      <el-button type="primary" @click="clearMarker">清除marker</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-button type="primary" @click="applyPolygon">Polygon 多边形</el-button>
      <el-button type="primary" @click="applyCircle">圆形</el-button>
      <el-button type="primary" @click="applyPolyline">折线</el-button>
      <el-button type="primary" @click="applyRectangle">矩形</el-button>
    </div>
    <div class="leaflet-box" id="map"></div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  watch: {},
  computed: {},
  data() {
    return {
      map: null,
      layerControl: null,
      markerCustom: []
    };
  },
  mounted() {
    this.init()
  },
  created() { },
  methods: {
    init() {
      let center = [39.871534, 116.395645];
      let zoom = 4;
      const that = this;
      this.map = L.map(
        //Initialize Windy API
        "map",
        { crs: L.CRS.EPSG3857, minZoom: 4, maxZoom: 18, doubleClickZoom: false }
      ).setView(center, zoom);
      // 地图类型
      this.applyLayer(this.map, 1);
    },
    applyLayer(map, type) {
      const tiandiKey = "5afaeaa82f5a329928275bf528394c88";
      const imageURL1 =
        "http://t0.tianditu.gov.cn/vec_w/wmts?" +
        "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
        "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
        "&tk=" +
        tiandiKey;
      let layer1 = L.tileLayer(imageURL1, {
        attribution: "电子地图",
      })
      const imageURL2 =
        "http://t0.tianditu.gov.cn/cva_w/wmts?" +
        "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
        "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
        "&tk=" +
        tiandiKey;
      let layer2 = L.tileLayer(imageURL2, {
        attribution: "注记",
      }).setZIndex(999);

      let imageURL3 =
        "http://t0.tianditu.gov.cn/img_w/wmts?" +
        "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
        "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
        "&tk=" +
        tiandiKey;
      let layer3 = L.tileLayer(imageURL3, {
        attribution: "影像地图",
      });

      var layerGroup1 = L.layerGroup();
      var layerGroup2 = L.layerGroup();

      layerGroup1.addLayer(layer1);
      layerGroup1.addLayer(layer2);

      layerGroup2.addLayer(layer3);
      layerGroup2.addLayer(layer2);

      if (type == 1) {
        layerGroup1.addTo(map);
      } else {
        layerGroup2.addTo(map);
      }
      var baseLayers = {
        电子地图: layerGroup1,
        影像地图: layerGroup2,
      };

      this.layerControl = L.control.layers(
        baseLayers,
        {},
        {
          collapsed: true,
          hideSingleBase: true,
        }
      );
      this.layerControl.addTo(map);
    },
    applyMarker() {
      var marker = L.marker([39.891534, 116.395645]).addTo(this.map);
      this.markerCustom.push(marker);
      // marker.bindPopup(data.name);
    },
    applyMarker2() {
      const shipIcon = L.icon({
        iconUrl: require('./car.png'),
        iconSize: [64, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      const shipIcon2 = L.icon({
        iconUrl: require('./m.png'),
        iconSize: [64, 130],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      var marker1 = L.marker([39.491534, 116.395645], { icon: shipIcon}).addTo(this.map);
      var marker2 = L.marker([34.491534, 113.395645], { icon: shipIcon2}).addTo(this.map);
      var marker2 = L.marker([31.491534, 103.395645], { icon: shipIcon2,rotationAngle: 300}).addTo(this.map);
      this.markerCustom.push(marker1);
      this.markerCustom.push(marker2);
      // marker.bindPopup(data.name);
      marker1.on('click', () => {
        this.$message({
          message: '点击了车辆',
          type: 'success'
        });
      });
      const popupContent = '<p>这是一个动漫</p>';
      const popup = L.popup({ autoClose: true, }).setContent(popupContent);
      marker2.bindPopup(popup);
      marker2.on('click', (event) => {
        // 获取marker的经纬度
        var markerLatLng = event.latlng;
        // 设置地图中心为marker的位置
        this.map.setView(markerLatLng, this.map.getZoom() + 10); // 放大两级
        this.$message({ message: '点击了动漫，放大了地图，改变了中心位置', type: 'success' });
      });
    },
    clearMarker() {
      for (let i = 0; i < this.markerCustom.length; i++) {
        this.markerCustom[i].remove();
      }
      this.markerCustom = [];
    },
    applyPolygon() {
      // 从一个 LatLng 点的数组中创建一个红色的多边形
      let latlngs = [[37, -109.05], [41, -109.03], [41, -102.05], [37, -102.04]];
      let polygon = L.polygon(latlngs, { color: 'red' }).addTo(this.map);
      // 将地图放大到多边形的位置
      this.map.fitBounds(polygon.getBounds());
      this.map.setView([37, -109.05], this.map.getZoom()); // 放大两级
    },
    // 圆
    applyCircle() {
      L.circle([39.491534, 116.395645], {radius: 200000}).addTo(this.map);
      this.map.setView([39.491534, 116.395645], this.map.getZoom()); // 放大两级
    },
    // 折线
    applyPolyline() {
      var latlngs = [
        [39.491534, 116.395645],
        [39.901534, 115.395645],
        [38.491534, 114.395645]
      ];
      var polyline = L.polyline(latlngs, { color: 'red',weight:20 }).addTo(this.map);
      this.map.fitBounds(polyline.getBounds());
      this.map.setView([39.491534, 116.395645], this.map.getZoom()); // 放大两级
    },
    // 矩形
    applyRectangle() {
      var rectangle = L.rectangle([[39.491534, 116.395645], [33.591534, 113.495645]], { color: 'red' }).addTo(this.map);
      this.map.fitBounds(rectangle.getBounds());
      this.map.setView([39.491534, 116.395645], this.map.getZoom()); // 放大两级
    }
  },
  beforeCreated() { },
  beforeMounted() { },
  beforeUpdated() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
}

</script>
<style lang='less' scoped>
.leaflet-box {
  width: 100%;
  height: 600px;
  margin-top: 10px;
}
</style>