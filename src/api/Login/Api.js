export default {
  getMessage: {
    url: "/sendcode",
    method: "get",
    corsUrl: "/4000"
  },
  getUserName: {
    url: "/login_pwd",
    method: "post",
    corsUrl: "/4000"
  },
  getUserPhone: {
    url: "/login_sms",
    method: "post",
    corsUrl: "/4000"
  },
}