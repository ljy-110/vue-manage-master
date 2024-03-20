<template>
  <div>
    <!-- <div class="video-switch">
      <div class="video-switch-tab">
        <div class="video-switch-tab-line" :style="switchLineStyle"></div>
        <div class="video-switch-tab-btn" @click="switchTo(0)"
          :class="{'tab-active':(switchVideo===0?true : false )}">
          实时预览
        </div>
        <div class="video-switch-tab-btn" @click="switchTo(1)"
          :class="{'tab-active':(switchVideo===1?true : false )}">
          录像回放
        </div>
      </div>
    </div> -->
    <!-- <div class="input-group" style="margin:20px 0">
      <div class="input-group-prepend">
        <span class="input-group-text">事件回调信息</span>
        <p>{{callbackMessage}}</p>
      </div>
      
    </div> -->
    <div class="download-control" v-if="showTipVM">
      <span class="activeXmsg" style="font-size: 18px;">
        请<a href="../../../../static/plug/playbackControl.zip">
          <font style="color: red">下载</font>
        </a>并安装控件
      </span>
    </div>
    <div id="playWndHKEzviz" style="width: 800px;height:500px;"></div>
    
  </div>
</template>

<script>
var oWebControl = null;
var winHeight = null
var winWidth = null
var accessToken = '';
var vm = null
/**
 * video 初始化及配置
 * @param {*video挂载的dom id} id
 * @param {*连接成功的回调} cbConnectSuccess
 * @param {*连接报错的回调} cbConnectError
 * @param {*连接关闭的回调} cbConnectClose
 */
function WebControlInit(id, cbConnectSuccess, cbConnectError, cbConnectClose) {
  return new WebControl({
    szPluginContainer: id,
    iServicePortStart: 14510, // 对应 LocalServiceConfig.xml 中的ServicePortStart值
    iServicePortEnd: 14519, // 对应 LocalServiceConfig.xml 中的ServicePortEnd值
    cbConnectSuccess: cbConnectSuccess,
    cbConnectError: cbConnectError,
    cbConnectClose: cbConnectClose,
  });
}
/**
 * 离开页面时调用 断开链接的方法
 * @param {*视频插件实例} oWebControl
 */

// 监听视频控件的事件
function cbIntegrationCallBack(oData) {
  vm.showCBInfo(oData);
  console.log(oData);
  if (oData.responseMsg.arguments.type == 2) {
    // vm.layout = oData.responseMsg.arguments.wndNum;
    // vm.testLayout(oData.responseMsg.arguments.wndNum)
  }
  if (oData.responseMsg.eventName === 'FireTransFunction') {
    // 如果视频控件需要请求服务端数据，这里可以处理透传逻辑
  }
}

function cbConnectSuccess() {
  vm.showTipVM = false;
  // 设置窗口控制回调
  winWidth = document.getElementById('playWndHKEzviz').offsetWidth;
  winHeight =  document.documentElement.clientHeight - 400;
  oWebControl.JS_SetWindowControlCallback({
    cbIntegrationCallBack: cbIntegrationCallBack,
  });
  //创建视频窗口
  oWebControl
    .JS_StartService('window', {
      dllPath: './chain/cloudTransform.dll',
    })
    .then(function () {
      oWebControl.JS_CreateWnd('playWndHKEzviz', winWidth, winHeight).then(function () {
        console.log('JS_CreateWnd success');
      });
    });
}

function cbConnectError() {
  console.log('cbConnectError');
  oWebControl = null;
  vm.showTipVM = true;
  // this.$message.error('请先下载插件！')
  // console.error('确认本地进程是否已安装并开启成功！');
}

function cbConnectClose(bNormalClose) {
  // 连接异常断开：bNormalClose = false
  // JS_Disconnect正常断开：bNormalClose = true
  console.log('cbConnectClose');
  oWebControl = null;
}

//销毁视频控件
function WebControlDistory() {
  // var bIE = !!window.ActiveXObject || 'ActiveXObject' in window // 是否为IE浏览器
  if (oWebControl != null) {
    oWebControl.JS_DestroyWnd().then(
      function () {
        console.log('JS_DestroyWnd');
      },
      function () {}
    );
    oWebControl.JS_StopService('window').then(function () {
      oWebControl.JS_Disconnect().then(
        function () {
          console.log('JS_Disconnect');
        },
        function () {}
      );
    });
  }
}
window.onscroll = function () {
  if (oWebControl != null) {
    oWebControl.JS_Resize(900, 500);
  }
};
window.onresize = function () {
  if (oWebControl != null) {
    oWebControl.JS_Resize(900, 500);
  }
};

window.onunload = function () {
  try {
    oWebControl.JS_HideWnd();
    WebControlDistory();
  } catch (error) {
    console.error(error);
  }
};
window.onpagehide = function () {
  try {
    oWebControl.JS_HideWnd();
  } catch (error) {
    console.error(error);
  }
};
// var limitStart = parseInt( new Date('2021-07-29T16:01:00').getTime()/1000).toString();
// var limitEnd = parseInt( new Date('2021-07-29T17:01:30').getTime()/1000).toString();
export default {
  props: {},
  components: {},
  watch: {},
  computed: {
    switchLineStyle: function () {
      if (this.switchVideo === 0) {
        return {
          transform: 'translateX(0px)',
        };
      }
      return {
        transform: 'translateX(88px)',
      };
    },
  },
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
      layout: 1,
      switchVideo: 0, // 0实时预览 1录像回放
      callbackMessage: '', //显示回调信息
      tips: '调用成功',
      successTip: false,
      tipsShow: false,
      showTipVM:false,
    };
  },
  mounted () {
    oWebControl = WebControlInit(
      'playWndHKEzviz',
      cbConnectSuccess,
      cbConnectError,
      cbConnectClose
    );
    // console.log(showTip);
    // this.initVideo();
    
  },
  created () {
    vm = this;
  },
  methods: {
    ezvizVideoPlay(info){
      this.switchVideo = info.switchVideo;
      if (info.accessToken) {
        this.initVideo(info)
        // this.playVideo(info)
      } else {
        this.$message.error('无效accessToken!')
      }
    },
    ezvizVideoPlayBack(info,startTime,endTime){
      let that = this;
      this.switchVideo = info.switchVideo;
      // this.switchTo(info.switchVideo,info)
      if (oWebControl) {
        oWebControl
          .JS_RequestInterface({
            funcName: 'ChangeModel',
            arguments: encodeURI(
              JSON.stringify({
                model: info.switchVideo,
              })
            ),
          })
          .then(function (oData) {
            that.initVideo(info)
          });
      }
      this.startTime = startTime;
      this.endTime = endTime;
      if (info.accessToken) {
        // this.initVideo(info)
      } else {
        this.$message.error('无效accessToken!')
      }
    },
    switchTo(num,info) {
      let self = this;
      this.switchVideo = num;
      if (oWebControl) {
        oWebControl
          .JS_RequestInterface({
            funcName: 'ChangeModel',
            arguments: encodeURI(
              JSON.stringify({
                model: num,
              })
            ),
          })
          .then(function (oData) {
            self.playVideo(info);
          });
      }
    },
    /**
     * 设置视频初始化参数
     */
    initVideo(info) {
      // console.log('123213');
      let self = this;
      // if (!self.appKey || !self.ezvizToken) {
      //   self.showTips(false, '请输入appkey和token');
      //   return;
      // }
      // 初始化入参
      let argumentsPram = {
        layout: '',
        userName:"",
        waterMark:"zhgd",		
        waterMark:"1",
        iWndType:0,
        intelligenceEnable: 1,
        isRecord: 1,
        isSetPos: 1,
        motionDetectEnable: 0,
        playBackAlarmOverlyingEnable: 0,
        response: {
          code: 0,
          message: null,
          data: {
            appKey: self.appKey,
            ezvizToken: info.accessToken,
            videoLevel: 0,
			      logLevel: 3,
	          showMainTool:1,
	          showSubTool:1,
			      waterMark:"1",
			      userName:"zhgd",
	          platformId:self.platformId,
          },
        },
      };
      console.log('初始化入参', argumentsPram);
      // 调用视频控件初始化方法
      oWebControl
        .JS_RequestInterface({
          funcName: 'Init',
          arguments: encodeURI(JSON.stringify(argumentsPram)),
        })
        .then(function (oData) {
          self.showCBInfo(oData.responseMsg);
          self.showTips(true, '视频初始化成功！');
          self.playVideo(info);
        });
    },
	
    /**
     * 播放门店视频
     */
    playVideo(info){
      let self = this;
      if (!info.linkUrl || !info.cameraNo) {
        self.showTips(false, '请输入设备序列号和通道号');
        return;
      }
      // 预览入参
      let argumentsPram = {
        response: {
          code: 0,
          message: null,
          data: {
            deviceSerial: info.linkUrl,
            channelCode: info.cameraNo,
            channelNo: info.cameraNo,
            codeIsEncrypt:0,
            validateCode:"ASDFGH",
            deviceClass:self.deviceClass,
            deviceType:"10222",
            //deviceType:"10240",
            channelId:"2222222222",
            channelName:info.cameraNote,
            storeName:"",
            storeId:"storeid",
            startTime:'2022-11-09 20:00:00',
            endTime:'2022-11-09 21:40:00',
            //Limited_start:limitStart,
            //Limited_end:limitEnd,
          },
        },
      };
      if (self.deviceClass === '1') { // 国标协议对应的两个字段
        argumentsPram.response.data.channelCode = self.channelNo
        argumentsPram.response.data.platformId = self.platformId
      } else{ // 海康协议对应的一个字段
        argumentsPram.response.data.channelNo = +Number(info.cameraNo)
      }
      // 回放时对应的两个字段
      if (this.switchVideo === 1) {
        if (this.startTime)
          argumentsPram.response.data.startTime = this.startTime;
        if (this.endTime) argumentsPram.response.data.endTime = this.endTime;
      }
      console.log('预览/回放入参', argumentsPram);
      // 调用视频控件预览方法
      oWebControl
        .JS_RequestInterface({
          funcName: this.switchVideo === 0 ? 'StartPreview' : 'StartPlayback',
          arguments: encodeURI(JSON.stringify(argumentsPram)),
        })
        .then(function (oData) {
          self.showCBInfo(oData.responseMsg);
          self.showTips(true, '预览/回放成功！');
        });
    },
    /**
     * 设置事件回调信息
     */
    showCBInfo: function (message) {
      this.callbackMessage =
      this.callbackMessage + JSON.stringify(message) + '\n\n';
    },
    showTips: function (status, message) {
      let self = this;
      this.successTip = status;
      this.tips = message;
      this.tipsShow = true;
      setTimeout(function () {
        self.tipsShow = false;
      }, 1000);
    },
    /**
     * 隐藏视频
     */
    hideVideo: function () {
      oWebControl.JS_HideWnd();
    },
    /**
     * 显示视频
     */
    showVideo: function () {
      oWebControl.JS_ShowWnd();
    },
    /**
     * 获取窗口数
     */
    GetLayout: function () {
      let data = null;
      let self = this;
      oWebControl
        .JS_RequestInterface({
          funcName: 'GetLayout',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: data,
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
    /**
     * 抓图
     */
    CaptureJPGEx: function () {
      let data = null;
      let self = this;

      oWebControl
        .JS_RequestInterface({
          funcName: 'CaptureJPGEx',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: data,
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
	
	testStopPlay: function(){
		var str=parseInt(prompt('请输入窗口编号'));
		oWebControl.JS_RequestInterface({
          funcName: 'StopPlay',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: {
					wndId:str //传入1表示停止窗口1，传入-1表示停止当前活动窗口
				}
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
	
	testLayout(value){
    let self = this
		// var str=parseInt(prompt('请输入Layout编号'));
    console.log(value);
		oWebControl.JS_RequestInterface({
          funcName: 'SetLayout',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: {
                  layout:value //参数int为布局编号，其定义参见控件初始化函数 init方法中指定的编号。
                }
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
	testSoundVolumn: function(){
		var num=parseInt(prompt('请输入音量'));
		oWebControl.JS_RequestInterface({
          funcName: 'SoundVolumn',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: {
					wndId:0, //传入1表示停止窗口1，传入-1表示停止当前活动窗口
					volumn: num
				}
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
	
	testMute: function(){
		var num=parseInt(prompt('请输入窗口ID'));
		oWebControl.JS_RequestInterface({
          funcName: 'MuteOnOff',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: {
					wndId:num
				}
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
	
	testSelectWnd: function(){
		var num=parseInt(prompt('请输入窗口ID'));
		oWebControl.JS_RequestInterface({
          funcName: 'SelectPlayWnd',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: {
					wndId:num
				}
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
	
	testVidelLevel: function(){
		var num=parseInt(prompt('请输入窗口ID'));
		var level=parseInt(prompt('请输入清晰度，0：流畅 1：均衡 2：高品质 3：超清'));
		oWebControl.JS_RequestInterface({
          funcName: 'SetVideoLevel',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: {
					wndId:num,
					level: level //0：流畅 1：均衡 2：高品质 3：超清
				}
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
	testStartTalk: function(){
		var num=parseInt(prompt('请输入窗口ID'));
		oWebControl.JS_RequestInterface({
          funcName: 'StartTalk',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: {
					wndId:num
				}
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
	
    testStopTalk: function(){
      var num=parseInt(prompt('请输入窗口ID'));
      oWebControl.JS_RequestInterface({
          funcName: 'StopTalk',
          arguments: encodeURI(
            JSON.stringify({
              response: {
                code: 0,
                message: null,
                data: {
					wndId:num
				}
              },
            })
          ),
        })
        .then(function (oData) {
          console.log(JSON.stringify(oData.responseMsg));
          self.showCBInfo(oData.responseMsg);
        });
    },
    testStartRec: function(){
      var num=parseInt(prompt('请输入窗口ID'));
      oWebControl.JS_RequestInterface({
            funcName: 'StartRecord',
            arguments: encodeURI(
              JSON.stringify({
                response: {
                  code: 0,
                  message: null,
                  data: {
            wndId:num
          }
                },
              })
            ),
          })
          .then(function (oData) {
            console.log(JSON.stringify(oData.responseMsg));
            self.showCBInfo(oData.responseMsg);
          });
    },
	
    testStopRec: function(){
      var num=parseInt(prompt('请输入窗口ID'));
      oWebControl.JS_RequestInterface({
            funcName: 'StopRecord',
            arguments: encodeURI(
              JSON.stringify({
                response: {
                  code: 0,
                  message: null,
                  data: {
            wndId:num
          }
                },
              })
            ),
          })
          .then(function (oData) {
            console.log(JSON.stringify(oData.responseMsg));
            self.showCBInfo(oData.responseMsg);
          });
    },
	
    alarmMsg() {
	  let res = {"request":{"body":{"alarmTypes":[10800,0,0,0,0],"channelId":"066dde0465dd4abaab6afe355baf9d0b","endTime":"1621007999000","startTime":"1620921600000"},"callBack":"GetAlarmMsgOrders","majorKey":"","method":"POST","storeId":"","url":"/videoplugin/message/getMessageByTypes"},"response":{"code":0,"message":null,"data":[{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620921217000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620920678000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620920586000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620919513000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620919483000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620919333000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620918913000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620918616000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620918305000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620917858000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620917658000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620917244000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620917064000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620916994000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620916668000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620916571000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620916529000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620916343000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620916081000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620915825000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620915676000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620915531000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620915394000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620915197000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620914971000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620914644000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620914533000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620914457000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620914376000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620914284000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620913973000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620913431000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620912834000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620912771000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620912354000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620912275000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620912093000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620912024000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620911890000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620911839000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620911807000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620911760000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620911682000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620911270000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620911184000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910982000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910931000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910851000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910781000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910727000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910677000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910647000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910588000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910544000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910484000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910410000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910350000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910278000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910217000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620910124000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909976000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909939000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909847000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909817000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909736000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909664000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909605000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909575000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909346000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909247000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909216000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909149000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909120000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620909028000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908999000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908969000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908909000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908880000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908835000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908750000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908720000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908652000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908612000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908582000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908552000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908456000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908426000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908299000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908268000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620908050000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620907918000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620907758000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620907625000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620907386000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620907292000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620907127000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906864000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906828000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906797000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906747000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906717000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906632000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906501000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906412000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906368000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906329000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906142000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906112000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620906013000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905946000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905823000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905697000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905622000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905571000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905541000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905511000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905481000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905442000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905412000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905382000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905352000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905322000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905262000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905196000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620905150000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904994000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904931000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904813000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904730000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904700000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904618000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904286000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904173000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904143000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904112000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904053000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620904023000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903854000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903789000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903723000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903643000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903612000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903573000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903505000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903383000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903329000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903299000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903268000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903200000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903149000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620903120000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902977000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902860000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902770000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902639000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902609000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902517000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902373000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902320000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902253000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902198000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620902132000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901940000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901850000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901789000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901746000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901685000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901638000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901520000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901489000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901424000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901271000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901233000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620901157000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900915000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900834000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900774000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900744000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900650000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900440000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900409000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900175000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900134000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900069000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620900016000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899976000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899908000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899879000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899826000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899756000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899599000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899559000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899467000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899406000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899265000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899211000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899140000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899110000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620899050000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898991000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898926000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898834000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898785000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898746000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898697000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898666000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898507000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898293000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898248000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898218000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898157000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898088000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620898020000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897960000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897850000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897807000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897771000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897719000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897690000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897630000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897600000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897570000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897540000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897475000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897412000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897369000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897339000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897279000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897237000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897207000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897172000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897142000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897112000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620897024000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896985000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896874000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896843000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896814000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896783000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896736000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896621000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896478000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896447000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896358000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896307000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896277000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896247000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896214000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620896040000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895953000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895921000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895868000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895770000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895704000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895590000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895559000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895480000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895442000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895377000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895347000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895293000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895171000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895136000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620895017000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894926000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894896000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894864000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894834000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894738000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894599000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894539000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894426000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894359000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894297000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894213000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894183000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620894051000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893964000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893934000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893843000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893754000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893676000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893606000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893530000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893452000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893423000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893357000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893288000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893143000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893051000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620893006000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892904000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892824000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892764000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892541000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892479000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892412000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892311000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892281000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892209000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620892063000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891991000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891931000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891870000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891810000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891708000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891655000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891585000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891531000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891501000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891401000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891297000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891257000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891216000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891178000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891128000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620891033000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890973000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890940000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890879000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890794000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890714000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890616000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890586000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890469000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890414000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890346000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890288000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890179000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890108000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890041000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620890011000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620889937000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620889719000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620889635000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620889481000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620889451000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620889317000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620889227000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620889139000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620889034000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888973000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888902000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888837000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888767000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888737000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888706000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888633000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888571000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888413000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888353000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888323000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888249000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888162000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620888000000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887859000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887776000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887734000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887692000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887619000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887501000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887355000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887320000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887289000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887126000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887066000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620887034000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886970000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886884000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886804000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886728000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886609000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886538000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886478000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886396000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886334000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886246000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886111000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620886011000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885956000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885894000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885696000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885514000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885484000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885414000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885383000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885341000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885306000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885276000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885216000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885186000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885114000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885037000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620885006000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620884975000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620884945000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620884911000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620884851000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620884780000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620884696000}],"success":true}}
	  
      console.log(res)
	  
	  //let res = {"request":{"body":{"alarmTypes":[10800,0,0,0,0],"channelId":"066dde0465dd4abaab6afe355baf9d0b","endTime":"1621007999000","startTime":"1620921600000"},"callBack":"GetAlarmMsgOrders","majorKey":"","method":"POST","storeId":"","url":"/videoplugin/message/getMessageByTypes"},"response":{"code":0,"message":null,"data":[{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620864635000},{"alarmType":10800,"alarmName":"移动侦测报警","alarmTime":1620840908000}],"success":true}}
      oWebControl
        .JS_RequestInterface({funcName: 'TransFunctionResult', arguments:encodeURI(JSON.stringify(res))})

        //.JS_RequestInterface({funcName: 'TransFunctionResult', arguments: {
        //  response: res
        //}})
    },
  },
  beforeCreated () {},
  beforeMounted () {},
  beforeUpdated () {},
  updated () {},
  beforeDestroyed () {
    if (oWebControl != null) {
      oWebControl.JS_DestroyWnd().then(
        function () {
          console.log('JS_DestroyWnd');
        },
        function () {}
      );
      oWebControl.JS_StopService('window').then(function () {
        oWebControl.JS_Disconnect().then(
          function () {
            console.log('JS_Disconnect');
          },
          function () {}
        );
      });
    }
  },
  destroyed () {
    if (oWebControl != null) {
      oWebControl.JS_DestroyWnd().then(
        function () {
          console.log('JS_DestroyWnd');
        },
        function () {}
      );
      oWebControl.JS_StopService('window').then(function () {
        oWebControl.JS_Disconnect().then(
          function () {
            console.log('JS_Disconnect');
          },
          function () {}
        );
      });
    }
  },
}

</script>
<style lang='less' scoped>
.video-switch {
  height: 48px;
  width: 900px;
  background: #333333;
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.video-switch-tab {
  height: 48px;
  margin: 0 auto;
  transition: transform 0.3s;
  position: relative;
}

.video-switch-tab-line {
  position: absolute;
  width: 88px;
  top: 0;
  left: 0;
  height: 3px;
  background-color: #e72528;
  z-index: 1;
  transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.video-switch-tab-btn {
  font-size: 12px;
  font-weight: 801;
  float: left;
  font-family: "MicrosoftYaHei-Bold";
  line-height: 48px;
  color: #fff;
  opacity: 0.6;
  width: 88px;
  box-sizing: content-box;
  text-align: center;
}

#playWndHKEzviz {
  // background: #333333
}

.left {
  width: 450px;
  float: left;
  margin: 50px;
}

.right {
  float: left;
  margin: 50px;
}

.tab-active {
  opacity: 1;
}

.input-group {
  /* width: 550px; */
  height: 30px;
}

body {
  position: relative;
}

.tips {
  position: fixed;
  left: 0;
  z-index: 100;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>