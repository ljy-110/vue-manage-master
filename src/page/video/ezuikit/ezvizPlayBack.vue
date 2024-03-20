<template>
  <div>
    <div class="download-control" v-if="showTipVM">
      <span class="activeXmsg" style="font-size: 18px;">
        请<a href="../../../../static/plug/playbackControl.zip">
          <font style="color: red">下载</font>
        </a>并安装控件
      </span>
    </div>
    <div id="playWndHKEzvizBack" style="width: 100%;height:730px;"></div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  watch: {},
  computed: {},
  data () {
    return {
      appKey:'e12a80cbd04f4d2d8245d9c136b43d51',
      ezvizToken: 'at.35kvk3q3855lsw0w3r64mbf13pgybm9r-51diuo3g1j-0wsnqj4-etadyqizi',
      deviceSerial:'J39210167',
      channelNo: '1',	    
      deviceClass:'0',
      platformId:'',
      startTime: '',
      endTime: '',
      layout: 2,
      switchVideo: 0, // 0实时预览 1录像回放
      callbackMessage: '', //显示回调信息
      tips: '调用成功',
      successTip: false,
      tipsShow: false,
      showTipVM:false,
    };
  },
  mounted () {
    // oWebControl = WebControlInit(
    //   'playWndHKEzviz',
    //   cbConnectSuccess,
    //   cbConnectError,
    //   cbConnectClose
    // );
  },
  created () {},
  methods: {},
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