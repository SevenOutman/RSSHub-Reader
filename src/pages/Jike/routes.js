import Index from './index'
import Topic from './Topic'
import TopicSquare from './TopicSquare'
import User from './User'

export default [
  {
    path: '/jike',
    component: Index,
    meta: {
      title: '即刻'
    }
  },
  {
    path: '/jike/topic/:id?',
    component: Topic,
    meta: {
      title: '主题-精选'
    }
  },
  {
    path: '/jike/topic-square/:id?',
    component: TopicSquare,
    meta: {
      title: '主题-广场'
    }
  },
  {
    path: '/jike/user/:id?',
    component: User,
    meta: {
      title: '用户动态'
    }
  },
]
