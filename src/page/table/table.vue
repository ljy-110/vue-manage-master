<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
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
    </el-table>
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
</style>
