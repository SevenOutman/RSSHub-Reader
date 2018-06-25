import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Hello from '@/pages/Hello'

// bilibili
import Bilibili from '@/pages/Bilibili'
import BilibiliBangumi from '@/pages/Bilibili/Bangumi'
import UserVideo from '@/pages/Bilibili/UserVideo'
import UserActivity from '@/pages/Bilibili/UserActivity'
import UserFav from '@/pages/Bilibili/UserFav'
import UserCoin from '@/pages/Bilibili/UserCoin'
import UserFollowers from '@/pages/Bilibili/UserFollowers'
import UserFollowings from '@/pages/Bilibili/UserFollowings'
import Partion from '@/pages/Bilibili/Partion'
import VideoComments from '@/pages/Bilibili/VideoComments'
import LiveRoom from '@/pages/Bilibili/LiveRoom'

// bangumi
import Bangumi from '@/pages/Bangumi'
import BangumiCalendarToday from '@/pages/Bangumi/CalendarToday'

// weibo
import Weibo from '@/pages/Weibo'
import WeiboUser from '@/pages/Weibo/User'
import WeiboKeyword from '@/pages/Weibo/Keyword'

import Tieba from '@/pages/Tieba/routes'
import Jike from '@/pages/Jike/routes'
import NCM from '@/pages/NCM/routes'
import Juejin from '@/pages/Juejin/routes'

Vue.use(Router)

const router = new Router({
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
      component: BilibiliBangumi,
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
    },
    {
      path: '/bilibili/user-fav/:uid?',
      component: UserFav,
      meta: {
        title: 'UP主收藏夹'
      }
    },
    {
      path: '/bilibili/user-coin/:uid?',
      component: UserCoin,
      meta: {
        title: 'UP主投币视频'
      }
    },
    {
      path: '/bilibili/user-followers/:uid?',
      component: UserFollowers,
      meta: {
        title: 'UP主粉丝'
      }
    },
    {
      path: '/bilibili/user-followings/:uid?',
      component: UserFollowings,
      meta: {
        title: 'UP主关注用户'
      }
    },
    {
      path: '/bilibili/partion/:tid?',
      component: Partion,
      meta: {
        title: '分区视频'
      }
    },
    {
      path: '/bilibili/video-comments/:aid?',
      component: VideoComments,
      meta: {
        title: '视频评论'
      }
    },
    {
      path: '/bilibili/live-room/:roomID?',
      component: LiveRoom,
      meta: {
        title: '直播开播'
      }
    },

    {
      path: '/bangumi',
      component: Bangumi,
      meta: {
        title: 'Bangumi'
      }
    },
    {
      path: '/bangumi/calendar-today',
      component: BangumiCalendarToday,
      meta: {
        title: '放送列表'
      }
    },
    {
      path: '/weibo',
      component: Weibo,
      meta: {
        title: '微博'
      }
    },
    {
      path: '/weibo/user/:uid?',
      component: WeiboUser,
      meta: {
        title: '博主'
      }
    },
    {
      path: '/weibo/keyword/:keyword?',
      component: WeiboKeyword,
      meta: {
        title: '关键词'
      }
    },
    ...Tieba,
    ...Jike,
    ...NCM,
    ...Juejin
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'RSSHub Reader'
  }
  next()
})

export default router
