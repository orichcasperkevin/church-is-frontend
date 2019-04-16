import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import memberList from '@/components/member/memberList'
import memberDetail from '@/components/member/memberDetail'
import memberAdd from '@/components/member/memberAdd'

import groupsLanding from '@/components/groups/groupsLanding'
import groupList from "@/components/groups/groupList"
import groupDetail from "@/components/groups/groupDetail"

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
    },
    {
      path: '/memberAdd/',
      name: 'memberAdd',
      component: memberAdd
    },
    {
      path: 'groupsLanding',
      name: 'groupsLanding',
      component: groupsLanding,
      children: [
        {
          path: '',
          name: 'groupList',
          component: groupList
        },
        {
          path: '/groupList/:group_type',
          name: 'groupList',
          component: groupList
        }
      ]
    },
    {
      path:'/groupDetail/:id/:group_type',
      name: 'groupDetail',
      component: groupDetail
    }

  ]
})
