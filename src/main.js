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
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

Vue.use(Vuex)
const options = { name: 'lodash' }
Vue.use(VueLodash, options)
Vue.use(VueSession) 

Vue.config.productionTip = false
//vuex
Vue.prototype.$store =  store 
//axios
Vue.prototype.$http = axios

//helpers
Vue.prototype.$timeAgo = new TimeAgo('en-US')
Vue.prototype.$humanizeDate = function(date_time){return this.$timeAgo.format(new Date(date_time), 'twitter')},
Vue.prototype.$fileDownload = require('js-file-download');

//DOMAINS
Vue.prototype.$DOMAIN = { value :'http://my-domain.com:8000'}
Vue.prototype.$BASE_URL = { value :localStorage.getItem('base_url_value'),toString:function(){return this.value}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
