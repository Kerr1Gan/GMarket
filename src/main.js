import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Analytics from './Analytics.vue'
import Index from './Index.vue'
import VueRouter from 'vue-router'

Vue.use(ElementUI)
Vue.use(VueRouter)

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Index },
  { path: '/analytics', component: Analytics, name: 'analytics' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes: routes,
  mode: 'history',
  base: '/',
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')