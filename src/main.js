import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import Component from './components'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
