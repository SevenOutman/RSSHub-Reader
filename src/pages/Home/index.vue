<template>
  <div class="home">
    <cell-group title="我的收藏" v-if="favorites.length > 0">
      <mt-cell
        v-for="favorite of favorites"
        :key="favorite.rss"
        :title="favorite.title"
        :label="favorite.desc"
        is-link
        :to="favorite.path"
      >
        <icon slot="icon" :type="favorite.type" width="24" height="24" />
      </mt-cell>
    </cell-group>
    <cell-group title="全部 RSS 源">
      <mt-cell title="Bilibili" is-link to="/bilibili">
        <icon slot="icon" type="bilibili" width="24" height="24" />
      </mt-cell>
    </cell-group>
  </div>
</template>

<script>
  import axios from 'axios'
  import parse from '@/utils/parseRss'
  import CellGroup from '@/components/weui/cell-group';
  import Cell from '@/components/weui/cell';
  import Icon from '@/components/icon';

  export default {
    name: 'Home',
    components: { Icon, Cell, CellGroup },
    computed: {
      favorites() {
        return this.$store.state.favorites
      },
    },
    created() {
    },
  }
</script>

<style lang="less" scoped>
  .home {

  }
</style>
