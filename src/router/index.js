import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Hello from '@/pages/Hello'
import Bilibili from '@/pages/Bilibili'
import Bangumi from '@/pages/Bilibili/Bangumi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/bilibili',
      component: Bilibili,
      meta: {
        title: 'Bilibili'
      },
    },
    {
      path: '/bilibili/bangumi/:seasonid?',
      component: Bangumi,
      meta: {
        title: '番剧'
      }
    }
  ]
})
