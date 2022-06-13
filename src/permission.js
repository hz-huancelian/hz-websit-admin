import router from './router'
import store from './store'
import { Notification } from 'element-ui'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start() // start progress bar
  document.title = getPageTitle(to.meta.title) // set page title

  if (to.path.indexOf('register') > -1) {
    next()
    NProgress.done()
  } else {
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
          next()
        } else {
          try {
            await store.dispatch('user/getInfo')
            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('permission/generateRoutes')
            router.addRoutes(accessRoutes)
            next({ ...to, replace: true })
          } catch (error) {
            await store.dispatch('user/resetToken')
            Notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            next('/login')
            NProgress.done()
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
