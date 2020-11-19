import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import 'element-ui/lib/theme-chalk/index.css';
// 导入组件库

// import yuwenUi from '../packages/index';
// import yuwenUi from '../lib/yuwen-ui.umd.min.js';
// Vue.use(yuwenUi)
// import '../lib/yuwen-ui.css';

import TglButton from  "../lib/TglButton";
import TglInput from  "../lib/TglInput";
Vue.use(TglButton)
Vue.use(TglInput)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
