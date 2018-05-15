<template>
  <div class="cell-group">
    <div class="weui-cells__title">
      {{ title }}
    </div>
    <div class="weui-cells">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cell-group',
    props: ['title']
  }
</script>

<style lang="less">
  @import "~weui/src/style/widget/weui-cell/weui-cell_global";
</style>
