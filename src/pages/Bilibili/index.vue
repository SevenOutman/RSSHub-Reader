<template>
  <div class="bilibili">
    <cell-group title="全部">
      <mt-cell title="番剧" is-link to="/bilibili/bangumi" />
      <mt-cell title="UP主投稿" is-link to="/bilibili/user-video" />
      <mt-cell title="UP主动态" is-link to="/bilibili/user-activity" />
      <mt-cell title="UP主收藏夹" is-link to="/bilibili/user-fav" />
      <mt-cell title="UP主投币视频" is-link to="/bilibili/user-coin" />
      <mt-cell title="UP主粉丝" is-link to="/bilibili/user-followers" />
      <mt-cell title="UP主关注用户" is-link to="/bilibili/user-followings" />
      <mt-cell title="分区视频" is-link to="/bilibili/partion" />
      <mt-cell title="视频评论" is-link to="/bilibili/video-comments" />
      <mt-cell title="link公告" is-link>正在接入</mt-cell>
      <mt-cell title="直播开播" is-link to="/bilibili/live-room"></mt-cell>
      <mt-cell title="直播搜索" is-link>正在接入</mt-cell>
      <mt-cell title="直播分区" is-link>正在接入</mt-cell>
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
