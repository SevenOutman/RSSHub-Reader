<template>
  <div class="tieba">
    <cell-group title="全部">
      <mt-cell title="帖子列表" is-link to="/tieba/forum" />
      <mt-cell title="精品帖子" is-link to="/tieba/forum-good" />
    </cell-group>
  </div>
</template>

<script>
  import CellGroup from '@/components/weui/cell-group';
  import Cell from '@/components/weui/cell';

  export default {
    name: 'Tieba',
    components: { Cell, CellGroup }
  }
</script>

<style scoped>

</style>
