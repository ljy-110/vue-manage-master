import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index.vue'
// import nav1 from '../components/content/nav1.vue'
import nav2 from '../components/content/nav2.vue'
import nav3 from '../components/content/nav3.vue'
import nav4 from '../components/content/nav4.vue'
import nav5 from '../components/content/nav5.vue'
import nav6 from '../components/content/nav6.vue'
import top1 from '../components/content/top1.vue'
import top2 from '../components/content/top2.vue'
import DatePickerWeek from '@/page/DatePicker/DatePickerWeek'
import gradientColor from '@/page/color/gradientColor'
import linearGradientBG from '@/page/color/linearGradientBG'
import table from '@/page/table/table';
import flexCss from '@/page/css/flex';
import map3D from '@/page/echarts/3d/map3D'
import worlkMap3d from '@/page/echarts/3d/wolkMapQiu'
import baiduMapEcharts from '@/page/echarts/3d/baiduMapEcharts.vue'
import weixinMap from '@/page/echarts/3d/weixinMap';
import echartsMap from '@/page/echarts/china/echartsMap'
import threeGITF from '@/page/three3D/threeGITF'
import jxyIframe from '@/page/iframe/jxyIframe';
import mergeTable from '@/page/table/mergeTable'
import oWebControl from '@/page/video/oWebControl'
import h5player from '@/page/video/h5player'
import ezuikitVideo from '@/page/video/ezuikitVideo'
import model from '@/page/cesium/model'
import viewFiles from '@/page/viewFiles/viewFiles.vue'
import Login from '@/page/login/login.vue'
import leaflet from '@/page/leaflet/leaflet.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Login,
      hidden: true,
      meta: {
          requireAuth: false
      }
    },
    {
      path: '/nav6',
      name: 'nav6',
      component: nav6
    },
    {
      path: '/index',
      name: '首页',
      component: index,
      children:[
        {
          path: '/DatePickerWeek',
          name: 'DatePickerWeek',
          component: DatePickerWeek
        },
        {
          path: '/gradientColor',
          name: 'gradientColor',
          component: gradientColor
        },
        {
          path: '/linearGradientBG',
          name: 'linearGradientBG',
          component: linearGradientBG
        },
        {
          path: '/table',
          name: 'table',
          component: table
        },
        {
          path: '/mergeTable',
          name: 'mergeTable',
          component: mergeTable
        },
        {
          path: '/flexCss',
          name: 'flexCss',
          component: flexCss
        },
        {
          path: '/jxyIframe',
          name: 'jxyIframe',
          component: jxyIframe
        },
        {
          path: '/nav5',
          name: 'nav5',
          component: nav5
        },
        {
          path: '/top1',
          name: 'top1',
          component: top1
        },
        {
          path: '/top2',
          name: 'top2',
          component: top2
        },
        {
          path: '/echarts/Map3d',
          name: 'echartsMap3d',
          component: map3D
        },
        {
          path: '/echarts/worlkMap3d',
          name: 'worlkMap3d',
          component: worlkMap3d
        },
        {
          path: '/echarts/baiduMapEcharts',
          name: 'baiduMapEcharts',
          component: baiduMapEcharts
        },
        {
          path: '/echarts/weixinMap',
          name: 'weixinMap',
          component: weixinMap
        },
        {
          path: '/echarts/echartsMap',
          name: 'echartsMap',
          component: echartsMap
        },
        {
          path: '/threeGITF',
          name: 'threeGITF',
          component: threeGITF
        },
        {
          path: '/oWebControl',
          name: 'oWebControl',
          component: oWebControl
        },
        {
          path: '/h5player',
          name: 'h5player',
          component: h5player
        },
        {
          path: '/ezuikitVideo',
          name: 'ezuikitVideo',
          component: ezuikitVideo
        },
        {
          path: '/model',
          name: 'model',
          component: model
        },
        {
          path: '/viewFiles',
          name: '附件预览',
          component: viewFiles
        },
        {
          path: '/leaflet',
          name: 'leaflet',
          component: leaflet
        },
      ]
    },
  ]
})
