// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./utils/http"
import store from "./store"
import "./utils/vant"

Vue.config.productionTip = false
//配置基础图片域名
Vue.prototype.$imgBaseUrl="http://localhost:3000"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
