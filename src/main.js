import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import TimeEntries from './components/TimeEntries.vue'
import LogTime from './components/LogTime.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home', component: Home
    },
    {
      path: '/time-entries',
      component: TimeEntries,
      children: [
        { path: 'log-time', component: LogTime }
      ]
    },
    {
      path: '*', redirect: '/home'
    }

  ]
})

const eventHub = new Vue() // Single event hub

// Distribute to components using global mixin
Vue.mixin({
  data: function () {
    return {
      eventHub: eventHub
    }
  }
})
// eslint-disable-next-line no-new
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
