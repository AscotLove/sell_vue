import axios from 'axios';


const loginInstance = axios.create({
  timeout: 7000
})

loginInstance.interceptors.request.use(
  (config) => {

    return config
  },
  (err) => {

    return Promise.reject(err)
  }
)


loginInstance.interceptors.response.use(
  (res) => {

    return res.data
  },
  (err) => {

    return Promise.reject(err)
  }
)


export default loginInstance;