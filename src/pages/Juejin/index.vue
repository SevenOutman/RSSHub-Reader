<template>
  <feed-index-page
    class="juejin"
    :endpoints="endpoints"
  />
</template>

<script>
  import FeedIndexPage from '@/components/FeedIndexPage'

  export default {
    name: 'Juejin',
    components: { FeedIndexPage },
    data() {
      return {
        endpoints: [
          { title: '分类', link: '/juejin/category' },
        ]
      }
    }
  }
</script>
