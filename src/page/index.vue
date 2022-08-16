<template>
  <div style="height:100%;">
    <el-container class="index-con">
      <el-aside :class="showclass">
        <leftnav></leftnav>
      </el-aside>
      <el-container class="main-con">
        <el-header class="index-header">
          <topNav></topNav>
        </el-header>
        <el-main clss="index-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import topNav from './nav/topNav'
import leftnav from './nav/leftnav'
export default {
  props: {},
  components: {
    leftnav,
    topNav
  },
  data () {
    return {
       showclass: 'asideshow',
    };
  },

  created() {},

  methods: {},

  computed: {},

  mounted(){},

  watch: {}
}

</script>
<style lang='css' scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
/* .el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
} */
.el-main {
  background-color: #E9EEF3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.aside {
  width: 64px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.asideshow {
  width: 240px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.index-header,
.index-main {
  padding: 0px;
  border-left: 2px solid #333;
}
</style>