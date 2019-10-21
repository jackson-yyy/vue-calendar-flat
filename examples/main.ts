import Vue from 'vue'
import App from './App.vue'

import VConsole from 'vconsole'
import Calendar from 'vue-calendar-flat'
const vConsole = new VConsole()
// Vue.use(Calendar)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
