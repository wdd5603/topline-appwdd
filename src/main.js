import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import veeValidate from 'vee-validate'
import 'vant/lib/index.css'
import '@/style/index.less'

Vue.use(Vant)
Vue.use(veeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
