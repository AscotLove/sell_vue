<template>
  <div id="app">
    <router-view />
    <FooterGuide v-if="$route.meta.showFooterGuide" />
  </div>
</template>

<script>

  import FooterGuide from './components/FooterGuide/FooterGuide';

  export default {
    name: 'app',
    components: {
      FooterGuide,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
