<template>
  <feed-index-page
    class="jike"
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
          { title: '主题-精选', link: '/jike/topic' },
          { title: '主题-广场', link: '/jike/topic-square' },
          { title: '用户动态', link: '/jike/user' }
        ]
      }
    }
  }
</script>
