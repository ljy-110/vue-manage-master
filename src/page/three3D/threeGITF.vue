<template>
  <div class="baseGeometry">
    <div id="container"></div>
  </div>
</template>
	
<script>
	import * as THREE from "three";
	import * as TWEEN from 'tween.js'
	import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	import markerIcon from '@/assets/image/home/mapIcon.png'
	export default {
	  name: "baseGeometry",
	  data() {
	    return {
	      camera: null,//相机
	      scene: null, //初始化
	      renderer: null, //渲染器对象
	      mesh2: null,
				controls:null,//控制器
				num:1,
				timeChangScale:null,
				mixer:null, //动画
				clock:null, //该对象用于跟踪时间
	    };
	  },
	  methods: {
	    init() {
				let that = this
	      let container = document.getElementById("container"); //容器
				this.scene = new THREE.Scene(); //初始化场景
        let loader = new GLTFLoader();
				this.camera = new THREE.PerspectiveCamera(
	        75,
	        container.clientWidth / container.clientHeight,
	        0.1,
	        100
	      ); //初始化相机，参数通俗讲PerspectiveCamera(远近，宽高比,摄像机视锥体近端面(默认0.1)，摄像机视锥体远端面(默认2000，无限大，表示可以看到最远))
	      this.camera.position.y = 1; //y轴的距离

				// 该对象用于跟踪时间
				this.clock = new THREE.Clock();

        loader.load('../../../static/hlj.glb',gltf => {
					// console.log(gltf);
					const box = new THREE.Box3().setFromObject(gltf.scene);
					const size = box.getSize(new THREE.Vector3()).length();
					const center = box.getCenter(new THREE.Vector3());
					// gltf.scene.position.x -= center.x;
					// gltf.scene.position.y -= center.y;
					// gltf.scene.position.z -= center.z;
					// 居中问题，手动调试
					gltf.scene.position.x = center.x - 0.7;
					gltf.scene.position.y = center.y + 0.1;
					gltf.scene.position.z = center.z + 1;
					// this.camera.near = size / 100;
					// this.camera.far = size * 100;
					// this.camera.updateProjectionMatrix();
					// this.camera.position.copy(center);
					// this.camera.position.x += size / 2;
					// this.camera.position.y += size / 2;
					// this.camera.position.z += size / 2;
					// this.camera.lookAt(center);
					// 将模型的中心点设置到canvas坐标系的中心点，保证模型显示是居中的，object就是操作的目标模型
					// let box = new THREE.Box3().setFromObject(gltf.scene); // 获取模型的包围盒
					// console.log(gltf.scene.position);
					// console.log(center);
					// let mdlen = box.max.x - box.min.x; // 模型长度
					// let mdwid = box.max.z - box.min.z; // 模型宽度
					// let mdhei = box.max.y - box.min.y; // 模型高度
					// let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
					// let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
					// let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
					// gltf.scene.position.set(-x1, -y1, -z1); // 将模型进行偏移
          gltf.scene.scale.set(8,8,8)  //  设置模型大小缩放
          // gltf.scene.position.set(0,0,0)

					// 测试标点
					// const textureLoader = new THREE.TextureLoader();
					// const markerTexture = textureLoader.load(markerIcon);
					// const markerGeometry = new THREE.BoxGeometry(3, 3, 3);
					// const markerMaterial = new THREE.MeshBasicMaterial({ map: markerTexture }); // 将图片资源作为材质使用
					// const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
					// markerMesh.position.set(0.5, 0.5, 0.5);
					// gltf.scene.add(markerMesh);
					// console.log(gltf.scene);
          this.scene.add(gltf.scene);
					// 动画
					const targetScale = new THREE.Vector3(12,12,12);
					const tween = new TWEEN.Tween(gltf.scene.scale)
					tween.to(targetScale, 1000)
					tween.easing(TWEEN.Easing.Quadratic.InOut)
					tween.onUpdate(() => {
							// 每帧更新模型的缩放属性
							// gltf.scene.scale.set(12,12,12);
					})
					tween.start();
					// this.mixer = new THREE.AnimationMixer( gltf.scene );
					// this.mixer.clipAction( gltf.animations[5] ).play(); // use clip

					
        })

				// 标点
				const textureLoader = new THREE.TextureLoader()
				textureLoader.load(require('../../assets/image/home/mapIcon.png'), (texture) => {
					const geometry = new THREE.SphereGeometry( 0.1, 0.1, 0.1);
					const material = new THREE.MeshBasicMaterial({ color:'#fff'});
					const cube = new THREE.Points( geometry, material );
					that.scene.add( cube );
					// this.camera.position.z = 5;
					const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
					const sprite = new THREE.Sprite(spriteMaterial)
					sprite.position.set(0, 1, 0)
					sprite.scale.set(0.1, 0.1, 0.1)
					that.scene.add(sprite)
				})
	      
				// 将模型放到中间
				
	      // var geometry1 = new THREE.DodecahedronBufferGeometry(0.1); //多面体
	      // let material1 = new THREE.MeshLambertMaterial({
	      //   color: 0x409eff,
	      //   transparent: true, //是否透明
	      //   opacity: 0.5, //透明度
	      // });
	      // var mesh1 = new THREE.Mesh(geometry1, material1); //材质跟立方体
	      // this.scene.add(mesh1); //add到场景中
	
	      // var geometry2 = new THREE.BoxGeometry(0.1, 0.1, 0.1); //多面体
	      // let material2 = new THREE.MeshLambertMaterial({ color: 0x7dd427 });
	      // var mesh2 = new THREE.Mesh(geometry2, material2); //材质跟立方体
	      // this.mesh2 = mesh2;
	      // mesh2.position.set(0, 0.2, 0); //Y偏移0.2
	      // this.scene.add(mesh2); //add到场景中
	
	      // var geometry3 = new THREE.SphereGeometry(0.1, 32, 32); //球体//多面体
	      // let material3 = new THREE.MeshLambertMaterial({});
	      // var mesh3 = new THREE.Mesh(geometry3, material3); //材质跟立方体
	      // mesh3.position.set(0.3, 0, 0); //X偏移0.3
	      // this.scene.add(mesh3); //add到场景中
	
	      //添加点光源
	      var point = new THREE.PointLight(0x409EFF);
	      point.position.set(400, 10, 500);
	      this.scene.add(point);
	
	      //添加环境光
	      var ambient = new THREE.AmbientLight(0xffffff);
	      this.scene.add(ambient);

				// 贴图
				// const texture = new THREE.TextureLoader().load('../../assets/image/2.png');
				// texture.wrapS = THREE.RepeatWrapping;
				// texture.wrapT = THREE.RepeatWrapping;
				// texture.repeat.set( 4, 4 );
				// // let material = new THREE.MeshBasicMaterial();
				// // material.map = texture;
 				// this.scene.add(texture)

	      this.renderer = new THREE.WebGLRenderer({ antialias: true }); //render函数
	      this.renderer.setSize(container.clientWidth, container.clientHeight); //设置render的尺寸
				this.renderer.setClearColor(0x000000, 1); //背景透明
				this.renderer.outputEncoding = THREE.sRGBEncoding; //解决色差问题
	      container.appendChild(this.renderer.domElement); //插入container
	      this.controls = new OrbitControls(this.camera, container); //控制器，可实现鼠标左键旋转，右键拖动，滑轮缩放,OrbitControls第二个参数新版必填为绑定元素，改变相机对象的角度
				this.controls.enableRotate = false; //禁止旋转
				// this.controls.enableZoom = false; //禁止缩放
				// this.controls.enablePan = false; //禁止右键拖拽
				// this.move();
				// this.render();
			},
	    animate() {
	      requestAnimationFrame(this.animate); //此方法会重复调用animate，从而实现旋转
	      //垂直旋转,两种都可
				// console.log(this.camera.position);
	      // this.mesh.rotation.x += 0.01 //垂直旋转
	      // this.scene.rotateX(0.01)
	      //水平旋转,两种都可
	      // this.mesh2.rotation.y += 0.02;
	      // this.scene.rotateY(0.01)
				// requestAnimationFrame(this.render);
				const delta = this.clock.getDelta();

				if ( this.mixer ) this.mixer.update( delta );
				TWEEN.update();
	      this.renderer.render(this.scene, this.camera);
				
				// 浏览器控制台查看相机位置变化
				// console.log('camera.position',this.camera.position);
	    },
			render() {
				// requestAnimationFrame(render);
				// 浏览器控制台查看相机位置变化
				let that = this
				function changScale(){
					that.num = that.num + 0.01
					if (that.num >= 2) {
						that.num = 1;
						clearInterval(that.timeChangScale)
						that.timeChangScale = null
					}else{

					}
					// console.log(that.num);
					that.scene.scale.set(that.num,that.num,that.num)
				}
				this.timeChangScale = setInterval(changScale,50)
				// console.log('camera.position',this.camera.position);
			},
			move(){
				let that = this
				setTimeout(()=>{
					console.log('camera.position',that.camera.position);
					console.log('camera.target',that.controls.target);
					let x=-0.09820252385294638,y=-1.5603983452161318e-7,z=0.15603289901071446
					let x1=6.538893903907228e-17,y1=0.5032912301595213,z1=4.6331182301795337e-7
					that.scene.scale.set(2,2,2)
					that.scene.position.set(0,0,-0.3)
					// that.camera.position.set(x1, y1, z1);
					// that.controls.target.set(x1, y1, z1); //与lookAt参数保持一致
					// that.controls.update(); //update()函数内会执行camera.lookAt(controls.target)
				},2000)
			},
			initMap(){
				let that = this
				let container = document.getElementById("container"); //容器
				this.scene = new THREE.Scene(); //初始化场景
        let loader = new GLTFLoader();
				this.camera = new THREE.PerspectiveCamera(
	        75,
	        container.clientWidth / container.clientHeight,
	        0.1,
	        100
	      ); //初始化相机，参数通俗讲PerspectiveCamera(远近，宽高比,摄像机视锥体近端面(默认0.1)，摄像机视锥体远端面(默认2000，无限大，表示可以看到最远))
	      // this.camera.position.z = 5; //y轴的距离
				this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 让相机指向原点
				loader.load( '../../../static/hlj.glb', function ( gltf ) {
						const map = gltf.scene;
						// ... 接下来添加标记点
						// const textureLoader = new THREE.TextureLoader();
						// const markerTexture = textureLoader.load(markerIcon);
						// const markerGeometry = new THREE.BoxGeometry(30, 30, 30);
						// const markerMaterial = new THREE.MeshBasicMaterial({ map: markerTexture,color: 0xffffff }); // 将图片资源作为材质使用
						// const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
						// markerMesh.position.set(0, 1, 0);
						// markerMesh.scale.set(1,1,1)
						// map.add(markerMesh);
						that.scene.add(map);
				}, undefined, function ( error ) {
					console.error( error );
				} );

				
				// // 标点
				const textureLoader = new THREE.TextureLoader()
				textureLoader.load(require('../../assets/image/home/mapIcon.png'), (texture) => {
					const geometry = new THREE.BoxGeometry( 1, 1, 1 );
					const material = new THREE.MeshBasicMaterial({ map: texture ,color:'rgba(0,0,0,0)'});
					const cube = new THREE.Mesh( geometry, material );
					that.scene.add( cube );
					this.camera.position.z = 5;
					const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
					const sprite = new THREE.Sprite(spriteMaterial)
					sprite.position.set(0, 1, 0)
					sprite.scale.set(1, 1, 1)
					that.scene.add(sprite)
				})
				// console.log(that.scene);
				
				this.renderer = new THREE.WebGLRenderer({ antialias: true }); //render函数
	      this.renderer.setSize(container.clientWidth, container.clientHeight); //设置render的尺寸
				this.renderer.setClearColor(0x000000, 1); //背景透明
				this.renderer.outputEncoding = THREE.sRGBEncoding; //解决色差问题
	      container.appendChild(this.renderer.domElement); //插入container
				this.controls = new OrbitControls(this.camera, container);
				this.animate()
			}
	  },
	  mounted() {
	    this.init();
	    this.animate();
			// this.initMap();
	  },
};
</script>
<style scoped>
	.baseGeometry {
	  position: relative;
	}
	.changeTabs {
	  position: absolute;
	  right: 20px;
	  top: 20px;
	  width: 100px;
	  height: 100px;
	  background: #fff;
	  z-index: 1000;
	}
	#container {
	  height: 800px;
	}
</style>
