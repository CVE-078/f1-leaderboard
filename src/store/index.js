import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    addResult(state, result) {
      state.results.push(result);
    },
  },
  actions: {},
  modules: {},
});
