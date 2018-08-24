import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Router from './routes/index'
import Store from './store/index'

Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  render: h => h(App),
  router: Router,
  store: Store
}).$mount('#app')
