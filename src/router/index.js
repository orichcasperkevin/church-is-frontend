import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import memberList from '@/components/member/memberList'
import memberDetail from '@/components/member/memberDetail'
import memberAdd from '@/components/member/memberAdd'

import groupsLanding from '@/components/groups/groupsLanding'
import groupList from "@/components/groups/groupList"
import groupDetail from "@/components/groups/groupDetail"

import events from "@/components/events/events"

import projectList from "@/components/projects/projectList"
import projectDetail from "@/components/projects/projectDetail"

import generalFinance from "@/components/finance/generalFinance"

import  dailyVerse from "@/components/daily-verses/dailyVerse"

import sermons from "@/components/sermons/sermons"

import services from "@/components/services/services"

import login from "@/components/auth/login"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login/',
      name: 'login',
      component: login
    },
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
    },
    {
      path:'/events/',
      name: 'events',
      component: events  
    },
    {
      path:'/projectList/',
      name:'projectList',
      component: projectList
    },
    {
      path: '/projectDetail/:id/',
      name: 'projectDetail',
      component: projectDetail
    },
    {
      path: '/generalFinance/',
      name: 'generalFinance',
      component: generalFinance
    },
    {
      path: '/dailyVerse/',
      name: 'dailyVerse',
      component: dailyVerse
    },
    {
      path: '/sermons/',
      name: 'sermons',
      component: sermons
    },
    {
      path: '/services/',
      name: 'services',
      component: services
    }

  ]
})
