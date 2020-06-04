import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      redirect: '/login',
      meta: {
        needLogin: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/login.vue'),
      meta: {
        needLogin: false
      }
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/index/property',
      meta: {
        needLogin: true
      },
      component: () => import('../views/index.vue'),
      children : [
        {
          path: 'personal',
          name: 'Personal',
          component: () => import('../views/personal/personal.vue'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'personalUser',
          name: 'PersonalUser',
          component: () => import('../views/personal/personalUser'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('../views/user/user.vue'),
          meta: {
            needLogin: true
          },
          children : [
            {
              path: 'userInfo',
              name: 'UserInfo',
              component: () => import('../compoment/user/userInfo'),
              meta: {
                needLogin: true
              }
            }
          ]
        },
        {
          path: 'parking',
          name: 'Parking',
          component: () => import('../views/parking/parking.vue'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'parkingUser',
          name: 'ParkingUser',
          component: () => import('../views/parking/parkingUser.vue'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'staff',
          name: 'Staff',
          component: () => import('../views/staff/staff.vue'),
          meta: {
            needLogin: true
          }
        },
        /*{
          path: 'visitor',
          name: 'Visitor',
          component: () => import('../views/visitor/visitor.vue')
        }, */
        {
          path: 'repair',
          name: 'Repair',
          component: () => import('../views/repair/repair.vue'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'repairUser',
          name: 'RepairUser',
          component: () => import('../views/repair/repairUser.vue'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'notice',
          name: 'Notice',
          component: () => import('../views/notice/notice.vue'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'activity',
          name: 'Activity',
          component: () => import('../views/activity/activity.vue'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'feedback',
          name: 'Feedback',
          component: () => import('../views/feedback/feedback.vue'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'property',
          name: 'Property',
          component: () => import('../views/property/property.vue'),
          meta: {
            needLogin: true
          }
        }
      ]
    },
    {
      path : '*',
      redirect: '/index/property',
      meta: {
        needLogin: true
      }
    }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

//在每个路由上判断是否需要登录，token是否过期
router.beforeEach(function(to, from, next) {
  if (to.meta.needLogin) {
    //页面是否登录
    if (localStorage.getItem("token")) {
      //本地存储中是否有token数据
      next(); //表示已经登录
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        path: '/login'
      });
      alert('请登录后再访问主页')
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
});

/*router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});*/

export default router
