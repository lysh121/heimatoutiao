// 权限
import router from './router'

router.beforeEach(function (to, from, next) {
  // 判断当前路径
  if (to.path.startsWith('/home')) {
    // 判断是否有token
    if (window.localStorage.getItem('user-token')) {
      // 有token放行
      next()
    } else {
      // 没有token返回登录页
      next('/login')
    }
  } else {
    next()
  }
})

export default router
