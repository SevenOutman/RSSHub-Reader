<template>
  <div class="home">
    <cell-group title="收藏">
      <mt-cell title="Bilibili" is-link to="/bilibili" />
      <mt-cell title="Bilibili" is-link to="/bilibili" />
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
    created() {
      axios('/bilibili/user/coin/2267573?filter=微小微|赤九玖|暴走大事件')
        .then(async ({ data }) => {
          console.log(await parse(data))
        })
    }
  }
</script>

<style lang="less" scoped>
  .home {

  }
</style>
