<template>
  <div class="bilibili">
    <cell-group title="全部">
      <mt-cell title="放送列表" is-link to="/bangumi/calendar-today" />
    </cell-group>
  </div>
</template>

<script>
  import CellGroup from '@/components/weui/cell-group';
  import Cell from '@/components/weui/cell';

  export default {
    name: 'Bangumi',
    components: { Cell, CellGroup }
  }
</script>

<style scoped>

</style>
