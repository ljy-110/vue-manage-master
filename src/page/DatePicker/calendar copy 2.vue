<template>
	<div class="calendar">
		<!-- 顶部星期标题 -->
		<div class="week-header">
			<span v-for="(day, index) in weekDays" :key="index">{{ day }}</span>
		</div>

		<!-- 日期网格 -->
		<div class="date-grid">
			<div v-for="(day, index) in calendarDays" :key="index" class="date-cell" :class="{
					'selected-first-day': day.isFirstDayOfMonth && day.isCurrentMonth,
					'selected-today': day.isToday && day.isCurrentMonth,
					'selected-date': selectedDate && day.date === selectedDate && day.isCurrentMonth,
				}" @click="handleDateClick(day)">
				<!-- 日期数字 -->
				<span :style="{ color: getDateColor(day) }">{{ day.date || '' }}</span>

				<!-- 小圆点 -->
				<div class="dots" v-if="day.isCurrentMonth">
					<span v-for="n in getDotCount(day.forenoon, day.afternoon)" :key="n" class="dot"
						:style="{ backgroundColor: getDotColor(day.forenoon, day.afternoon, n) }"></span>
				</div>
			</div>
		</div>

		<!-- 切换月份按钮 -->
		<div class="month-switch">
			<button @click="prevMonth">上一月</button>
			<span>{{ currentYear }}年{{ currentMonth }}月</span>
			<button @click="nextMonth">下一月</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				weekDays: ["一", "二", "三", "四", "五", "六", "日"],
				currentYear: new Date().getFullYear(),
				currentMonth: new Date().getMonth() + 1,
				currentDate: new Date().getDate(),
				currentMonthDays: [],
				prevMonthDays: [],
				nextMonthDays: [],
				selectedDate: null, // 默认选中的日期
			};
		},
		computed: {
			calendarDays() {
				return [...this.prevMonthDays, ...this.currentMonthDays, ...this.nextMonthDays];
			},
		},
		methods: {
			initCalendarData() {
				const firstDayOfMonth = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
				const lastDateOfMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
				const lastDateOfPrevMonth = new Date(this.currentYear, this.currentMonth - 1, 0).getDate();
				// 计算上个月剩余天数（补齐到当前月的第一天之前的空白）
				this.prevMonthDays = Array.from({
					// 如果 firstDayOfMonth 是 0（星期日），需要填充 6 天（从上个月最后一天往前数 6 天）
					// 否则填充 firstDayOfMonth - 1 天
					length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
				}, (_, i) => {
					const date = lastDateOfPrevMonth - i;
					return {
						date,
						isCurrentMonth: false,
					};
				}).reverse();
				// 当前月天数
				this.currentMonthDays = Array.from({
						length: lastDateOfMonth
					},
					(_, i) => {
						const date = i + 1;
						return {
							date,
							isCurrentMonth: true,
							isFirstDayOfMonth: i + 1 === 1,
							isToday: i + 1 === this.currentDate &&
								this.currentMonth === new Date().getMonth() + 1 &&
								this.currentYear === new Date().getFullYear(),
							forenoon: Math.floor(Math.random() * 4) || 1,
							afternoon: Math.floor(Math.random() * 4) || 1,
						};
					}
				);

				// 计算下个月前几天（补齐到当前月的最后一天之后的空白）
				const lastDayOfMonth = new Date(this.currentYear, this.currentMonth - 1, lastDateOfMonth).getDay();
				const nextMonthDaysCount = 7 - lastDayOfMonth; // 下个月需要填充的天数
				this.nextMonthDays = Array.from({
						length: nextMonthDaysCount === 7 ? 0 : nextMonthDaysCount
					}, // 如果是整周则不需要填充
					(_, i) => {
						const date = i + 1; // 下个月从 1 开始
						return {
							date,
							isCurrentMonth: false,
						};
					}
				);
				if (!this.selectedDate) {
					this.handleDateClick(this.currentMonthDays[0]);
				}
			},
			getDotCount(forenoon, afternoon) {
				if (forenoon === 1 && afternoon === 1) return 1;
				if (forenoon === 2 && afternoon === 1) return 2;
				if (forenoon === 3 && afternoon === 1) return 2;
				return 0;
			},
			getDotColor(forenoon, afternoon, index) {
				const rules = [{
						forenoon: 1,
						afternoon: 1,
						colors: ["#B5C7FF"]
					},
					{
						forenoon: 2,
						afternoon: 1,
						colors: ["#FFB9B0", "#B5C7FF"]
					},
					{
						forenoon: 3,
						afternoon: 1,
						colors: ["#E37318", "#B5C7FF"]
					},
				];

				for (const rule of rules) {
					if (rule.forenoon === forenoon && rule.afternoon === afternoon) {
						return rule.colors[index - 1] || "gray";
					}
				}
				return "gray";
			},
			getDateColor(day) {
				if (!day.isCurrentMonth) return "#CCCCCC";
				if (day.isToday) return "#0052D9";
				if (this.selectedDate === day.date) return "#FFFFFF";
				return "#000000";
			},
			prevMonth() {
				this.currentMonth = this.currentMonth === 1 ? 12 : this.currentMonth - 1;
				this.currentYear = this.currentMonth === 12 ? this.currentYear - 1 : this.currentYear;
				this.initCalendarData();
			},
			nextMonth() {
				this.currentMonth = this.currentMonth === 12 ? 1 : this.currentMonth + 1;
				this.currentYear = this.currentMonth === 1 ? this.currentYear + 1 : this.currentYear;
				this.initCalendarData();
			},
			handleDateClick(day) {
				if (!day.isCurrentMonth) return;
				this.selectedDate = day.date;
			},
		},
		mounted() {
			this.initCalendarData();
		},
	};
</script>

<style>
	.calendar {
		display: flex;
		flex-direction: column;
	}

	.week-header {
		display: flex;
		justify-content: space-around;
	}

	.date-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	.date-cell {
		text-align: center;
		padding: 4rpx 20rpx;
		cursor: pointer;
		margin-top: 26rpx;
	}

	.date-cell span {
		display: flex;
		border-radius: 20rpx;
		padding: 0px 4rpx;
		justify-content: center;
		align-items: center;
		gap: 10px;
		align-self: stretch;
		font-size: 28rpx;
		font-family: "PingFang SC";
		font-style: normal;
		font-weight: 400;
	}

	.date-cell.selected-today span {
		background-color: #F2F3FF;
	}
        
       .date-cell.selected-date span {
		background-color: #0052D9;
		color: #FFFFFF !important;
	}
	.dots {
		margin-top: 5px;
		display: flex;
		gap: 5px;
		justify-content: center;
	}

	.dot {
		width: 12rpx;
		height: 12rpx;
		flex-shrink: 0;
		padding: 0 !important;
		border-radius: 50%;
	}

	.month-switch {
		text-align: center;
		margin: 10px 0;
	}
</style>