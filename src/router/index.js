import Vue from "vue";
import Router from "vue-router";
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/404', component: () => import('@/views/404'), hidden: true },

  /* {
    path: '/',
    component: Layout,
    redirect: '/login',
    name: 'layout',
    hidden: true,
    children: [{
      path: 'login',
      component: () => import('@/views/login')
    }, {
      path: 'index',
      component: () => import('@/views/index')
    }, {
      path: 'userInfo',
      component: () => import('@/views/userInfo')
    }]
  },*/
  {
    path: "/",
    component: () => import("@/views/login/fastLogin.vue")
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/index",
    component: () => import("@/views/index"),
    children: [
      {
        path: "/message/:id",
        component: () => import("@/components/message")
      }
    ]
  },
  {
    path: "/userInfo",
    component: () => import("@/views/userInfo")
  },
  {
    path: "/test",
    component: () => import("@/components/test")
  }
  // { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
