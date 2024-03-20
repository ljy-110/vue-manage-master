<template>
  <div>
    <el-row>
      <el-col :span="12">
        <p>直播流</p>
        <div id="liveVideoDivHKMode" class="video-box"></div>
      </el-col>
      <el-col :span="12">
        <p>插件预览</p>
        <!-- <EzvizVideo ref="ezvizVideoPlay"></EzvizVideo> -->
        <EzvizVideo ref="ezvizVideoPlay" class="video-box" />
      </el-col>
      <el-col :span="12">
        <p>插件回放</p>
        <!-- <EzvizVideo ref="ezvizVideo" class="video-box" /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EzvizVideo from './ezuikit/ezvizVideo.vue'
// import EzvizPlayBack from './ezuikit/ezvizPlayBack.vue'
export default {
  props: {},
  components: { EzvizVideo }  ,
  watch: {},
  computed: {},
  data () {
    return {
      player:null,
      videoInfo:{
        "sectionId": "",
        "placeCode": "10001",
        "placeName": null,
        "onlineCount": null,
        "allCount": null,
        "cameraNote": "",
        "cameraType": "1",
        "status": "1",
        "playUrl": "",
        "linkUrl": "",
        "selected": "0",
        "pk": "",
        "cameraNo": "11",
        "signalSource": "/",
        "transmode": 1,
        "streamType": 1,
        "protocol": null,
        "coverId": "1",
        "isControl": null,
        "isScreenshot": null,
        "isVideotape": null,
        "manufacturerType": null,
        "deviceSerial": null,
        "isUse": null,
        "serverUrl": null,
        "deviceName": null,
        "command": null,
        "visitUrl": null,
        "hkmode": "1",
        "accessToken": "",
        "appKey": ""
    }
    };
  },
  mounted () {
    this.initEzuikit(); //直播流
    this.initEzuikitPlug();//插件预览
    // this.initEzvizBackPlug();//插件回放
  },
  created () {},
  methods: {
    // 直播流
    initEzuikit(){
      let that = this
      let themeData = {
        "header": {
          "color": "#1890ff",
          "activeColor": "#FFFFFF",
          "backgroundColor": "#000000",
          "btnList": [
            {
              "iconId": "deviceID",
              "part": "left",
              "defaultActive": 0,
              "memo": "顶部设备序列号",
              "isrender": 1
            },
            {
              "iconId": "deviceName",
              "part": "left",
              "defaultActive": 0,
              "memo": "顶部设备名称",
              "isrender": 1
            },
            {
              "iconId": "cloudRec",
              "part": "right",
              "defaultActive": 0,
              "memo": "云存储",
              "isrender": 0
            },
            {
              "iconId": "rec",
              "part": "right",
              "defaultActive": 0,
              "memo": "SD卡回放",
              "isrender": 0
            }
          ]
        },
        "footer": {
          "color": "#FFFFFF",
          "activeColor": "#1890FF",
          "backgroundColor": "#00000021",
          "btnList": [
            {
              "iconId": "play",
              "part": "left",
              "defaultActive": 1,
              "memo": "播放",
              "isrender": 1
            },
            {
              "iconId": "capturePicture",
              "part": "left",
              "defaultActive": 0,
              "memo": "截屏按钮",
              "isrender": 1
            },
            {
              "iconId": "sound",
              "part": "left",
              "defaultActive": 0,
              "memo": "声音按钮",
              "isrender": 1
            },
            {
              "iconId": "pantile",
              "part": "left",
              "defaultActive": 0,
              "memo": "云台控制按钮",
              "isrender": 1
            },
            {
              "iconId": "recordvideo",
              "part": "left",
              "defaultActive": 0,
              "memo": "录制按钮",
              "isrender": 1
            },
            {
              "iconId": "talk",
              "part": "left",
              "defaultActive": 0,
              "memo": "对讲按钮",
              "isrender": 1
            },
            {
              "iconId": "zoom",
              "part": "left",
              "defaultActive": 0,
              "memo": "电子放大",
              "isrender": 1
            },
            {
              "iconId": "hd",
              "part": "right",
              "defaultActive": 0,
              "memo": "清晰度切换按钮",
              "isrender": 1
            },
            {
              "iconId": "webExpend",
              "part": "right",
              "defaultActive": 0,
              "memo": "网页全屏按钮",
              "isrender": 1
            },
            {
              "iconId": "expend",
              "part": "right",
              "defaultActive": 0,
              "memo": "全局全屏按钮",
              "isrender": 1
            }
          ]
        }
      };
      this.player =  new EZUIKit.EZUIKitPlayer({
        id:'liveVideoDivHKMode',
        autoplay: true,
        url:this.videoInfo.playUrl, //播放地址
        accessToken:this.videoInfo.accessToken, //token
        width: 750,
        height: 500,
        handleError: that.handleError(),
        handleSuccess:  that.handleSuccess(),
        //splitBasis:1, //旧版本3.5有个自带的分屏功能，现在没有了
        audio:0,
        themeData: themeData, //上面的对象内容
      });
    },
    handleError(e){
      // console.log(e);
    },
    handleSuccess(e){
      // console.log(e);
    },
    // 插件
    initEzuikitPlug(){
      let obj = {
        linkUrl:this.videoInfo.linkUrl, 
        cameraNo:this.videoInfo.cameraNo, 
        playUrl:this.videoInfo.playUrl, 
        cameraNote:this.videoInfo.cameraNote, 
        cameraType:this.videoInfo.cameraType, 
        pk:this.videoInfo.pk, 
        coverId:this.videoInfo.coverId,
        accessToken:this.videoInfo.accessToken,
        switchVideo:0
      }
      setTimeout(()=>{
        this.$refs.ezvizVideoPlay.ezvizVideoPlay(obj)
      },2000)
      
    },
    // 回放
    initEzvizBackPlug(){
      let startTime = new Date().getTime() - 24*60*60*100
      let endTime = new Date().getTime()
      this.videoInfo.switchVideo = 1; //回放
      this.$refs.ezvizVideo.ezvizVideoPlayBack(this.videoInfo,startTime,endTime);
    }
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
.video-box{
  width: 98%;
  height: 600px;
}
</style>