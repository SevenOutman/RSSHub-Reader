<template>
  <div class="weibo">
    <cell-group title="全部">
      <mt-cell title="博主" is-link to="/weibo/user" />
      <mt-cell title="关键词" is-link to="/weibo/keyword" />
    </cell-group>
  </div>
</template>

<script>
  import CellGroup from '@/components/weui/cell-group';
  import Cell from '@/components/weui/cell';

  export default {
    name: 'Weibo',
    components: { Cell, CellGroup }
  }
</script>

<style scoped>

</style>
