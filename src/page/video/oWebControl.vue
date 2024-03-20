<template>
  <div>
    <div id="playWnd" v-loading="loading"></div>
    <div>
      <p>播放</p>
      <el-button type="" @click="playLiveVideoOcx({cameraIndexCode:'132123'})">实时播放</el-button>
      <el-button type="" @click="playVideoBack({cameraIndexCode:'456456'})">回放播放</el-button>
    </div>
    <div>
      <p>点击切换窗口数</p>
      <el-button type="" @click="getSetLayout(item)" v-for="(item, index) in layoutList" :key="index">{{ item }}</el-button>
    </div>
    <div>
      <p>回放、实时</p>
      <el-button type="" @click="startPlayback(1)">回放</el-button>
      <el-button type="" @click="startPlayback(0)">实时</el-button>
    </div>
  </div>
</template>

<script>
var bIE = (!!window.ActiveXObject || 'ActiveXObject' in window);// 是否为IE浏览器
var pubKey = '';
var iLastCoverLeft = 0;
var iLastCoverTop = 0;
var iLastCoverRight = 0;
var iLastCoverBottom = 0;
var oWebControl = null
export default {
  props: {},
  components: {},
  watch: {},
  computed: {},
  data () {
    return {
      winWidth:1360,
      winHeight:760,
      initCount:0,
      layoutList:[ '1x1', '2x2','3x3','4x4','5x5','1x2', '1+2','1+5','1+7', '1+8','1+9', '1+12','1+16','4+9','1+1+12', '3+4','1x4','4x6'],
      playMode:0,//0-预览，1-回放
      loading:true,
    };
  },
  mounted () {
    this.initPlugin()
  },
  created () {},
  methods: {
    initPlugin(){
      let that = this
      this.winWidth = document.getElementById('playWnd').offsetWidth;
      this.winHeight =  document.documentElement.clientHeight;
      oWebControl = new WebControl({
        szPluginContainer: "playWnd",
        iServicePortStart: 15900,
        iServicePortEnd: 15909,
        cbConnectSuccess: function () {
          that.setCallbacks();
          oWebControl.JS_StartService("window", {
            dllPath: "./VideoPluginConnect.dll"
          }).then(function () {
            oWebControl.JS_CreateWnd("playWnd", that.winWidth, that.winHeight).then(function () {
              console.log("JS_CreateWnd success");
              that.loading = false
              that.initLivePlayer();
            });
          }, function () {

          });
        },
        cbConnectError: function () {
          that.loading = false
          console.log("cbConnectError");
          oWebControl = null;
          // $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
          WebControl.JS_WakeUp("VideoWebPlugin://");
          that.initCount ++;
          if (that.initCount < 3) {
            setTimeout(function () {
              that.initPlugin();
            }, 3000)
          } else {
            // $("#playWnd").html("插件启动失败，请检查插件是否安装！");
          }
        },
        cbConnectClose: function () {
          that.loading = false
          console.log("cbConnectClose");
          oWebControl = null;
        }
      });
    },
    // 初始化播放器
    initLivePlayer(){
      let that = this
      this.getPubKey(function () {
			
			    ////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////		
            var appkey = "28730366";                           //综合安防管理平台提供的appkey，必填
            var secret = that.setEncrypt("HSZkCJpSJ7gSUYrO6wVi");   //综合安防管理平台提供的secret，必填
            var ip = "10.19.132.75";                           //综合安防管理平台IP地址，必填
            var playMode = that.playMode;                                  //初始播放模式：0-预览，1-回放
            var port = 443;                                    //综合安防管理平台端口，若启用HTTPS协议，默认443
            var snapDir = "D:\\SnapDir";                       //抓图存储路径
            var videoDir = "D:\\VideoDir";                     //紧急录像或录像剪辑存储路径
            var layout = "1x1";                                //playMode指定模式的布局
            var enableHTTPS = 1;                               //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
            var encryptedFields = 'secret';					   //加密字段，默认加密领域为secret
            var showToolbar = 1;                               //是否显示工具栏，0-不显示，非0-显示
            var showSmart = 1;                                 //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
            var buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";  //自定义工具条按钮
			      ////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////
            oWebControl.JS_RequestInterface({
                funcName: "init",
                argument: JSON.stringify({
                    appkey: appkey,                            //API网关提供的appkey
                    secret: secret,                            //API网关提供的secret
                    ip: ip,                                    //API网关IP地址
                    playMode: playMode,                        //播放模式（决定显示预览还是回放界面）
                    port: port,                                //端口
                    snapDir: snapDir,                          //抓图存储路径
                    videoDir: videoDir,                        //紧急录像或录像剪辑存储路径
                    layout: layout,                            //布局
                    enableHTTPS: enableHTTPS,                  //是否启用HTTPS协议
                    encryptedFields: encryptedFields,          //加密字段
                    showToolbar: showToolbar,                  //是否显示工具栏
                    showSmart: showSmart,                      //是否显示智能信息
                    buttonIDs: buttonIDs                       //自定义工具条按钮
                })
            }).then(function (oData) {
				        oWebControl.JS_Resize(1000, 600);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
            });
        });
    },
    //设置窗口控制回调
    setCallbacks() {
      let that = this
      oWebControl.JS_SetWindowControlCallback({
          cbIntegrationCallBack: that.cbIntegrationCallBack
      });
    },
    //推送消息
    cbIntegrationCallBack(oData) {
      console.log(JSON.stringify(oData.responseMsg));
    },
    setWndCover() {
      console.log("----------setWndCover---------");
        var iWidth = $(window).width();
        var iHeight = $(window).height();
        var oDivRect = $("#playWnd").get(0).getBoundingClientRect();

        var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left): 0;
        var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top): 0;
        var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
        var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

        iCoverLeft = (iCoverLeft > winWidth) ? winWidth : iCoverLeft;
        iCoverTop = (iCoverTop > winHeight) ? winHeight : iCoverTop;
        iCoverRight = (iCoverRight > winWidth) ? winWidth : iCoverRight;
        iCoverBottom = (iCoverBottom > winHeight) ? winHeight : iCoverBottom;

        if (iLastCoverLeft != iCoverLeft) {
            console.log("iCoverLeft: " + iCoverLeft);
            iLastCoverLeft = iCoverLeft;
            oWebControl.JS_SetWndCover("left", iCoverLeft);
        }
        if (iLastCoverTop != iCoverTop) {
            console.log("iCoverTop: " + iCoverTop);
            iLastCoverTop = iCoverTop;
            oWebControl.JS_SetWndCover("top", iCoverTop);
        }
        if (iLastCoverRight != iCoverRight) {
            console.log("iCoverRight: " + iCoverRight);
            iLastCoverRight = iCoverRight;
            oWebControl.JS_SetWndCover("right", iCoverRight);
        }
        if (iLastCoverBottom != iCoverBottom) {
            console.log("iCoverBottom: " + iCoverBottom);
            iLastCoverBottom = iCoverBottom;
            oWebControl.JS_SetWndCover("bottom", iCoverBottom);
        }
    },
    getPubKey (callback) {
        oWebControl.JS_RequestInterface({
            funcName: "getRSAPubKey",
            argument: JSON.stringify({
                keyLength: 1024
            })
        }).then(function (oData) {
            if (oData.responseMsg.data) {
                pubKey = oData.responseMsg.data;
                callback()
            }
        })
    },
    setEncrypt (value) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(pubKey);
        return encrypt.encrypt(value);
    },
    getVideoList(){
      this.$axios.post('',{}).then(res =>{
        let list = res.data.data
        if (list.length > 4 && list.length <= 9) {
          this.getSetLayout('3x3')
        } else if (list.length > 9){
          this.getSetLayout('4x4')
        } else if (list.length >1 && list.length <= 4){
          this.getSetLayout('2x2')
        }
        this.batchPlayVido(list)
        // list.forEach(item => {
        //   this.playLiveVideoOcx(item)
        // });
      })
    },
    playLiveVideoOcx(info){ //单个视频播放
      if (!info.cameraIndexCode ) {
        //showCBInfo("监控点编号不能为空！", 'error');
        return
      }
      var cameraIndexCode  = info.cameraIndexCode;     //获取输入的监控点编号值，必填
      var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
      var transMode = 1;                                      //传输协议：0-UDP，1-TCP
      var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
      var wndId = -1;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）
      cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
      cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
      oWebControl.JS_RequestInterface({
          funcName: "startPreview",
          argument: JSON.stringify({
              cameraIndexCode:cameraIndexCode,                //监控点编号
              streamMode: streamMode,                         //主子码流标识
              transMode: transMode,                           //传输协议
              gpuMode: gpuMode,                               //是否开启GPU硬解
              wndId:wndId                                     //可指定播放窗口
          })
      }).then(function (oData) {
          console.log(oData);
        })
    },
    batchPlayVido(list){ //批量播放视频
      oWebControl.JS_RequestInterface({
          funcName: "startMultiPreviewByCameraIndexCode",
          argument: JSON.stringify({
            list:[
              {
                "authUuid": "", //可忽略
                "cameraIndexCode": "",//获取输入的监控点编号值，必填
                "ezvizDirect": 0, //未指定或为 0-非直连 其它值-直连。多平台接入时不支持直连萤石，如指定直连，
                "gpuMode": 0, //0-不启用 1-启用，如未指定则使用默认值 0，如指定非可选值则返回错误，如无特殊 需求建议不启用
                "streamMode": 0, //0-主码流 1-子码流，如未指定则使用默认值 0，如指定非可选值，返回错误
                "transMode": 1, //0-UDP 1-TCP，如未指定则使用默认值 1，如指定非可选值则返回错误。
                "wndId": 1 //可指定播放窗口
              },
              {
                "authUuid": "",
                "cameraIndexCode": "",
                "ezvizDirect": 0,
                "gpuMode": 0,
                "streamMode": 0,
                "transMode": 1,
                "wndId": 2
              }
            ]
          })
      })
    },
    getSetLayout(layout){
      //有“1x1”、 “2x2”、“3x3”、“4x4”、“5x5”、“1x2”、 “1+2”、“1+5”、“1+7”、 “1+8”、“1+9”、 “1+12”、“1+16”、“4+9”、“1+1+12”、 “3+4”、“1x4”、“4x6”
      oWebControl.JS_RequestInterface({
          funcName: "setLayout",
          argument: {
            layout: layout // 窗口布局
          }
      }).then(function (oData) {
        oWebControl.JS_Resize(1000, 600);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
      });
    },
    // 销毁视频
    stopDestroyWnd(){
      if (oWebControl != null){
        // oWebControl.JS_RequestInterface({
        //     funcName: "stopAllPreview"
        // })
        oWebControl.JS_Disconnect();
        oWebControl.JS_DestroyWnd()
          .then(() => {})
          .catch(() => {})
        oWebControl.JS_HideWnd();
        oWebControl = null
      }
    },
    // 回放
    startPlayback(val){
      this.loading = true;
      this.stopDestroyWnd();
      this.playMode = val;
      setTimeout(()=>{
        this.initPlugin();
      },1000)
    },
    //单个回放视频播放
    playVideoBack(info){
        var cameraIndexCode  = info.cameraIndexCode;         //获取输入的监控点编号值，必填
        var startTimeStamp = new Date().getTime() - 24*60*60*1000;    //回放开始时间戳，必填
        var endTimeStamp = new Date().getTime();        //回放结束时间戳，必填
        var recordLocation = 0;                                     //录像存储位置：0-中心存储，1-设备存储
        var transMode = 1;                                          //传输协议：0-UDP，1-TCP
        var gpuMode = 0;                                            //是否启用GPU硬解，0-不启用，1-启用
        var wndId = -1;                                             //播放窗口序号（在2x2以上布局下可指定播放窗口）
        oWebControl.JS_RequestInterface({
            funcName: "startPlayback",
            argument: JSON.stringify({
                cameraIndexCode: cameraIndexCode,                   //监控点编号
                startTimeStamp: Math.floor(startTimeStamp / 1000).toString(),  //录像查询开始时间戳，单位：秒
                endTimeStamp: Math.floor(endTimeStamp / 1000).toString(),      //录像结束开始时间戳，单位：秒
                recordLocation: recordLocation,                     //录像存储类型：0-中心存储，1-设备存储
                transMode: transMode,                               //传输协议：0-UDP，1-TCP
                gpuMode: gpuMode,                                   //是否启用GPU硬解，0-不启用，1-启用
                wndId:wndId                                         //可指定播放窗口
            })
        })
    },
    // 批量录像回放
    startMultiPlayback(list){
      oWebControl.JS_RequestInterface({
          funcName: "startMultiPlaybackByCameraIndexCode",
          argument: JSON.stringify({
            // list:list
            list:[
              {
                "authUuid": "518a28e068fc486bb7782ba20f77dc6a", //可忽略
                "cameraIndexCode": "",//获取输入的监控点编号值，必填
                "ezvizDirect": 0, //未指定或为 0-非直连 其它值-直连。多平台接入时不支持直连萤石，如指定直连，
                "gpuMode": 0, //0-不启用 1-启用，如未指定则使用默认值 0，如指定非可选值则返回错误，如无特殊 需求建议不启用
                "transMode": 1, //0-UDP 1-TCP，如未指定则使用默认值 1，如指定非可选值则返回错误。
                "wndId": 1 ,//可指定播放窗口,
                "endTimeStamp":  new Date().getTime(),//回放结束时间戳
                "playTimeStamp":  new Date().getTime() - 24*60*60*1000,//播放时间戳
                "startTimeStamp": new Date().getTime() - 24*60*60*1000, //回放开始时间戳
              }
            ]
          })
      })
    },
    // 停止回放视频
    stopBackVideo(){
      oWebControl.JS_RequestInterface({
            funcName: "stopAllPlayback"
        })
    }
  },
  beforeCreated () {},
  beforeMounted () {},
  beforeUpdated () {},
  updated () {},
  beforeDestroy () {
    if (oWebControl != null){
      oWebControl.JS_Disconnect();
      oWebControl.JS_DestroyWnd()
        .then(() => {})
        .catch(() => {})
      oWebControl.JS_HideWnd();
    }
    
  },
  destroyed () {
    if (oWebControl != null){
      oWebControl.JS_Disconnect();
      oWebControl.JS_DestroyWnd()
        .then(() => {})
        .catch(() => {})
      oWebControl.JS_HideWnd();
    }
  },
}

</script>
<style lang='less' scoped>
#playWnd {
  width: 1000px;
  height: 600px;
}
</style>