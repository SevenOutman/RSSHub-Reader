<template>
  <div class="button-group container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'button-group'
  }
</script>

<style lang="less">
  .button-group {
    button {
      margin-bottom: 15px;
    }
  }
  .cell-group + .button-group {
    margin-top: 15px;
  }
</style>
