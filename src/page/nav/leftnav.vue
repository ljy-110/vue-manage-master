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
      router>
      <h3 class="logobox">测试系统</h3>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>时间选择组件</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/DatePickerWeek">选择周</el-menu-item>
          <el-menu-item index="/nav2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/gradientColor">
        <i class="el-icon-menu"></i>
        <span slot="title">渐变色</span>
      </el-menu-item>
      <el-menu-item index="/nav3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="/nav4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
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