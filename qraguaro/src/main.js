import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueSession from 'vue-session'
Vue.use(VueSession)
Vue.prototype.$eventBus = new Vue()
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
