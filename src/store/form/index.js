import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations.js";
import { state } from "./state";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
