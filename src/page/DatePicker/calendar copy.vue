<template>
  <div style="height:100vh;width:100%;">
    <div id="calendar_content" class="calendar_content" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd">
      <div id="calendar_content_wrapper_prev" class="calendar_content_wrapper prev">
        <div class="week_wrap" v-for="(week, index) in prevDaysArr" :key="index">
          <div class="day_wrap" v-for="(day, indexDay) in week" :key="indexDay" :class="[6, 7].includes(day.week) ? 'rest_day' : ''">
            <div @click="changeActiveDay(day)">
              <p class="day_text" :class="activeDay === day.timeStr ? 'active_day' : ''">
                {{ day.timeStr ? new Date(day.timeStr).getDate() : "" }}
              </p>
            </div>
            <template v-if="day.id">
              <span v-if="day.status == 0" class="normalCircle"></span>
              <span v-else class="abnormalCircle"></span>
            </template>
          </div>
        </div>
      </div>
      <div id="calendar_content_wrapper" class="calendar_content_wrapper middle">
        <div class="week_wrap" v-for="(week, index) in daysArr" :key="index">
          <div class="day_wrap" v-for="(day, indexDay) in week" :key="indexDay" :class="[6, 7].includes(day.week) ? 'rest_day' : ''">
            <div @click="changeActiveDay(day)">
              <p class="day_text" :class="activeDay === day.timeStr ? 'active_day' : ''">
                {{ day.timeStr ? new Date(day.timeStr).getDate() : "" }}
              </p>
            </div>
            <template v-if="day.id">
              <span v-if="day.status == 0" class="normalCircle"></span>
              <span v-else class="abnormalCircle"></span>
            </template>
          </div>
        </div>
      </div>
      <div id="calendar_content_wrapper_next" class="calendar_content_wrapper next">
        <div class="week_wrap" v-for="(week, index) in nextDaysArr" :key="index">
          <div class="day_wrap" v-for="(day, indexDay) in week" :key="indexDay" :class="[6, 7].includes(day.week) ? 'rest_day' : ''">
            <div @click="changeActiveDay(day)">
              <p class="day_text" :class="activeDay === day.timeStr ? 'active_day' : ''">
                {{ day.timeStr ? new Date(day.timeStr).getDate() : "" }}
              </p>
            </div>
            <template v-if="day.id">
              <span v-if="day.status == 0" class="normalCircle"></span>
              <span v-else class="abnormalCircle"></span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
export default {
  data() {
    return {
      nowDay: "",
      nowWeekDay: "",
      prevDaysArr: [],
      daysArr: [],
      nextDaysArr: [],
      activeDay: "",
      activeDayInfo: {}, // 坐标
      startClientX: "",
      isReset: false
    };
  },
  mounted () {
    console.log(dayjs());
    this.assembleDayArr('daysArr',new Date())
    
    
  },
  methods: {
    // 组装查询月份的数组
    assembleDayArr(key, date) {
      let allDays = this.getMonthDay(date || this.nowDay);
      // 查询每周一的下标
      let indexArr = [];
      allDays.map((val, index) => {
        if (val.week === 1) {
          indexArr.push(index);
        }
      });
      // 如果第一天正好是 周一 则剔除indexArr[0]
      if (indexArr[0] === 0) {
        indexArr.splice(0, 1);
      }
      // 查询有几周
      let weeks = indexArr.length + 1;
      // 将 每周塞进数组
      let arr = [];
      for (let i = 0; i < weeks; i++) {
        if (i === 0) {
          arr[i] = allDays.slice(0, indexArr[0]);
        } else {
          arr[i] = allDays.slice(indexArr[i - 1], indexArr[i]);
        }
        if (arr[i].length < 7 && arr[i][0].week === 1) {
          let diff = 7 - arr[i].length;
          for (let j = 0; j < diff; j++) {
            arr[i].push({});
          }
        } else if (arr[i].length < 7 && arr[i][0].week !== 1) {
          let diff = 7 - arr[i].length;
          for (let j = 0; j < diff; j++) {
            arr[i].unshift({});
          }
        }
      }
      this[key] = arr;
    },
    // 选中日期改变事件
    changeActiveDay(day) {
      if (day.timeStr && day.timeStr !== this.activeDayInfo.timeStr) {
        this.activeDay = day.timeStr;
        this.activeDayInfo = { ...day };
        this.nowDay = day.timeStr;
        this.nowWeekDay = this.findNowWeek();
      }
    },
    // 头部时间修改
    changeMonth(flag, key) {
      let resultMonth;
      let nowChooseMonth = new Date(this.nowDay).getMonth();
      if (flag === "reduce") {
        resultMonth = new Date(this.nowDay).setMonth(nowChooseMonth - 1, 1);
      } else {
        resultMonth = new Date(this.nowDay).setMonth(nowChooseMonth + 1, 1);
        if (resultMonth > new Date().getTime()) {
          this.$toast.fail("不能选择未来月份");
          return;
        }
      }
      // 设置头部显示日期 查看是否是当前月份
      
      if (
        dayjs().format('YYYY-MM') === dayjs(resultMonth).format('YYYY-MM')
      ) {
        this.nowDay = dayjs().format('YYYY-MM-DD');
      } else {
        this.nowDay = dayjs(resultMonth).startOf('month').format('YYYY-MM-DD');
      }
      this.activeDay = this.nowDay;
      this.nowWeekDay = this.findNowWeek();
      this.assembleDayArr(key || "daysArr");
      // this.getList();
    },
    // 滑动开始
    handleStart(e) {
      this.startClientX = e.changedTouches[0].clientX;
    },
    // 滑动中
    handleMove(e) {
      e.preventDefault();
      // isReset 防止过多次 计算前后数组;
      if (
        !this.isReset &&
        Math.abs(e.changedTouches[0].clientX - this.startClientX) > 1
      ) {
        let nowChooseMonth = new Date(this.nowDay).getMonth();
        let prevMonth = new Date(this.nowDay).setMonth(nowChooseMonth - 1);
        let nextMonth = new Date(this.nowDay).setMonth(nowChooseMonth + 1);
        this.assembleDayArr(
          "prevDaysArr",
          dayjs(prevMonth).format('YYYY-MM-DD')
        );
        this.assembleDayArr(
          "nextDaysArr",
          dayjs(nextMonth).format('YYYY-MM-DD')
        );
        this.isReset = true;
      }
      let dom = document.getElementById("calendar_content");
      dom.style.marginLeft =
        e.changedTouches[0].clientX - this.startClientX + "px";
    },
    // 滑动结束
    handleEnd(e) {
      let diffX = e.changedTouches[0].clientX - this.startClientX;
      let dom = document.getElementById("calendar_content");
      if (Math.abs(diffX) === 0) {
        return;
      }
      if (Math.abs(diffX) > 100) {
        if (diffX < 0) {
          let nowChooseMonth = new Date(this.nowDay).getMonth();
          let resultMonth = new Date(this.nowDay).setMonth(nowChooseMonth + 1);
          if (resultMonth > new Date().getTime()) {
            goBack(dom, diffX);
            this.$toast.fail("不能选择未来月份");
            return;
          }
        }
        let animation = document
          .getElementById("calendar_content")
          .animate(
            [
              { marginLeft: `${diffX}px` },
              { marginLeft: diffX > 0 ? "7.5rem" : "-7.5rem" }
            ],
            {
              duration: 500,
              delay: 0
            }
          );
        animation.play();
        setTimeout(() => {
          dom.style.marginLeft = 0;
          if (diffX > 0) {
            this.changeMonth("reduce", "daysArr");
          }
          if (diffX < 0) {
            this.changeMonth("plus", "daysArr");
          }
          this.isReset = false;
        }, 501);
      } else {
        goBack(dom, diffX);
      }
      // 回到远点 手指移动距离不超过100  以及 不能选择未来月份情况
      function goBack(rDom, reference) {
        let animation = document
          .getElementById("calendar_content")
          .animate([{ marginLeft: `${reference}px` }, { marginLeft: 0 }], {
            duration: 500,
            delay: 0
          });
        animation.play();
        setTimeout(() => {
          rDom.style.marginLeft = 0;
        }, 501);
      }
    },
    // 返回文字 星期几
    findNowWeek() {
      let nowWeek = new Date(this.nowDay).getDay();
      let weekInfo = {
        0: "星期日",
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六"
      };
      return weekInfo[nowWeek];
    },
    // 获取 月份 对应的所有日期
    getMonthDay(date) {
      let now = new Date(date);
      let current_month_num = this.mGetDate(date);
      let current_month = [];
      for (let i = 1; i <= current_month_num; i++) {
        let day = now.setDate(i);
        let everyDay = dayjs(day).format('YYYY-MM-DD');
        current_month.push({
          timeStr: everyDay,
          week:
            new Date(everyDay).getDay() === 0 ? 7 : new Date(everyDay).getDay(),
          foreInfo: {},
          afterInfo: {}
        });
      }
      return current_month;
    },
    // 获取当前月的天数
    mGetDate(date) {
      var date = new Date(date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var d = new Date(year, month, 0);
      return d.getDate();
    }
  }
};
</script>

<style lang="less" scoped>
.calendar_content {
  position: relative;
  width: 22.5rem;
  // top: .6rem;
  left: -7.5rem;
  display: flex;
  .calendar_content_wrapper {
    flex: 1;
    &.prev {
      left: 0;
    }
    &.middle {
      left: 7.5rem;
    }
    &.next {
      right: 0;
    }
  }
}
.week_wrap {
  display: flex;
  .day_wrap {
    flex: 1;
    &.rest_day {
      color: #bababa;
    }
    p {
      margin: 0.1rem auto;
      &.day_text {
        width: 0.54rem;
        height: 0.54rem;
        line-height: 0.54rem;
        border-radius: 100%;
      }
      &.active_day {
        background: #3f6ad3;
        color: white;
      }
    }
  }
}
</style>
