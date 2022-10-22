import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import './assets/scss/base.scss'
import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false
Vue.use(Vuesax, {})

new Vue({
  render: (h) => h(App)
}).$mount('#app')
