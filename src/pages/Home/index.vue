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
      <mt-cell title="微博" is-link to="/weibo">
        <icon slot="icon" type="weibo" width="24" height="24" />
      </mt-cell>
      <mt-cell title="即刻">正在接入
        <icon slot="icon" type="jike" width="24" height="24" />
      </mt-cell>
      <mt-cell title="网易云音乐">正在接入
        <icon slot="icon" type="ncm" width="24" height="24" />
      </mt-cell>
      <mt-cell title="掘金">正在接入
        <icon slot="icon" type="juejin" width="24" height="24" />
      </mt-cell>
      <mt-cell title="简书">正在接入
        <icon slot="icon" type="jianshu" width="24" height="24" />
      </mt-cell>
      <mt-cell title="知乎">正在接入
        <icon slot="icon" type="zhihu" width="24" height="24" />
      </mt-cell>
      <mt-cell title="自如">正在接入
        <icon slot="icon" type="ziroom" width="24" height="24" />
      </mt-cell>
      <mt-cell title="快递">正在接入
        <icon slot="icon" type="express" width="24" height="24" />
      </mt-cell>
      <mt-cell title="贴吧">正在接入
        <icon slot="icon" type="tieba" width="24" height="24" />
      </mt-cell>
      <mt-cell title="妹子图">正在接入
        <icon slot="icon" type="mzitu" width="24" height="24" />
      </mt-cell>
      <mt-cell title="Pixiv">正在接入
        <icon slot="icon" type="pixiv" width="24" height="24" />
      </mt-cell>
      <mt-cell title="豆瓣">正在接入
        <icon slot="icon" type="douban" width="24" height="24" />
      </mt-cell>
      <mt-cell title="煎蛋">正在接入
        <icon slot="icon" type="jiandan" width="24" height="24" />
      </mt-cell>
      <mt-cell title="喷嚏">正在接入
        <icon slot="icon" type="dapenti" width="24" height="24" />
      </mt-cell>
      <mt-cell title="Dockone">正在接入
        <icon slot="icon" type="dockone" width="24" height="24" />
      </mt-cell>
      <mt-cell title="腾讯吐个槽">正在接入
        <icon slot="icon" type="tucaoqq" width="24" height="24" />
      </mt-cell>
      <mt-cell title="笔趣阁">正在接入
        <icon slot="icon" type="biquge" width="24" height="24" />
      </mt-cell>
      <mt-cell title="开发者头条">正在接入
        <icon slot="icon" type="toutiao" width="24" height="24" />
      </mt-cell>
      <mt-cell title="Disqus">正在接入
        <icon slot="icon" type="disqus" width="24" height="24" />
      </mt-cell>
      <mt-cell title="Twitter">正在接入
        <icon slot="icon" type="twitter" width="24" height="24" />
      </mt-cell>
      <mt-cell title="Instagram">正在接入
        <icon slot="icon" type="instagram" width="24" height="24" />
      </mt-cell>
      <mt-cell title="Youtube">正在接入
        <icon slot="icon" type="youtube" width="24" height="24" />
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
