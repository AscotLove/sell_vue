<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: showLogin}" @click="showLogin = true">短信登录</a>
          <a href="javascript:;" :class="{on: !showLogin}" @click="showLogin = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: showLogin}">
            <section class="login_message">
              <input v-model="phone" v-validate="'mobile'" name="phone" type="tel" placeholder="手机号">
              <span v-show="errors.has('phone')" style="color:red">{{ errors.first('phone') }}</span>
              <button :disabled="!phoneRules || (times > 0)"
                      :class="['get_verification',{highLight: phoneRules} ]"
                      @click.prevent="getcodo">{{times ? `验证码已发送(${times}s)`: "获取验证码"}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" v-model="code" name="code" placeholder="验证码" v-validate="{required: true, regex: /^\d{6}$/}">
              <span v-show="errors.has('code')" style="color:red">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !showLogin}">
            <section>
              <section class="login_message">
                <input type="tel" v-model="name" name="name" v-validate="'required'"  placeholder="手机/邮箱/用户名">
                <span v-show="errors.has('name')" style="color:red">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input :type="showPassword ? 'text' : 'password'" v-model="passwords" v-validate="'required'" name="password" placeholder="密码">
                <span v-show="errors.has('password')" style="color:red">{{ errors.first('password') }}</span>
                <div class="switch_button" :class="showPassword ? 'off' : 'on'" @click="showPassword=!showPassword">
                  <div class="switch_circle" :class="{right:showPassword}"></div>
                  <span class="switch_text">{{showPassword ? 'abc' : ""}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" v-model="captcha" v-validate="{required: true, regex: /^[0-9a-zA-Z]{4}$/}" placeholder="验证码">
                <img class="get_verification" src="http://192.168.3.113:4000/captcha"
                     alt="captcha" ref="captcha" @click="getCaptcha">
                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="goBack">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import login from '../../api/Login';
  import { mapActions } from 'vuex';
  import { Toast } from 'vant';
  const OK = 0;
  const ERROR = 1;
  export default {
    name: "Login",
    data() {
      return {
        times: 0,
        showLogin: true,
        showPassword: true,
        phone: '',
        name: '',
        code: '',
        captcha: '',
        passwords: '',

      }
    },
    computed: {
      phoneRules() {
        return /^1[3456789]\d{9}$/.test(this.phone)
      },
    },
    methods: {
      ...mapActions(['userUpdate']),
      goBack() {
        this.$router.go(-1)
      },
      getCaptcha() {
        this.$refs.captcha.src = `http://192.168.3.113:4000/captcha?time=${Date.now()}`
      },
      getcodo() {
        this.times = 10;
        const timer = setInterval(() => {
          this.times --;
          if (this.times === 0) {
            clearInterval(timer)
          }
        },1000)
        const res = login.getMessage({
          phone: this.phone
        })
        if (res.code === OK ) this.times = 0;
        if (res.code === ERROR) Toast.fail('获取验证码失败')
      },
      login() {
        if (this.showLogin) {
          const phone = this.phone;
          const code = this.code;
          if (!phone || !code) {
            Toast.fail('请提交完整信息');
            return
          }
          this.userUpdate({ phone, code })
        } else {
          const name = this.name;
          const pwd = this.passwords;
          const captcha = this.captcha;
          if (!name || !pwd || !captcha) {
            Toast.fail('请提交完整信息');
            return
          }
          this.userUpdate({ name, pwd, captcha })
        }
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          > a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        > form
          > div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
              .highLight
                color #08ddc4
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                .switch_text
                  float left
                  color #ddd
                &.on
                  background #02a774
                > .switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              > a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        > .iconfont
          font-size 20px
          color #999
</style>