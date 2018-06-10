// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import moment from 'moment'
import iNoBounce from 'inobounce'
import App from './App'
import router from './router'
import './styles/index.less'
import store from './store'

Vue.config.productionTip = false

Vue.use(Mint)

axios.defaults.baseURL = 'https://rsshub.app'
axios.defaults.headers.common.Accept = 'application/xml'

const now = moment()
Vue.filter('time', (isoTime) => {
  let time = moment(isoTime)
  if (time.isSame(now, 'day')) {
    return time.format('HH:mm')
  }
  if (time.isSame(now, 'year')) {
    return time.format('MM-DD')
  }
  return time.format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

if (navigator.standalone) {
  // iNoBounce.enable()
}
