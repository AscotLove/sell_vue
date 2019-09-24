import { Toast, Dialog } from 'vant';

import axios from 'axios';

import store from "../../store";
import router from '../../router';


const msiteInstance = axios.create({
  timeout: 7000
})



function ajaxInstance(instance) {
  instance.interceptors.request.use(
    (config) => {
      // 在需要token时添加token
      const needToken = config.headers.needToken;
      if (needToken) {
        const token = store.state.token;
        if (token) {
          config.headers.Authorization = token
        } else {
          let error = new Error('请登录帐号');
          error.status = 401;
          throw error
        }
      }
      // 处理get请求params格式不正确
      if (config.url === '/4000/position') {
        config.url = config.url + '/' + config.params.latitude + ',' + config.params.longitude;
        config.params = {};
      }

      // 在请求是显示Loading
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '加载中...',
        mask: true
      });
        return config
      },
      (err) => {
        Toast.clear(); // 删除长提示
        Toast.fail('请求失败');
        return Promise.reject(err)
      }
    )

  instance.interceptors.response.use(
    (response) => {

      Toast.clear();
      return response.data
    },
    (err) => {
      Toast.clear();
      Toast.fail('请求失败');

      const { response,message } = err;
      // 收集后台日志
      console.log(message);
      if (response) {
        store.dispatch();
      }
      Dialog({ message: '请登录帐号' });
      router.replace('/Login');

      return Promise.reject(err);
    }
  )
  return instance;
}

export default ajaxInstance(msiteInstance);