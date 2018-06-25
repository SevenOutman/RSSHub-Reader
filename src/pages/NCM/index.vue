<template>
  <feed-index-page
    class="ncm"
    :endpoints="endpoints"
  />
</template>

<script>
  import FeedIndexPage from '@/components/FeedIndexPage'

  export default {
    name: 'Jike',
    components: { FeedIndexPage },
    data() {
      return {
        endpoints: [
          { title: '歌单歌曲', link: '/ncm/playlist' },
          { title: '用户歌单', link: '/ncm/user-playlist' },
          { title: '歌手专辑', link: '/ncm/artist' }
        ]
      }
    }
  }
</script>
