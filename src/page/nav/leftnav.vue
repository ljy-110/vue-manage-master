<template>
  <div style="height:100%;">
    <div class="left-nav">
      <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#334157"
      text-color="#fff"
      active-text-color="#ffd04b"
      router :unique-opened="true">
      <h3 class="logobox">测试系统</h3>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-date"></i>
          <span>时间选择组件</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/DatePickerWeek">选择周</el-menu-item>
          <el-menu-item index="/nav2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-opportunity"></i>
          <span>颜色块</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/gradientColor">渐变色</el-menu-item>
          <el-menu-item index="/linearGradientBG">渐变色背景</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-open"></i>
          <span>CSS</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/flexCss">Flex布局</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>Echarts</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/echarts/Map3d">中国地图下砖广西</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/echarts/worlkMap3d">全球中国</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/echarts/baiduMapEcharts">百度地图Echarts</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/echarts/weixinMap">卫星地图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/echarts/echartsMap">地图映射</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4456">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>3D建模</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/threeGITF">threejs+glTF</el-menu-item>
          <el-menu-item index="/model">cesium</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
      <!-- <el-menu-item index="/gradientColor">
        <i class="el-icon-menu"></i>
        <span slot="title">渐变色</span>
      </el-menu-item> -->
      <el-submenu index="4456781">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>表格</span>
        </template>
        <el-menu-item index="/table">
          <span slot="title">表格</span>
        </el-menu-item>
        <el-menu-item index="/mergeTable">
          <span slot="title">合并表格</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/jxyIframe">
        <i class="el-icon-setting"></i>
        <span slot="title">iframe</span>
      </el-menu-item>
      <el-submenu index="449851231551">
        <template slot="title">
          <i class="el-icon-video-camera"></i>
          <span>视频插件</span>
        </template>
        <el-menu-item index="/oWebControl">
          <span slot="title">海康视频插件</span>
        </el-menu-item>
        <el-menu-item index="/h5player">
          <span slot="title">海康H5视频插件</span>
        </el-menu-item>
        <el-menu-item index="/ezuikitVideo">
          <span slot="title">萤石云视频</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/viewFiles">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">附件预览</span>
      </el-menu-item>
    </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      activeIndex:'1'
    };
  },

  created() {},

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  computed: {},

  mounted(){},

  watch: {}
}

</script>
<style lang='css' scoped>
.left-nav{
  /* width: 12%; */
  height: 100%;
  background-color:#334157;
}
.logobox {
  height: 60px;
  line-height: 60px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  margin: 0px;
  /* padding: 20px 0px; */
}
.left-nav >>> .el-menu{
  border-right: 0px;
}
</style>