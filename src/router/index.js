import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/quote/cusMiddleList',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', roles: ['admin'] },
        hidden: true
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/quote',
    component: Layout,
    name: 'quote',
    redirect: 'noredirect',
    meta: {
      title: '首页展示',
      icon: 'documentation'
    },
    children: [
      {
        path: 'cusMiddleList',
        component: () => import('@/views/quote/cusMiddleList'),
        name: 'cusMiddleList',
        meta: { title: '产品演示轮播' }
      },
      {
        path: 'cusBottomList',
        component: () => import('@/views/quote/cusBottomList'),
        name: 'cusBottomList',
        meta: { title: '案例评价管理' }
      }
    ]
  },
  {
    path: '/adver',
    component: Layout,
    name: 'adver',
    redirect: 'noredirect',
    meta: {
      title: '广告',
      icon: 'guide'
    },
    children: [
      {
        path: 'adverList',
        component: () => import('@/views/adver'),
        name: 'adverList',
        meta: { title: '广告列表' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    name: 'customer',
    redirect: 'noredirect',
    meta: {
      title: '案例管理',
      icon: 'user'
    },
    children: [
      {
        path: 'customerList',
        component: () => import('@/views/customer/customerList'),
        name: 'customerList',
        meta: { title: '精选案例' }
      },
      {
        path: 'customerSeekList',
        component: () => import('@/views/customer/customerSeekList'),
        name: 'customerSeekList',
        meta: { title: '申请体验客户列表' }
      },
      {
        path: 'serverCustomerList',
        component: () => import('@/views/customer/serverCustomer'),
        name: 'serverCustomerList',
        meta: { title: '分类案例' }
      }
    ]
  }
  // {
  //   path: '/sysManage',
  //   component: Layout,
  //   redirect: '/sysManage/dictList',
  //   name: 'sysManage',
  //   meta: {
  //     title: '系统管理',
  //     icon: 'icon'
  //   },
  //   children: [
  //     {
  //       path: 'dictList',
  //       component: () => import('@/views/dict/index'),
  //       name: 'dictList',
  //       meta: { title: '字典列表', roles: ['admin', 'manager'] }
  //     }
  //   ]
  // }
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
