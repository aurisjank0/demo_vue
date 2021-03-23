import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { dataSizeFilter } from "./plugins/filters";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.filter("formatSize", dataSizeFilter);
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
