<template>
  <div>
    <!-- 附件预览 -->
    <div>
      <h3 style="margin-bottom:20px;">@vue-office</h3>
      <el-button @click="openFiles('.xlsx')">excel预览</el-button>
      <el-button @click="openFiles('.docx')">docx预览</el-button>
      <el-button @click="openFiles('.pdf')">pdf预览</el-button>
      <el-button @click="openFiles('.pptx')">ppt预览</el-button>
    </div>
    <div style="margin-top:40px;">
      <h3 style="margin-bottom:20px;">image</h3>
      <el-button @click="openFiles('.png')">图片预览</el-button>
    </div>
    <div style="margin-top:40px;">
      <h3 style="margin-bottom:20px;">video</h3>
      <el-button @click="openFiles('.mp4')">视频预览</el-button>
    </div>
    <div style="margin-top:40px;">
      <h3 style="margin-bottom:20px;">txt</h3>
      <el-button @click="openFiles('.txt')">txt预览</el-button>
      <el-button @click="getTxt">txt预览</el-button>
    </div>
    <div style="margin-top:40px;">
      <h3 style="margin-bottom:20px;">audio</h3>
      <el-button @click="openFiles('.mp3')">audio预览</el-button>
    </div>
    <el-dialog title="文件预览" :visible.sync="dialogVisible" width="70%" top="2%" @close="closeDialog">
        <div class="box-files">
          <div v-if="['.jpg','.png','.gif','.webp','.png','.bmp'].includes(type)" class="box-files flex-center">
            <el-image :src="fileUrl" class="file-box" fit="contain" :preview-src-list="[fileUrl]"></el-image>
          </div>
          <div v-else-if="['.docx'].includes(type)" class="box-files">
            <vue-office-docx :src="fileUrl" @rendered="renderedHandler" />
          </div>
          <div v-else-if="['.pdf'].includes(type)" class="box-files">
            <vue-office-pdf :src="fileUrl" @rendered="renderedHandler" @error="errorHandler" />
          </div>
          <div v-else-if="['.xlsx'].includes(type)" class="box-files">
            <vue-office-excel :src="fileUrl" @rendered="renderedHandler" @error="errorHandler" />
          </div>
          <div v-else-if="['.pptx'].includes(type)" class="box-files">
            <vue-office-pptx :src="fileUrl" @rendered="renderedHandler" @error="errorHandler" />
          </div>
          <div v-else-if="['.mp4','.avi','.mov',].includes(type)" class="box-files flex-center">
            <video controls width="100%" :src="fileUrl" style="object-fit: cover;width: 400px;">
              Your browser does not support the video tag.
            </video>
          </div>
          <div v-else-if="['.txt'].includes(type)" class="box-files flex-center">
            <pre>{{fileUrl}}</pre>
          </div>
          <div v-else-if="['.mp3'].includes(type)" class="box-files flex-center">
            <p>video标签</p>
            <video controls autoplay name="media"><source :src="fileUrl" type="audio/mpeg"></video>
            <p>audio标签</p>
            <audio controls> 
                <source :src="fileUrl" type="audio/mpeg"> 
                您的浏览器不支持 audio 元素。 
            </audio>
          </div>
        </div>
        <div slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficePptx from '@vue-office/pptx'
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'
export default {
  props: {},
  components: {
    VueOfficeDocx,VueOfficePdf,VueOfficeExcel,VueOfficePptx
  },
  watch: {},
  computed: {},
  data () {
    return {
      fileUrl:'',
      type:'',
      dialogVisible:false
    };
  },
  mounted () {},
  created () {},
  methods: {
    openFiles(type){
      let url = '';
      if (type == '.xlsx') {
        url = "http://static.shanhuxueyuan.com/demo/excel.xlsx"
      } else if(type == '.docx'){
        url = "http://static.shanhuxueyuan.com/test6.docx"
      } else if(type == '.pdf'){
        url = "http://static.shanhuxueyuan.com/test.pdf"
      } else if(type == '.pptx'){
        url = "http://localhost:8080/files/预览ppt.pptx"
      } else if(type == '.png'){
        url = "https://www.bing.com/th?id=OHR.TrulliGrove_ZH-CN9519400567_1920x1080.jpg"
      } else if(type == '.mp4'){
        url = "https://dayu.qqsuu.cn/moyuribaoshipin/file/20241126.mp4"
        // url = "https://cdn.xxhzm.cn/videos/meinv/7112434921842560271.mp4"
      } else if(type == '.txt'){
        url = "https://pan.suyanw.cn/down.php/4935b1dc61233c907e26eb523f8e778a.txt"
      } else if(type == '.mp3'){
        url = 'https://api.zxz.ee/api/zdbs/m/15.MP3'
      }
      this.type = type;
      this.fileUrl = url;
      this.dialogVisible = true;
    },
    renderedHandler() {
        console.log("渲染完成")
    },
    errorHandler() {
        console.log("渲染失败")
    },
    // getImage(){
    //   this.$axios.get('https://api.dwo.cc/api/meizi?type=json').then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // },
    async getTxt(){
      let filePath = 'http://localhost:8080/files/view.txt'
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        this.type = '.txt';
        this.fileUrl = text;
        this.dialogVisible = true;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
      // this.$axios.get('https://pan.suyanw.cn/down.php/4935b1dc61233c907e26eb523f8e778a.txt').then(res => {
      //   console.log(res)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    },
    closeDialog(){
      this.type = '';
      this.fileUrl = '';
      this.dialogVisible = false;
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
.box-files{
  height: 70vh;
  width: 100%;
  overflow-y: auto;
  
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>