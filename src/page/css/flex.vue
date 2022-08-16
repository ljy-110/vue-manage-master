<template>
  <div>
    <ul>
      <li>
        <p>均分</p>
        <div class="flex">
          <div class="row line1 flex001"></div>
          <div class="row line2 flex001"></div>
        </div>
      </li>
      <li>
        <p>宽度固定，余量占满(1)</p>
        <div class="flex">
          <div class="row line1" style="width:30%;"></div>
          <div class="row line2 flex001"></div>
        </div>
      </li>
      <li>
        <p>宽度固定，余量占满(2)</p>
        <div class="flex">
          <div class="row line1" style="width:30%;"></div>
          <div class="row line2 flexGrow"></div>
        </div>
      </li>
      <li>
        <p>分布两端布局</p>
        <div class="flex between">
          <div class="row line1" style="width:100px;"></div>
          <div class="row line2" style="width:100px;"></div>
        </div>
      </li>
      <li>
        <p>换行，靠左边起点</p>
        <div class="flex flex-wrap">
          <div class="row line1" style="width:50%;"></div>
          <div class="row line2" style="width:50%;"></div>
          <div class="row line2" style="width:50%;"></div>
          <div class="row line1" style="width:50%;"></div>
        </div>
      </li>
      <li>
        <p>不换行，靠左边起点</p>
        <div class="flex flex-nowrap">
          <div class="row line1" style="width:50%;"></div>
          <div class="row line2" style="width:50%;"></div>
          <div class="row line2" style="width:50%;"></div>
          <div class="row line1" style="width:50%;"></div>
        </div>
      </li>
      <li>
        <p>靠左边起点</p>
        <div class="flex flex-start">
          <div class="row line1" style="width:100px;"></div>
          <div class="row line2" style="width:100px;"></div>
          <div class="row line2" style="width:100px;"></div>
          <div class="row line1" style="width:100px;"></div>
        </div>
      </li>
      <li>
        <p>靠右边起点</p>
        <div class="flex flex-end">
          <div class="row line1" style="width:100px;"></div>
          <div class="row line2" style="width:100px;"></div>
          <div class="row line2" style="width:100px;"></div>
          <div class="row line1" style="width:100px;"></div>
        </div>
      </li>
      <li class="flex">
        <div class="flex001">
          <p>垂直水平居中</p>
          <div class="flex center colum">
            <div class="row line1" style="width:100px;"></div>
            <div class="row line2" style="width:100px;"></div>
          </div>
        </div>
        <div class="flex001">
          <p>垂直居中</p>
          <div class="flex h-center colum">
            <div class="row line1" style="width:100px;"></div>
            <div class="row line2" style="width:100px;"></div>
          </div>
        </div>
        <div class="flex001">
          <p>水平居中</p>
          <div class="flex j-center colum">
            <div class="row line1" style="width:100px;"></div>
            <div class="row line2" style="width:100px;"></div>
          </div>
        </div>
      </li>
      <li>
        <p>间隔相同</p>
        <div class="flex justify-space-around">
          <div class="row line1" style="width:100px;"></div>
          <div class="row line2" style="width:100px;"></div>
          <div class="row line2" style="width:100px;"></div>
          <div class="row line1" style="width:100px;"></div>
        </div>
      </li>
      <li>
        <p>垂直均分</p>
        <div class="flex colum flex-direction-column">
          <div class="row line1 flex001" style="width:100px;"></div>
          <div class="row line2 flex001" style="width:100px;"></div>
        </div>
      </li>
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
    };
  },
  mounted () {},
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
<style lang='css' scoped>
.line1{
  background-color: #FFE70B;
}
.line2{
  background-color: #27B643;
}
.row{
  height: 30px;
  line-height: 30px;
  /* background-color: #ccc; */
  border-radius: 5px;
}
.colum{
  background-color: #ccc;
  width: 100%;
  height: 100px;
  border-radius: 10px;
}
.flex{
  display: flex;
}
.flex001{
  flex: 1 1 0%;
}
.flexGrow{
  flex-grow: 1;
}
.between{
  justify-content: space-between;
}
.flex-wrap{
  flex-wrap: wrap;
  justify-content: flex-start;
}
.flex-nowrap{
  flex-wrap: nowrap;
}
.flex-start{
  justify-content: flex-start;
}
.flex-end{
  justify-content: flex-end;
}
.center{
  justify-content: center;
  align-items: center;
}
.h-center{
  align-items: center;
}
.j-center{
  justify-content: center;
}
.align-space-around{
  align-content:space-around;
}
.justify-space-around{
  justify-content:space-around;
}
.flex-direction-column{
  flex-direction:column;
}
</style>