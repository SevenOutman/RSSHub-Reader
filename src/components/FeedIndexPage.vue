<template>
  <div>
    <cell-group title="全部">
      <mt-cell
        v-for="endpoint of endpoints"
        :key="endpoint.link"
        :title="endpoint.title"
        :to="endpoint.link"
        is-link
      >
        {{ endpoint.wip && '正在接入'}}
      </mt-cell>
    </cell-group>
  </div>
</template>

<script>
  import CellGroup from '@/components/weui/cell-group';
  import Cell from '@/components/weui/cell';

  export default {
    props: {
      endpoints: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: { Cell, CellGroup }
  }
</script>
