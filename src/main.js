// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/all.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import api from './api/install'
import axios from 'axios'
import common from '../static/css/common.css'
Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(api)
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
