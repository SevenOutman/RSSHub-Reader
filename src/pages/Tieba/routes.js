import Index from './index'
import Forum from './Forum'
import ForumGood from './ForumGood'

export default [
  {
    path: '/tieba',
    component: Index,
    meta: {
      title: '贴吧'
    }
  },
  {
    path: '/tieba/forum/:kw?',
    component: Forum,
    meta: {
      title: '帖子列表'
    }
  },
  {
    path: '/tieba/forum-good/:kw?/:cid?',
    component: ForumGood,
    meta: {
      title: '精品帖子'
    }
  },
]
