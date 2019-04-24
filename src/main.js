// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/common.css'
import './assets/css/animation.css'
import  './assets/image/student.jpg'
Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css' //ElementUI
import ElementUI from 'element-ui'
Vue.use(ElementUI);
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
