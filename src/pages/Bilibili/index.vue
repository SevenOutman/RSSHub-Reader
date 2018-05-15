<template>
  <div class="bilibili">
    <cell-group title="全部">
      <mt-cell title="番剧" is-link to="/bilibili/bangumi"/>
      <mt-cell title="UP主投稿" is-link />
      <mt-cell title="UP主动态" is-link />
      <mt-cell title="UP主收藏夹" is-link />
      <mt-cell title="UP主投币视频" is-link />
      <mt-cell title="UP主粉丝" is-link />
      <mt-cell title="UP主关注用户" is-link />
      <mt-cell title="分区视频" is-link />
      <mt-cell title="视频评论" is-link />
      <mt-cell title="link公告" is-link />
      <mt-cell title="直播开播" is-link />
      <mt-cell title="直播搜索" is-link />
      <mt-cell title="直播分区" is-link />
    </cell-group>
  </div>
</template>

<script>
  import CellGroup from '@/components/weui/cell-group';
  import Cell from '@/components/weui/cell';

  export default {
    name: 'Bilibili',
    components: { Cell, CellGroup }
  }
</script>

<style scoped>

</style>
