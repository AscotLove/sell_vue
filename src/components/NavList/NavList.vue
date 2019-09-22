<template>
  <nav class="msite_nav">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(categorie, index) in categoriesArr" :key="index">
          <a href="javascript:" class="link_to_food" v-for="category in categorie" :key="category._id">
            <div class="food_container">
              <img :src="baseImgUrl + category.image_url">
            </div>
            <span>{{category.title}}</span>
          </a>

        </div>

      </div>

    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import _ from 'lodash';

  export default {
    name: "NavList",
    computed: {
      ...mapState(['categories', 'baseImgUrl']),
      categoriesArr() {
        return _.chunk(this.categories, 8)
      },
    },
    methods: {
        newSwiper() {
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        },
    },
    watch: {
      categoriesArr() {
        this.$nextTick(() => {
          this.newSwiper()
        })
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';
.msite_nav
  bottom-border-1px(#e4e4e4)
  margin-top 45px
  height 200px
  background #fff
  .swiper-container
    width 100%
    height 100%
    .swiper-wrapper
      width 100%
      height 100%
      .swiper-slide
        display flex
        justify-content center
        align-items flex-start
        flex-wrap wrap
        .link_to_food
          width 25%
          .food_container
            display block
            width 100%
            text-align center
            padding-bottom 10px
            font-size 0
            img
              display inline-block
              width 50px
              height 50px
          span
            display block
            width 100%
            text-align center
            font-size 13px
            color #666
</style>