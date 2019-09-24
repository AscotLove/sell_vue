

const axiosHttp = (axiosApi, axiosInstance) => {
  let Http = {};

  for (let key in axiosApi) {
    let {url, method, isForm, corsUrl, needToken} = axiosApi[key]
    Http[key] = async (data, config = {}) => {
      let transData = data;
      if (data && isForm) {
        transData = new FormData();
        for (let value in data) {
          transData.append(value, data[value])
        }
      }
      if (corsUrl) {
        url = corsUrl+url;
        corsUrl = ''
      }

      let res = null;
      if (method === 'get' || method === 'delete') {

        let params = Object.assign({}, transData, config.params);
        try {
          res = await axiosInstance({url, method, params, headers: {needToken}});
          res = Promise.resolve(res);
        } catch (e) {
          res = Promise.reject(e)
        }
      }

      if (method === 'post' || method === 'put' || method === '') {
        try {
          res = await axiosInstance({url, method, data: transData, headers: {needToken}});
          res = Promise.resolve(res);
        } catch (e) {
          res = Promise.reject(e)
        }
      }
      return res
    }
  }
  return Http;
}


export {
  axiosHttp
}