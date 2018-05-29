<template>
  <div class="jike">
    <cell-group title="全部">
      <mt-cell title="主题" is-link to="/jike/topic" />
      <mt-cell title="用户动态" is-link to="/jike/user"/>
    </cell-group>
  </div>
</template>

<script>
  import CellGroup from '@/components/weui/cell-group';
  import Cell from '@/components/weui/cell';

  export default {
    name: 'Jike',
    components: { Cell, CellGroup }
  }
</script>

<style scoped>

</style>
