import Vue from "vue";
import Vuex from "vuex";
import form from "./form/index.js";
Vue.use(Vuex);
let store = new Vuex.Store({
  actions: {},
  modules: { form: form }
});

export default store;
