<template>
  <div>
    <table>
  <thead>
    <tr>
      <th>姓名</th>
      <th>语文成绩</th>
      <th>数学成绩</th>
      <th>英语成绩</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">张三</td>
      <td>90</td>
      <td>85</td>
      <td>92</td>
    </tr>
    <tr>
      <td>88</td>
      <td>92</td>
      <td>87</td>
    </tr>
    <tr>
      <td>18</td>
      <td>91</td>
      <td>88</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>92</td>
      <td>93</td>
      <td>95</td>
    </tr>
    <tr>
      <td>王五</td>
      <td>86</td>
      <td>91</td>
      <td>89</td>
    </tr>
  </tbody>
</table>
    <!-- <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">已完成</span>
          <span v-else-if="scope.row.status == 2">已取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status | formatStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{formatStatus(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatStatus2">
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  watch: {},
  filters:{
    formatStatus(status) {
      if (status == 1) {
        return '已完成'
      } else if (status == 2) {
        return '已取消'
      } else if (status == 3) {
        return '已过期'
      } else if (status == 4) {
        return '已结束'
      } else if (status == 5) {
        return '未开始'
      }
      return '-'
    },
  },
  computed: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",status:1,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",status:2,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",status:3,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",status:4,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",status:5,
        },
      ],
    };
  },
  mounted() {},
  created() {},
  methods: {
    formatStatus(status) {
      if (status == 1) {
        return '已完成'
      } else if (status == 2) {
        return '已取消'
      } else if (status == 3) {
        return '已过期'
      } else if (status == 4) {
        return '已结束'
      } else if (status == 5) {
        return '未开始'
      }
      return '-'
    },
    formatStatus2(row, column, status, index) {
      // row 当前行  column 表格属性 status 对应数据 index 第几条数据
      if (status == 1) {
        return '已完成'
      } else if (status == 2) {
        return '已取消'
      } else if (status == 3) {
        return '已过期'
      } else if (status == 4) {
        return '已结束'
      } else if (status == 5) {
        return '未开始'
      }
      return '-'
    },
  },
  beforeCreated() {},
  beforeMounted() {},
  beforeUpdated() {},
  updated() {},
  beforeDestroyed() {},
  destroyed() {},
};
</script>
<style lang='less' scoped>
td,th{
  color: #000;
  border: 1px solid black;
  padding: 5px;
}
table {
  border-collapse: collapse;
}
</style>
