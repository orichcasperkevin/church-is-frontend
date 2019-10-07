// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import VueLodash from 'vue-lodash'
import VueSession from 'vue-session'
import Vuex from 'vuex'
import { store } from './store'

Vue.use(Vuex)

const options = { name: 'lodash' }
Vue.use(VueLodash, options)

Vue.use(VueSession) 

Vue.config.productionTip = false
Vue.prototype.$store =  store 
Vue.prototype.$http = axios
Vue.prototype.$BASE_URL = process.env.BASE_URL || 'http://app.church.nanocomputing.co.ke'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
