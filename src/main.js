import Vue from "vue";
import { rtdbPlugin } from "vuefire";
import Toasted from "vue-toasted";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/main.scss";

Vue.config.productionTip = false;

Vue.use(rtdbPlugin);

Vue.use(Toasted, {
  iconPack: 'material' // material|fontawesome|custom-class
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
