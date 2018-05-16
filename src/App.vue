<template>
  <div id="app">
    <div class="iphonex-notch-header">
      <mt-header :title="$route.meta.title || 'RSSHub'">
        <template slot="left" v-if="$route.path !== '/'">
          <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
        </template>
      </mt-header>
    </div>
    <main>
      <transition :name="transitionName">
        <router-view class="page"></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionName: '',
      }
    },
    watch: {
      $route(to, from) {
        if (to.path === '/') this.transitionName = 'slide-right'
        else if (from.path === '/') this.transitionName = 'slide-left'
        else {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length

          this.transitionName = (toDepth >= fromDepth ? 'slide-left' : 'slide-right')
        }
      },
    },
  }
</script>

<style lang="less">
  @import "~@/styles/variables";
  @import "~@/styles/mixins";

  body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    touch-action: manipulation;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    display: flex;
    flex-direction: column;
  }

  .iphonex-notch-header {
    background-color: @theme-color;
    background: @theme-gradient;
    padding-top: 0;
    .iphonex({ padding-top: constant(safe-area-inset-top); padding-top: env(safe-area-inset-top); });
  }

  .mint-header {
    background-color: transparent;
  }

  header {
    flex-shrink: 0;
  }

  main {
    flex-grow: 1;
    position: relative;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .page {
    padding-top: 15px;
    background-color: #fff;
    width: 100%;
    min-height: 100%;

    .iphonex({ padding-bottom: constant(safe-area-inset-bottom); padding-bottom: env(safe-area-inset-bottom); });

    .container {
      padding-left: 15px;
      padding-right: 15px;
    }

    // router-view transition

    &.slide-right-enter-active,
    &.slide-right-leave-active,
    &.slide-left-enter-active,
    &.slide-left-leave-active {
      will-change: transform;
      transition: transform 400ms;
      position: absolute;
      backface-visibility: hidden;
      perspective: 1000;
    }

    &.slide-left-enter {
      /*opacity: 0;*/
      transform: translate3d(100%, 0, 0);
      box-shadow: 0 0 .2rem 0 rgba(0, 0, 0, .5);
    }

    &.slide-left-leave-active {
      z-index: 0;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        background-color: rgba(0, 0, 0, .1);
        transition: opacity 400ms;
        will-change: opacity;
        z-index: 1;
      }
    }

    &.slide-left-leave {
      &::before {
        opacity: 0;
      }
    }

    &.slide-left-leave-to {
      /*opacity: 0;*/
      transform: translate3d(-20%, 0, 0);
      &::before {
        opacity: 1;
      }
    }

    &.slide-right-enter {
      /*opacity: 0;*/
      transform: translate3d(-20%, 0, 0);
      &::before {
        opacity: 1;
      }
    }

    &.slide-right-enter-active {
      z-index: 0;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        background-color: rgba(0, 0, 0, .1);
        transition: opacity 400ms;
        will-change: opacity;
        z-index: 1;
      }
    }

    &.slide-right-enter-to {
      &::before {
        opacity: 0;
      }
    }

    &.slide-right-leave-to {
      /*opacity: 0;*/
      transform: translate3d(100%, 0, 0);
      box-shadow: 0 0 .2rem 0 rgba(0, 0, 0, .5);
    }

    &.slide-right-leave-active,
    &.slide-left-enter-active {
      z-index: 1;
    }
  }
</style>
