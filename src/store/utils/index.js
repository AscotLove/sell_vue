// 保存用户信息
function loginSuccess(commit, mutation, user) {
  localStorage.setItem("USER", user)
  commit(mutation, user)
}



export {
  loginSuccess,
}