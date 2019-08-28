import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import VueLogger from 'vuejs-logger'
import { store } from './_store'
import { router } from './_helpers'
import App from './app/App'

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.use(VeeValidate)

const options = {
  isEnabled: true,
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueLogger, options)

new Vue({
  render: h => h(App),
  el: '#app',
  router,
  store,
}).$mount('#app')
