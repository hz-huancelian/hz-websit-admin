import Vue from 'vue'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import Pagination from '@/components/Pagination'

// import vueSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
import '@/utils/filter' // base filter

import '@/styles/index.scss' // global css
import App from './App.vue'
import store from './store'
import router from './router'

import './icons' // icon
import './permission'

Vue.component('Pagination', Pagination)

Vue.use(vueSwiper) // permission control

// Vue.use(vueSwiper)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
