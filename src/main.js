import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import veeValidate from 'vee-validate'
import 'vant/lib/index.css'
import '@/style/index.less'
import { relaTime } from '@/utils/dayjs'
import LoginCheck from '@/utils/LoginOrNot'

Vue.filter('relaTime', relaTime)
// options 为可选参数，无则不传
Vue.use(Lazyload)
Vue.use(LoginCheck)

Vue.use(Vant)
Vue.use(veeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
