import Index from './index'
import Category from './Category'

export default [
  {
    path: '/juejin',
    component: Index,
    meta: {
      title: '掘金'
    }
  },
  {
    path: '/juejin/category/:category?',
    component: Category,
    meta: {
      title: '分类'
    }
  },
]
