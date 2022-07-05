<template>
  <div>
    <el-form :model="form">
      <el-form-item label="选择周">
        <el-date-picker
          v-model="form.week"
          type="week"
          :format="Monday + ' 至 ' + Sunday"
          placeholder="选择周-周一到周日"
          :picker-options="{ firstDayOfWeek: 1 }"
          @input="weekChange"
          style="width:50%"
        >
        </el-date-picker>
        <span>{{Monday + ' 至 ' + Sunday}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {},
  components: {},
  watch: {},
  computed: {},
  data () {
    return {
      form:{
        week:'',
      },
      Monday:'',Sunday:''
    };
  },
  mounted () {},
  created () {},
  methods: {
    weekChange() {
      // console.log(this.form.week);
       let weekOfday = moment(this.form.week).format("E");
      let Monday = moment(this.form.week)
        .subtract(weekOfday - 1, "days")
        .format("YYYY-MM-DD"); //周一日期
      let Sunday = moment(this.form.week)
        .add(7 - weekOfday, "days")
        .format("YYYY-MM-DD"); //周日日期
      this.Monday = Monday
      this.Sunday = Sunday
      console.log(Monday, Sunday);
    },
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
</style>