import { Toast } from 'vant';
import msiteInstance  from './assets/component_instance.js';


function ajaxInstance(instance) {
  instance.interceptors.request.use(
    (config) => {
      if (config.url === '/4000/position') {
        config.url = config.url + '/' + config.params.latitude + ',' + config.params.longitude;
        config.params = "";
      }
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
      });
        return config
      },
      (err) => {
        Toast.fail('请求失败');
        return Promise.reject(err)
      }
    )

  instance.interceptors.response.use(
    (response) => {

      Toast.clear();
      return response
    },
    (err) => {
      Toast.fail('请求失败');
      return Promise.reject(err)
    }
  )
  return instance
}

export default ajaxInstance(msiteInstance);