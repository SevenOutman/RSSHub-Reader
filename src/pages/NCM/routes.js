import Index from './index'
import Playlist from './Playlist'
import UserPlaylist from './UserPlaylist'
import Artist from './Artist'

export default [
  {
    path: '/ncm',
    component: Index,
    meta: {
      title: '网易云音乐'
    }
  },
  {
    path: '/ncm/playlist/:id?',
    component: Playlist,
    meta: {
      title: '歌单歌曲'
    }
  },
  {
    path: '/ncm/user-playlist/:uid?',
    component: UserPlaylist,
    meta: {
      title: '用户歌单'
    }
  },
  {
    path: '/ncm/artist/:id?',
    component: Artist,
    meta: {
      title: '歌手专辑'
    }
  },
]
