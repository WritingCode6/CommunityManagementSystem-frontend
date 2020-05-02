import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index.vue'),
      children : [{
          path: 'homepage',
          name: 'homepage',
          component: () => import('../views/homepage/homepage.vue')
        }, {
          path: 'personal',
          name: 'Personal',
          component: () => import('../views/personal/personal.vue')
        }, {
          path: 'parking',
          name: 'Parking',
          component: () => import('../views/parking/parking.vue')
        }, {
          path: 'staff',
          name: 'Staff',
          component: () => import('../views/staff/staff.vue')
        }, {
          path: 'visitor',
          name: 'Visitor',
          component: () => import('../views/visitor/visitor.vue')
        }, {
          path: 'notice',
          name: 'Notice',
          component: () => import('../views/notice/notice.vue')
        }, {
          path: 'activity',
          name: 'Activity',
          component: () => import('../views/activity/activity.vue')
        }, {
          path: 'feedback',
          name: 'Feedback',
          component: () => import('../views/feedback/feedback.vue')
        }]
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
