<template>
  <div>
    <div id="Model" ref="mapDiv" class="divTdtMap" style="height:100%;width:100%;margin:auto;"></div>
  </div>
</template>

<script>
var viewer = null;
var tileset = null;
export default {
  props: {},
  components: {},
  watch: {},
  computed: {},
  data() {
    return {
    };
  },
  mounted() {
    this.initModel();
  },
  created() { },
  methods: {
    async initModel() { //三维底图
      tileset = null
      Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      viewer = new Cesium.Viewer("Model", {
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false, // 影像切换
        animation: false, // 是否显示动画控件
        infoBox: true, // 是否显示点击要素之后显示的信息
        selectionIndicator: false, // 要素选中框
        geocoder: false, // 是否显示地名查找控件
        timeline: false, // 是否显示时间线控件
        fullscreenButton: false,
        shouldAnimate: false,
        navigationHelpButton: false, // 是否显示帮助信息控件
      });
      // 隐藏版权
      viewer._cesiumWidget._creditContainer.style.display = "none";

      let modelUrl = '/static/hlj.glb'
      // 创建一个Entity  
      let entity = new Cesium.Entity({
        name: 'hlj',
        position: Cesium.Cartesian3.fromDegrees(127.399749, 48.022204, 0.0), // 设置模型的位置  
        model: {
          uri: modelUrl,
          scale: 300.0, // 根据需要调整模型大小  
          // minimumPixelSize: 128,
          // maximumScale: 20000  
        },
      });
      // 将Entity添加到Cesium Viewer的entities集合中  
      viewer.entities.add(entity);
      // viewer.zoomTo(entity);
      // let tilesetUrl = '/model/tile_20_27_CESIUM/tileset.json'
      // let property = {
      //   skipLevelOfDetail: true,
      //   maximumScreenSpaceError: 16,
      //   cullWithChildrenBounds: true,
      //   baseScreenSpaceError: 100, // 基本屏幕错误阈值
      //   skipScreenSpaceErrorFactor: 16, // 跳过屏幕错误因子
      //   skipLevels: 3, // 跳过的层数
      //   immediatelyLoadDesiredLevelOfDetail: false, // 是否立即加载所需的细节级别
      //   loadSiblings: false, // 是否加载同级别的其他3DTiles
      // }
      // tileset = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl, property);
      // // 加载完成的回调
      // // tileset.allTilesLoaded.addEventListener(function() {
      // //     console.log('All tiles are loaded');
      // // });
      // viewer.scene.primitives.add(tileset);
      // //加载完成后缩放到模型位置
      // viewer.zoomTo(tileset);
      //   viewer.camera.moveEnd.addEventListener(function() {  
      //     // 获取相机当前的位置（笛卡尔坐标）  
      //     var cartesian = viewer.camera.positionCartographic;  

      //     // 转换为经纬度和高度的对象  
      //     var longitude = Cesium.Math.toDegrees(cartesian.longitude);  
      //     var latitude = Cesium.Math.toDegrees(cartesian.latitude);  
      //     var height = cartesian.height;  

      //     console.log('经纬度：', longitude, latitude, '高度：', height);  

      //     // 获取相机的朝向和俯仰角  
      //     var heading = Cesium.Math.toDegrees(viewer.camera.heading);  
      //     var pitch = Cesium.Math.toDegrees(viewer.camera.pitch);  
      //     var roll = Cesium.Math.toDegrees(viewer.camera.roll);  

      //     console.log('朝向（度）：', heading, '俯仰角（度）：', pitch,"（翻滚角）:",roll);  

      //     // 如果需要，还可以获取其他相机属性，如roll（翻滚角）  
      // });
      viewer.camera.flyTo({
        // fromDegrees()方法，将经纬度和高程转换为世界坐标，这里定位到
        destination: Cesium.Cartesian3.fromDegrees(127.399749, 48.022204, 1842408.0),
        orientation: {
          // heading: Cesium.Math.toRadians(0),// 指向
          // pitch: Cesium.Math.toRadians(-30),// 视角
          roll: 0.0,
        },
      });

      // // 最小缩放高度（米）
      // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100;
      // // 最大缩放高度（米）
      // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 10000;
      // this.getGlb();

        // 地图换成天地图
      // const tianditu = new Cesium.WebMapTileServiceImageryProvider({
      //   url: 'http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=',
      //   layer: 'img_w',
      //   style: 'default',
      //   format: 'tiles',
      //   tileMatrixSetID: 'w',
      //   subdomains:['t0','t1','t2','t3','t4','t5','t6','t7'],
      //   maximumLevel: 18,
      //   credit: new Cesium.Credit('天地图'),
      // })  

      // // 将天地图层添加到观众实例的影像图层集合中
      // viewer.imageryLayers.addImageryProvider(tianditu)

      // 显示地点标注
      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url:
            "http://{s}.tianditu.gov.cn/cva_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
            "&LAYER=cva&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
            "&style=default&format=tiles&tk=ak",
          layer: "vec_w",
          style: "default",
          format: "tiles",
          tileMatrixSetID: "w",
          subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          tilingScheme: new Cesium.GeographicTilingScheme(),
          tileMatrixLabels: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", ],
          maximumLevel: 18,
          show: false,
        })
      );
    },
    getGlb() {
      let modelUrl = '/static/hlj.glb'
      // 创建一个Entity  
      let entity = new Cesium.Entity({
        name: 'hlj',
        position: Cesium.Cartesian3.fromDegrees(127.399749, 48.022204, 0.0), // 设置模型的位置  
        model: {
          uri: modelUrl,
          scale: 30.0, // 根据需要调整模型大小  
          // minimumPixelSize: 128,
          // maximumScale: 20000  
        },
      });
      // 将Entity添加到Cesium Viewer的entities集合中  
      viewer.entities.add(entity);
    },
  },
  beforeCreated() { },
  beforeMounted() { },
  beforeUpdated() { },
  updated() { },
  beforeDestroyed() { },
  destroyed() { },
}
</script>
<style lang='less' scoped></style>