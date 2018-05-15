// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import iNoBounce from 'inobounce'
import App from './App'
import router from './router'
import './styles/index.less'

Vue.config.productionTip = false

Vue.use(Mint)

axios.defaults.baseURL = 'https://rsshub.app'
axios.defaults.headers.common.Accept = 'application/xml'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

if (navigator.standalone) {
  // iNoBounce.enable()
}
