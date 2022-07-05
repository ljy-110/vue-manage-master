<template>
  <div style="height:100%;" class="bwt bg">
    <div class="width:90%">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#334157"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
        <el-menu-item index="/top1">处理中心</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="/top2">选项1</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="/nav3">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <el-menu-item index="/top2">消息中心</el-menu-item>
        <!-- <el-menu-item index="/nav5">订单管理</el-menu-item> -->
      </el-menu>
    </div>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#334157"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!-- <el-menu-item index="/top1">处理中心</el-menu-item> -->
        <el-submenu index="2">
          <template slot="title">管理员</template>
          <el-menu-item index="2-1">个人中心</el-menu-item>
          <el-menu-item index="2-2" @click="$router.push({ path:'/' })">退出</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="/top2">消息中心</el-menu-item> -->
        <!-- <el-menu-item index="/nav5">订单管理</el-menu-item> -->
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
      // if(key==='1'){
      //   this.$router.push({path:'/top1'})
      // }else if(key==='2'){
      //   this.$router.push({path:'/top2'})
      // }else{}
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
/* .left-nav{
  width: 12%;
  height: 93.5%;
  background-color:#545c64;
} */
.bwt{
  justify-content: space-between;
  width: 100%;
  display: flex;
}
.bg{
  background-color:#334157;
}
</style>