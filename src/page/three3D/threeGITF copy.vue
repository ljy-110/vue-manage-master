<template>
  <div>
    <div ref="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
// const scene = new THREE.Scene();
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'; //模型解压缩
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
    this.init()
  },
  created () {},
  methods: {
    init(){
      const container = this.$refs.container;
      // 创建Three.js场景、相机、渲染器
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(20, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(1200, 800);
      container.appendChild(renderer.domElement);
      renderer.setClearColor(0xffffff, 1.0);
      // 加载<a data-type="tag" href="https://www.chengzz.com/tag/gltf">GLTF</a>模型
      
      const loader = new GLTFLoader();
      //使用
      // const dracoLoader = new DRACOLoader();
      // dracoLoader.setDecoderPath( 'static/draco' )  // 注意路径，确保public下面有draco文件夹
      // loader.setDRACOLoader( dracoLoader ); //用于解码使用KHR_draco_mesh_compression扩展压缩过的文件。
      
      loader.load(
        '../../../static/gun.glb',
        gltf => {
          // scene.add(gltf.scene);
          // 将模型放到中间
          // const box = new THREE.Box3().setFromObject(gltf.scene);
          // const size = box.getSize(new THREE.Vector3()).length();
          // const center = box.getCenter(new THREE.Vector3());
          // gltf.scene.position.x -= center.x;
          // gltf.scene.position.y -= center.y;
          // gltf.scene.position.z -= center.z;
          // camera.near = size / 100;
          // camera.far = size * 100;
          // camera.updateProjectionMatrix();
          // camera.position.copy(center);
          // camera.position.x += size / 2;
          // camera.position.y += size / 2;
          // camera.position.z += size / 2;
          // camera.lookAt(center);
          // gltf.scene.scale.set(100,100,100)  //  设置模型大小缩放
          // gltf.scene.position.set(0,0,0)
          scene.add(gltf.scene);
          // //添加在模型的右上角高三倍设置一个光源 太阳
          // const light = new THREE.DirectionalLight(0xffffbb, 1);
          // // 模型宽度
          // const width = box.max.x - box.min.x;
          // // 模型高度
          // const height = box.max.y - box.min.y;
          // // 模型深度
          // const depth = box.max.z - box.min.z;
          // light.position.set(width * 3, height * 3, depth * 3);
          // scene.add(light);
          // //多设置几个光源
          // const light3 = new THREE.DirectionalLight(0xffffbb, 1);
          // light3.position.set(-width * 3, -height * 3, depth * 3);
          // scene.add(light3);
          // const light4 = new THREE.DirectionalLight(0xffffbb, 1);
          // light4.position.set(width * 3, height * 3, -depth * 3);
          // scene.add(light4);
        },
        undefined,
        error => {
          console.error(error);
        },
      );
      // // 设置相机位置
      // camera.position.z = 5;
      // // 添加OrbitControls控制器
      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.enableDamping = true;
      // controls.dampingFactor = 0.05;
      // controls.screenSpacePanning = false;
      // controls.minDistance = 1;
      // controls.maxDistance = 1000;

      renderer.render(scene, camera);
      // //设置一个地平线网格
      // const gridHelper = new THREE.GridHelper(100, 100);
      // scene.add(gridHelper);
      // 动画循环
      // const animate = function () {
      //   requestAnimationFrame(animate);
      //   // 更新OrbitControls控制器状态
      //   controls.update();
      //   renderer.render(scene, camera);
      // };
      // animate();
      // setInterval(animate(),2000)
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