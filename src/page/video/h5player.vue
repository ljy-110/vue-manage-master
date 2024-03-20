<template>
  <div>
    <el-row>
      <el-col :span="14">
        <div id="thisH5Play"></div>
      </el-col>
    </el-row>
    
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
      player: null,
      tabActive:'decoder',
      mode: 1,
      urls: {
          realplay: '',
          talk: '',
          playback: ''
      },
      maxSplit:16,
      thisSplit:0,
    };
  },
  mounted () {
    this.init();
    this.createPlayer();

    // setTimeout(()=>{
    //   this.realplay();
    // },3000)
  },
  created () {},
  methods: {
    init() {
        // 设置播放容器的宽高并监听窗口大小变化
        window.addEventListener('resize', () => {
            this.player.JS_Resize()
        })
    },
    createPlayer() {
        this.player = new window.JSPlugin({
            szId: 'thisH5Play',
            szBasePath: "../../../static/js/h5player",
            iMaxSplit: this.maxSplit,
            iCurrentSplit: 1,
            openDebug: true,
            oStyle: {
                borderSelect: '#FFCC00',
            }
        })

        // 事件回调绑定
        this.player.JS_SetWindowControlCallback({
            windowEventSelect: function (iWndIndex) {  //插件选中窗口回调
                console.log('windowSelect callback: ', iWndIndex);
            },
            pluginErrorHandler: function (iWndIndex, iErrorCode, oError) {  //插件错误回调
                console.log('pluginError callback: ', iWndIndex, iErrorCode, oError);
            },
            windowEventOver: function (iWndIndex) {  //鼠标移过回调
                //console.log(iWndIndex);
            },
            windowEventOut: function (iWndIndex) {  //鼠标移出回调
                //console.log(iWndIndex);
            },
            windowEventUp: function (iWndIndex) {  //鼠标mouseup事件回调
                //console.log(iWndIndex);
            },
            windowFullCcreenChange: function (bFull) {  //全屏切换回调
                console.log('fullScreen callback: ', bFull);
            },
            firstFrameDisplay: function (iWndIndex, iWidth, iHeight) {  //首帧显示回调
                console.log('firstFrame loaded callback: ', iWndIndex, iWidth, iHeight);
            },
            performanceLack: function () {  //性能不足回调
                console.log('performanceLack callback: ');
            }
        });
    },
    /* 预览&对讲 */
    realplay() {
      let player = this.player
      let mode = this.mode
      let urls = this.urls
      // let { player, mode, urls } = this,
      let index = player.currentWindowIndex
      let playURL = urls.realplay //播放地址
      player.JS_Play(playURL, { playURL, mode }, index).then(
          () => { console.log('realplay success') },
          e => { console.error(e) }
      )
      //自动跳转下一个窗口
      index = index + 1;
      if(index == this.maxSplit){index = 0}
      player.JS_SelectWnd(index);
    },
    //停止视频
    stopAllVideo(){
      this.player.JS_StopRealPlayAll();
    },
    //销毁视频
    destroy() {
      this.player.JS_StopRealPlayAll();
      this.player.JS_Stop();
    },
    //分屏数
    splitWindow(splitNum) {
      this.maxSplit = splitNum * splitNum;
      this.player.JS_ArrangeWindow(splitNum);
    },
  },
  beforeCreated () {},
  beforeMounted () {},
  beforeUpdated () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
}

</script>
<style lang='less' scoped>
#thisH5Play{
  width: 800px;
  height: 600px;
}
</style>