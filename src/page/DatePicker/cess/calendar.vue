<template>
    <div class="work-home-main">
    	<calendar :checkList="checkList" @select="handleDateSelect" />
    </div>
</template>

<script>
import calendar from './calComponts.vue'
export default {
    components: { calendar },
    props: {},
    data() {
        return {
        	// 考勤时间，以及小圆点颜色数组，入不需要考勤则可不传
            checkList: [
                {
                    rq: '2025-07-09',
                    color: '#13891f'
                },
                {
                    rq: '2025-07-10',
                    color: '#13891f'
                },
                {
                    rq: '2025-07-08',
                    color: '#f59a23'
                },
                {
                    rq: '2025-07-07',
                    color: '#f59a23'
                }
            ]
        }
    },
    computed: {},
    created() { },
    mounted() {
    },
    watch: {},
    methods: {
        // 点击日历获取日期
        handleDateSelect(val) {
            // this.listParam.rq = val
            console.log(val)
        }
    }
}
</script>
<style scoped lang="less">
</style>