import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission"; // permission control
import weui from "weui";
import "weui/dist/style/weui.css";
import contentmenu from "v-contextmenu";
import "v-contextmenu/dist/index.css";
import "./utils/click";
Vue.use(contentmenu);

Vue.config.productionTip = false;
Vue.prototype.$weui = weui;
Vue.use(weui);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
