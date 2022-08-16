<template>
  <div>
    <ul class="flex-wrap">
      <li v-for="(item,index) in list" :key="index" 
      :style="{'background-image':'linear-gradient(to top,#A531DC 0%,#A531DC '+ formatterNum(item.personNum)+'%'+', rgb(26,59,130) '+(formatterNum(item.personNum)+1)+'%'+',rgb(26,59,130)'+formatEnd(item.personNum)+'%)'}">
        <span>{{item.workType || '-'}}</span>
        <span style="margin-left:15px;">{{item.personNum}}</span>
      </li>
      <!-- <li v-for="(item,index) in list" :key="index" 
      :style="{'background-image':'linear-gradient(to top,yellow'+Number((item.personNum / num)*100) +'%' +',transparent' + (1-Number((item.personNum / num)*100)) + '%)' }"></li> -->
    </ul>
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
      list:[
          {
            "workType": null,
            "personNum": 1
          },
          {
            "workType": "砌筑工",
            "personNum": 69
          },
          {
            "workType": "钢筋工",
            "personNum": 72
          },
          {
            "workType": "架子工",
            "personNum": 17
          },
          {
            "workType": "混凝土工",
            "personNum": 5
          },
          {
            "workType": "模板工",
            "personNum": 2
          },
          {
            "workType": "通风工",
            "personNum": 5
          },
          {
            "workType": "安装起重工",
            "personNum": 6
          },
          {
            "workType": "电气设备安装调试工",
            "personNum": 3
          },
          {
            "workType": "其它",
            "personNum": 5
          },
          {
            "workType": "管道工",
            "personNum": 1
          },
          {
            "workType": "建筑电工",
            "personNum": 2
          },
          {
            "workType": "起重信号工",
            "personNum": 11
          },
          {
            "workType": "建筑起重机械安装拆卸工",
            "personNum": 1
          },
          {
            "workType": "装饰装修工",
            "personNum": 5
          },
          {
            "workType": "192",
            "personNum": 1
          },
          {
            "workType": "建筑门窗幕墙安装工",
            "personNum": 4
          },
          {
            "workType": "木工",
            "personNum": 75
          },
          {
            "workType": "除尘工",
            "personNum": 3
          },
          {
            "workType": "测量放线工",
            "personNum": 22
          },
          {
            "workType": "古建筑传统彩画工",
            "personNum": 1
          },
          {
            "workType": "古建筑传统油工",
            "personNum": 3
          },
          {
            "workType": "杂工",
            "personNum": 2
          },
          {
            "workType": "435",
            "personNum": 1
          },
          {
            "workType": "管理人员",
            "personNum": 4
          },
          {
            "workType": "901",
            "personNum": 1
          },
          {
            "workType": "塔式起重机驾驶员",
            "personNum": 1
          },
          {
            "workType": "999",
            "personNum": 1
          },
          {
            "workType": "其他",
            "personNum": 16
          },
          {
            "workType": "未配置",
            "personNum": 214
          },
          {
            "workType": "砌筑工",
            "personNum": 1
          },
          {
            "workType": "钢筋工",
            "personNum": 1
          }
      ],
      num:null
    };
  },
  mounted () {
    let total = 0
    this.num = this.list.reduce(function(total,currentValue){return total+currentValue.personNum*1;},0)
    // console.log(this.num);
  },
  created () {},
  methods: {
    formatterNum(personNum){
      if (this.num == null) {
        return
      }
      // console.log(personNum / this.num);
      let count = (((personNum / this.num)*100).toFixed(2))
      return count>3 ? count:2
    },
    formatEnd(personNum){
      let endNum = (100 - this.formatterNum(personNum)).toFixed(2)
      return endNum
    },
    // getRandomColor(){
    //   return '#'+Math.floor(Math.random()*256).toString(10);
    // }
  },
  beforeCreated () {},
  beforeMounted () {},
  beforeUpdated () {},
  updated () {},
  beforeDestroyed () {},
  destroyed () {},
}
</script>
<style lang='less' scoped>
li{
  margin-top: 15px;
  width: 200px;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 15px;
  background: rgb(26,59,130);
  line-height: 60px;
  color: #ccc;
  text-align: center;
}
.bg1{
  background-image: linear-gradient(to top,yellow 15%, transparent 60%);
  /* background: transparent; */
}
</style>