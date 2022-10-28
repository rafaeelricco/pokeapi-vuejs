import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import './assets/scss/base.scss'
import 'vuesax/dist/vuesax.css'
import './assets/scss/globals.scss'

Vue.config.productionTip = false
Vue.use(Vuesax, {})

new Vue({
  render: (h) => h(App)
}).$mount('#app')
