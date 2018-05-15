<template>
  <div class="weui-cell" :class="{ 'weui-cell_access': !!to }" @click="onClick">
    <div class="weui-cell__hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui-cell__bd">
      <slot></slot>
    </div>
    <div class="weui-cell__ft">
      <slot name="desc"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cell',
    props: ['to'],
    methods: {
      onClick() {
        this.to && this.$router.push(this.to)
      }
    }
  }
</script>

<style lang="less">
  @import "~weui/src/style/widget/weui-cell/weui-cell_global";
  @import "~weui/src/style/widget/weui-cell/weui-access";
</style>
