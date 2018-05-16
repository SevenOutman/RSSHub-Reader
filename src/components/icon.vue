<template>
  <img :src="src" :alt="type">
</template>

<script>
  import bilibili from '@/assets/bilibili.ico'

  const icons = {
    bilibili,
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
