import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import memberList from '@/components/member/memberList'
import memberDetail from '@/components/member/memberDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/memberList',
      name: 'memberList',
      component: memberList
    },
    {
      path: '/memberDetail/:id',
      name: 'memberDetail',
      component: memberDetail
      }
  ]
})
