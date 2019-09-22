<template>
  <div class="on">
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login" slot="right">
          <span class="header_login_text" @click="goto">登录|注册</span>
        </span>
      </HeaderTop>
      <!--首页导航-->
      <NavList />
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!--首页附近商家-->
      <ShopList />
    </section>
  </div>
</template>

<script>
  import HeaderTop from 'components/HeaderTop/HeaderTop';
  import ShopList from 'components/ShopList/ShopList';
  import NavList from 'components/NavList/NavList';
  import { mapState, mapActions } from 'vuex';
  export default {
    name: "Msite",
    computed: {
      ...mapState(['address'])
    },
    components: {
      HeaderTop,
      ShopList,
      NavList
    },
    methods: {
      ...mapActions(['addressUpdate', 'categoryUpdate']),
      goto() {
        this.$router.push('/Login')
      }
    },
    mounted() {
      this.addressUpdate();
      this.categoryUpdate();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

&.msite  //首页
  width 100%

      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774

</style>