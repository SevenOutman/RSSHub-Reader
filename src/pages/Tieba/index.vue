<template>
  <feed-index-page
    class="tieba"
    :endpoints="endpoints"
  />
</template>

<script>
  import CellGroup from '@/components/weui/cell-group';
  import Cell from '@/components/weui/cell';
  import FeedIndexPage from '@/components/FeedIndexPage'

  export default {
    name: 'Tieba',
    components: { Cell, CellGroup, FeedIndexPage },
    data() {
      return {
        endpoints: [
          { title: '帖子列表', link: '/tieba/forum' },
          { title: '精品帖子', link: '/tieba/forum-good' }
        ]
      }
    }
  }
</script>
