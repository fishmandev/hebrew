import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Lesson from '@/components/Lesson'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/lesson/:id',
      name: 'Lesson',
      component: Lesson
    }
  ]
})
