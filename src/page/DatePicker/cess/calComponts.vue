<template>
    <div class="calendar-container">
        <!-- 头部导航 -->
        <div class="calendar-header">
            <button @click="prevMonth" class="calendar-nav-btn">上月</button>
            <!-- <van-icon name="arrow-left" @click="prevMonth" class="calendar-nav-btn" /> -->
            <h3>{{ currentYear }}年{{ currentMonth }}月</h3>
            <!-- <van-icon name="arrow" @click="nextMonth" class="calendar-nav-btn" /> -->
            <button @click="nextMonth" class="calendar-nav-btn">下月</button>
        </div>

        <!-- 星期标题 -->
        <div class="calendar-weekdays">
            <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
        </div>

        <!-- 日历收起部分 -->
        <div class="calendar-days" v-if="!isExpand">
            <!-- 当月日期 -->
            <span v-for="day in weekDates" :key="day.id" class="calendar-day" :class="{
                'today': day.isToday || (selectStartEndTime.dateRange).includes(day.date),
                'selected': isSelectedZD(day),
                'disabled': isDisabled(day.date)
            }" @click="!isDisabled(day.date) && selectDate(day.date)">
                {{ formatDatess(day.date) }}
                <span v-if="isTrueEheck(day.date)" :style="{ backgroundColor: bgcColor(day.date) }"
                    class="cirel"></span>
            </span>
        </div>
        <!-- 收齐按钮 -->
        <div class="open-btn" v-if="!isExpand" @click="
            () => {
                isExpand = true
            }
        ">
        展开
            <!-- <van-icon name="arrow-down" /> -->
        </div>

        <!-- 日期网格展开部分 -->
        <div class="calendar-days" v-if="isExpand">
            <!-- 上个月的日期（灰色显示） -->
            <span v-for="prevDay in prevMonthDays" :key="prevDay.id" class="calendar-day prev-month-day">
                {{ prevDay.day }}
            </span>

            <!-- 当月日期 -->
            <span v-for="day in currentMonthDays" :key="day.id" class="calendar-day" :class="{
                'today': day.isToday || (selectStartEndTime.dateRange).includes(day.date),
                'selected': isSelected(day.date),
                'disabled': isDisabled(day.date),
                'lastSelect': isLastSelect(day.date),
                'firstSelect': isFirstSelect(day.date)
            }"  @click="toggleDate(day.date)">
            <!-- @click="!isDisabled(day.date) && selectDate(day.date)" -->
                {{ day.day }}
                <span v-if="isTrueEheck(day.date)" :style="{ backgroundColor: bgcColor(day.date) }"
                    class="cirel"></span>
            </span>

            <!-- 下个月的日期（灰色显示） -->
            <span v-for="nextDay in nextMonthDays" :key="nextDay.id" class="calendar-day next-month-day">
                {{ nextDay.day }}
            </span>
        </div>
        <!-- 收齐按钮 -->
        <div class="open-btn" v-if="isExpand" @click="
            () => {
                isExpand = false
            }
        ">
        收起
            <!-- <van-icon name="arrow-up" /> -->
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    name: 'Calendar',
    props: {
        // 默认选中日期，格式：YYYY-MM-DD
        defaultValue: {
            type: String,
            default: ''
        },
        // 最小可选日期，格式：YYYY-MM-DD
        minDate: {
            type: String,
            default: ''
        },
        // 最大可选日期，格式：YYYY-MM-DD
        maxDate: {
            type: String,
            default: ''
        },
        // 禁用的日期数组，格式：['YYYY-MM-DD', 'YYYY-MM-DD']
        disabledDates: {
            type: Array,
            default: () => []
        },
        // 禁用的日期数组，格式：['YYYY-MM-DD', 'YYYY-MM-DD']
        checkList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            currentDate: new Date(),
            weekdays: ['周一', '周二', '周三', '周四', '周五', '周六',"周日"],
            selectedDate: null,
            isExpand: true,
            todatL: new Date(),
            jintian: new Date(),
            currentWeekBase:new Date(),
            selectStartEndTime:{
                startDate:'',endDate:'',dateRange:[]
            }
        }
    },
    computed: {
        currentYear() {
            return this.currentDate.getFullYear()
        },
        currentMonth() {
            return this.currentDate.getMonth() + 1
        },
        // 当月第一天是星期几（0-6）
        firstDayOfMonth() {
            const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1)
            // 将星期值转换成 周一0 周二1 。。。周日6
            return (firstDay.getDay()+6) % 7;
        },
        // 当月的总天数
        daysInMonth() {
            return new Date(this.currentYear, this.currentMonth, 0).getDate()
        },
        // 上个月的总天数
        daysInPrevMonth() {
            return new Date(this.currentYear, this.currentMonth - 1, 0).getDate()
        },
        // 当月日期数据
        currentMonthDays() {
            const days = []
            const today = new Date()
            const isCurrentMonth =
                today.getFullYear() === this.currentYear &&
                today.getMonth() === this.currentMonth - 1

            for (let i = 1; i <= this.daysInMonth; i++) {
                const date = new Date(this.currentYear, this.currentMonth - 1, i)
                const dateStr = this.formatDate(date)

                days.push({
                    id: `current-${i}`,
                    day: i,
                    date: dateStr,
                    isToday: isCurrentMonth && today.getDate() === i
                })
            }
            return days
        },
        // 上个月需要显示的日期数据
        prevMonthDays() {
            const days = []
            // 上个月需要显示的天数（根据当月第一天是星期几来确定）
            const displayCount = this.firstDayOfMonth

            for (let i = displayCount; i > 0; i--) {
                const day = this.daysInPrevMonth - i + 1
                const date = new Date(this.currentYear, this.currentMonth - 2, day)
                const dateStr = this.formatDate(date)

                days.push({
                    id: `prev-${day}`,
                    day,
                    date: dateStr
                })
            }

            return days
        },
        // 下个月需要显示的日期数据
        nextMonthDays() {
            const days = []
            // 当月最后一天是星期几
            const lastDayOfMonth = new Date(this.currentYear, this.currentMonth - 1, this.daysInMonth).getDay()
            // 下个月需要显示的天数（凑够42个格子，6行7列）
            const displayCount = 35 - (this.prevMonthDays.length + this.currentMonthDays.length)

            for (let i = 1; i <= displayCount; i++) {
                const date = new Date(this.currentYear, this.currentMonth, i)
                const dateStr = this.formatDate(date)

                days.push({
                    id: `next-${i}`,
                    day: i,
                    date: dateStr
                })
            }

            return days
        },
        weekDates() {
            if (!this.todatL) return [];
            // 转换为 Date 对象
            const baseDate = new Date(this.todatL);
            console.log(baseDate);
            
            // 获取选中日期的星期（周日=0，周一=1，...，周六=6）
            const dayOfWeek = (baseDate.getDay() + 6) % 7; //转换索引周一0开始

            const dates = [];

            // 计算从周日到周六的偏移量：周日为 -dayOfWeek，依次递增到周六为 6 - dayOfWeek
            //周一（偏移0）到周日（偏移+6）
            for (let i = 0; i < 7; i++) {
                const newDate = new Date(baseDate);
                newDate.setDate(baseDate.getDate() - dayOfWeek + i); // 计算偏移后的日期
                dates.push({
                  id:`week-${i}`,date:this.formatDate(newDate),
                  isToday:this.isToday(newDate),
                  getDate:()=> newDate
                });
            }
            console.log(dates);
            
            return dates;
        },
        mergedRangeDate(){
            return {
                sDate:this.selectStartEndTime.startDate,
                eDate:this.selectStartEndTime.endDate
            }
        }
    },
    watch:{
        mergedRangeDate:{
            handler(newVal,oldVal){
                if (newVal.sDate && newVal.eDate) {
                    console.log(newVal);
                }
                
            },
            deep:true
        },
        
    },
    mounted() {
        // 如果有默认值，设置选中日期
        if (this.defaultValue) {
            this.selectedDate = this.defaultValue
        }
        this.currentWeekBase = new Date();
    },
    methods: {
        // 格式化日期为 YYYY-MM-DD
        formatDate(date) {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        },
        // 切换到上个月
        prevMonth() {
            this.currentDate = new Date(this.currentYear, this.currentMonth - 2, 1)
        },
        // 切换到下个月
        nextMonth() {
            this.currentDate = new Date(this.currentYear, this.currentMonth, 1)
        },
        // 判断日期是否被选中
        isSelected(date) {
            return this.selectedDate === date
        },
        isLastSelect(date){
            return this.selectStartEndTime.dateRange.length > 0?this.selectStartEndTime.dateRange[this.selectStartEndTime.dateRange.length - 1] == date:false
        },
        isFirstSelect(date){
            return this.selectStartEndTime.dateRange.length > 0?this.selectStartEndTime.dateRange[0] == date:false
        },
        // isTodaySelected(day) {
        //   const date = new Date(day);
        //   return this.isToday(date)
        // },
        isToday(date){
          const today = new Date();
          return date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate()
        },
        // 判断是否存在考勤
        isTrueEheck(date) {
            let isTru = false
            this.checkList.forEach(item => {
                if (date == item.rq) {
                    isTru = true
                }
            })
            return isTru
        },
        // 判断显示颜色
        bgcColor(date) {
            let color = ''
            this.checkList.forEach(item => {
                if (date == item.rq) {
                    color = item.color
                }
            })
            return color
        },
        // 判断日期是否被禁用
        isDisabled(date) {
            // 检查是否在最小日期之前
            if (this.minDate && date < this.minDate) {
                return true
            }

            // 检查是否在最大日期之后
            if (this.maxDate && date > this.maxDate) {
                return true
            }

            // 检查是否在禁用日期列表中
            if (this.disabledDates.includes(date)) {
                return true
            }

            return false
        },
        // 选择日期
        selectDate(date) {
            // this.todatL = date
            // this.jintian = date
            this.selectedDate = date
            this.$emit('select', date)
        },
        // 折叠数据处理
        formatDatess(date) {
            // const day = String(date.getDate()).padStart(2, '0'); // 日期补零
            // return day;
            return dayjs(date).format('D');
        },
        // 判断折叠是否选中
        isSelectedZD(date) {
          if (!this.selectedDate) return false
            // console.log(this.jintian, '111111111')
            const date2 = new Date(this.selectedDate)
            const date1 = new Date(date)
            return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()
        },
        // 旧的
        // isSelectedZD(date) {
        //     console.log(this.jintian, '111111111')
        //     const date2 = new Date(this.jintian)
        //     const date1 = new Date(date)
        //     return date2.getDate() == date1.getDate();
        // }
        toggleDate(date){
            console.log(date)
            this.selectedDate = date
            let sDate = this.selectStartEndTime.startDate,eDate=this.selectStartEndTime.endDate
            if(!sDate && !eDate){ //都是空的
                sDate = date;
            }else if(sDate && !eDate){ //有开始时间  无结束时间
                // eDate = date;
                const isBefore = dayjs(date).isBefore(dayjs(sDate)) // 选择时间是否在开始时间之前
                const isAfter = dayjs(date).isAfter(dayjs(sDate)) // 选择时间是否在开始时间之后
                if (isBefore) {
                    eDate = this.selectStartEndTime.startDate;
                    sDate = date;
                }else if(isAfter){
                    eDate = date;
                }else{
                    eDate = date;
                }
            }else if(sDate && eDate){ //有开始时间和结束时间
                sDate = date;
                eDate = '';
                this.selectStartEndTime.dateRange = []
            }
            this.selectStartEndTime.startDate = sDate;
            this.selectStartEndTime.endDate = eDate;
            if(sDate && eDate){
                const list = this.getDateRange(sDate,eDate)
                this.selectStartEndTime.dateRange = list
                console.log(list)
            }
            
            
            console.log(sDate,eDate)
        },
        // 获取两个日期直接的全部日期
        getDateRange(start,end){
            if(!start || !end){
                return []
            }
            const dates = [];
            let current = dayjs(start)
            let endDate = dayjs(end);
            // if(current.isAfter(endDate)){

            // }
            while(current.isBefore(endDate) || current.isSame(endDate,'day')){
                dates.push(current.format('YYYY-MM-DD'))
                current = current.add(1,'day')
            }
            return dates
        }
    }
}
</script>

<style scoped lang="less">
.calendar-container {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 0 auto;
    padding: 0 15px;
    border: 1px solid #e0e0e0;
    /* border-radius: 8px; */
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.calendar-header {
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-bottom: 15px; */
}

.calendar-nav-btn {
    /* background-color: #f0f0f0; */
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

/* .calendar-nav-btn:hover {
    background-color: #e0e0e0;
} */

.calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 10px;
}

.weekday {
    text-align: center;
    font-weight: bold;
    color: #666;
    padding: 5px;
}

.calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    //gap: 5px;
}

.calendar-day {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    //border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 5px;
}
.calendar-day:nth-child(7n){
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
}
.today.calendar-day:nth-child(7n + 1){
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
}

.today.calendar-day:hover:not(.disabled) {
    background-color: #f0f0f0;
}
.firstSelect{
    // border-top-left-radius: 50%;
    // border-bottom-left-radius: 50%;
    background-color: transparent !important;
    color: white;
    position: relative;
    z-index: 1;
}
.firstSelect::before{
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    background-color: #e7f3ff;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    z-index: -2;
}
.firstSelect::after{
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    background-color: #2196f3;
    border-radius: 50%;
    z-index: -1;
}
.lastSelect{
    // border-top-right-radius: 50%;
    // border-bottom-right-radius: 50%;
    background-color: transparent!important;
    color: white;
    position: relative;
    z-index: 1;
}
.lastSelect::before{
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    background-color: #e7f3ff;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    z-index: -2;
}
.lastSelect::after{
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    background-color: #2196f3;
    border-radius: 50%;
    z-index: -1;
}
// .calendar-days .today:first-child{
//     border-top-left-radius: 100%;
//     border-bottom-left-radius: 100%;
// }
// .calendar-days .today:last-child{
//     border-top-right-radius: 100%;
//     border-bottom-right-radius: 100%;
// }

.prev-month-day,
.next-month-day {
    color: #ccc;
    cursor: default;
}

.today {
    background-color: #e7f3ff;
    font-weight: bold;
}

.selected {
    background-color: #2196f3 !important;
    border-radius: 50%;
    color: white;
}

.disabled {
    color: #ddd;
    cursor: not-allowed;
    background-color: #f9f9f9;
}

.cirel {
    position: absolute;
    left: 50%;
    bottom: 4px;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: red;
}

.open-btn {
    width: 100%;
    text-align: center;
}
</style>