<template>
  <img :src="src" :alt="type">
</template>

<script>
  import bilibili from '@/assets/bilibili.ico'
  import bangumi from '@/assets/bangumi.ico'
  import weibo from '@/assets/weibo.ico'
  import tieba from '@/assets/tieba.ico'
  import jike from '@/assets/jike.ico'

  const icons = {
    bilibili,
    bangumi,
    weibo,
    tieba,
    jike
  }

  export default {
    name: "icon",
    props: ['type'],
    computed: {
      src() {
        return icons[this.type] || 'http://via.placeholder.com/24x24'
      },
    },
  }
</script>

<style scoped>

</style>
