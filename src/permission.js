import router from "./router";
import store from "./store";

const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("user")) {
    if (to.path === "/login") {
      next();
    } else {
      const data = localStorage.getItem("user");
      const user = JSON.parse(data);
      store.commit("SET_USER", user);

      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
  /* if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }*/
});

router.afterEach(() => {});
