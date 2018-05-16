import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Hello from '@/pages/Hello'

// bilibili
import Bilibili from '@/pages/Bilibili'
import Bangumi from '@/pages/Bilibili/Bangumi'
import UserVideo from '@/pages/Bilibili/UserVideo'
import UserActivity from '@/pages/Bilibili/UserActivity'

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
    },
    {
      path: '/bilibili/user-video/:uid?',
      component: UserVideo,
      meta: {
        title: 'UP主投稿'
      }
    },
    {
      path: '/bilibili/user-activity/:uid?',
      component: UserActivity,
      meta: {
        title: 'UP主动态'
      }
    }
  ]
})
