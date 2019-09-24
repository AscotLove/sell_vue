import Vue from 'vue';
import veeValidate, {Validator} from 'vee-validate';

import zh_CN from 'vee-validate/dist/locale/zh_CN';

Vue.use(veeValidate, {
  mode: 'lazy'
});

Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号',
    code: '验证码',
  }
});

Validator.extend('mobile', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'

})