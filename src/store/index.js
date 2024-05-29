import Vue from "vue";
import Vuex from "vuex";
import form from "./form/index.js";
import { auth } from "./auth.module";
Vue.use(Vuex);
let store = new Vuex.Store({
  actions: {},
  modules: { form: form ,auth}
});

export default store;
