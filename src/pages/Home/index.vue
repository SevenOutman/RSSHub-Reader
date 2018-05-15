<template>
  <div class="home">
    <cell-group title="收藏">
      <mt-cell v-for="favorite of favorites" :key="favorite.rss" :title="favorite.title" is-link :to="favorite.path" />
    </cell-group>
    <cell-group title="全部">
      <mt-cell title="Bilibili" is-link to="/bilibili" />
    </cell-group>
  </div>
</template>

<script>
  import axios from 'axios'
  import parse from '@/utils/parseRss'
  import CellGroup from '@/components/weui/cell-group';
  import Cell from '@/components/weui/cell';

  export default {
    name: 'Home',
    components: { Cell, CellGroup },
    computed: {
      favorites() {
        return this.$store.state.favorites
      }
    },
    created() {
    }
  }
</script>

<style lang="less" scoped>
  .home {

  }
</style>
