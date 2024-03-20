<template>
  <div>
    <!-- <table>
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
    </table> -->
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="handerMethod" :span-method="objectSpanMethod">
      <el-table-column label="序号" type="index" width="50"> </el-table-column>
      <!-- <el-table-column label="序号" prop="index" width="50"> </el-table-column> -->
      <el-table-column prop="projectName" label="项目名称" header-align="center"> </el-table-column>
      <el-table-column prop="projectContent" label="项目内容" header-align="center"> </el-table-column>
      <el-table-column label="建设类型" header-align="center">
        <template slot-scope="scope">
          <el-checkbox @change="getTypeSelect(scope.row)" v-model="scope.row.type">选择</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="typeDec" label="建设类型"></el-table-column>
      <el-table-column prop="num" label="数量" header-align="center">
        <template slot-scope="scope">
          <el-input-number size="mini" :min="0" :precision="0" :step="1" v-model="scope.row.num"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="interpellation" show-overflow-tooltip label="要求说明" header-align="center"></el-table-column>
      <el-table-column prop="hardwareExplain" show-overflow-tooltip label="硬件参数要求" header-align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import tableJson from '@/page/table/tableJson'
export default {
  props: {},
  components: {},
  watch: {},
  filters:{},
  computed: {},
  data() {
    return {
      tableData: tableJson.list,
      tableArr: [],
      tablePos: 0,
    };
  },
  mounted() {},
  created() {},
  methods: {
    getTypeSelect(row){
      // console.log(row);
    },
    handerMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {//行索引为0代表表头那一行
        if (columnIndex === 3) {//列索引，找到你自己要合并的那一列，这个是动态的，根据实际需求来
          this.$nextTick(() => {
            if (document.getElementsByClassName(column.id).length !== 0) {
              document.getElementsByClassName(column.id)[0].setAttribute('colSpan', 2)
            }
          })
        }
      }
      if (columnIndex === 4) {//将相邻的列设为隐藏
        return { display: 'none' }
      }
    },
    // 里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if ([1].includes(columnIndex)) {
        if (rowIndex === 0) {
          return { rowspan: 3, colspan: 1 };
        } else if ([3,55].includes(rowIndex)) {
          return { rowspan: 8, colspan: 1 };
        } else if (rowIndex === 11) {
          return { rowspan: 17, colspan: 1 };
        } else if (rowIndex === 28) {
          return { rowspan: 24, colspan: 1 };
        } else if ([52,122,125,128].includes(rowIndex)) {
          return { rowspan: 3, colspan: 1 };
        } else if ([63,131,135,166].includes(rowIndex)) {
          return { rowspan: 4, colspan: 1 };
        } else if ([67,87].includes(rowIndex)) {
          return { rowspan: 20, colspan: 1 };
        } else if ([107,145].includes(rowIndex)) {
          return { rowspan: 15, colspan: 1 };
        } else if ([139,160].includes(rowIndex)) {
          return { rowspan: 6, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      }else if([2].includes(columnIndex)){
        if ([3,7,11,15,19,23,28,32,36,40,44,48,55,59,63,67,71,75,79,83,87,91,95,99,103,110,114,118,131,135,145,149,153,166].includes(rowIndex)) {
          return { rowspan: 4, colspan: 1 };
        } else if ([0,1,2,27].includes(rowIndex)){
          return { rowspan: 1, colspan: 1 };
        }  else if ([52,107,122,125,128,139,142,157,160,163].includes(rowIndex)){
          return { rowspan: 3, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      }else if([3].includes(columnIndex)){
        // if (rowIndex < 3) {
        //   return { rowspan: 1, colspan: 1 };
        // }else if ((rowIndex + 1) % 2 === 0 ) {
        //   return { rowspan: 2, colspan: 1 };
        // }else {
        //   return { rowspan: 0, colspan: 0 };
        // }
      }else if([6].includes(columnIndex)){
        if ([0,52,107,122].includes(rowIndex)) {
          return { rowspan: 3, colspan: 1 };
        } else if ([3,55].includes(rowIndex)) {
          return { rowspan: 8, colspan: 1 };
        } else if ([11,87].includes(rowIndex)) {
          return { rowspan: 12, colspan: 1 };
        } else if (rowIndex === 23) {
          return { rowspan: 5, colspan: 1 };
        }  else if (rowIndex === 28) {
          return { rowspan: 20, colspan: 1 };
        } else if ([48,63,67,99,103,110,114,118].includes(rowIndex)) {
          return { rowspan: 4, colspan: 1 };
        } else if ([71].includes(rowIndex)) {
          return { rowspan: 16, colspan: 1 };
        } else if ([125].includes(rowIndex)) {
          return { rowspan: 45, colspan: 1 };
        }  else {
          return { rowspan: 0, colspan: 0 };
        }
      }else if([7].includes(columnIndex)){
        if ([0,52,107,122,125,128,139,142,157,160,163].includes(rowIndex)) {
          return { rowspan: 3, colspan: 1 };
        } else if ([3,7,11,15,19,23,28,32,36,40,44,48,55,59,63,67,83,87,91,95,99,103,110,114,118,131,135,145,166].includes(rowIndex)) {
          return { rowspan: 4, colspan: 1 };
        } else if ([27].includes(rowIndex)){
          return { rowspan: 1, colspan: 1 };
        } else if ([71].includes(rowIndex)){
          return { rowspan: 12, colspan: 1 };
        } else if ([149].includes(rowIndex)){
          return { rowspan: 8, colspan: 1 };
        }  else {
          return { rowspan: 0, colspan: 0 };
        }
      }
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
