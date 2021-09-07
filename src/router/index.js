import Vue from "vue";
import VueRouter from "vue-router";
import Circuits from "@/views/Circuits";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: {
      name: "Circuits",
    },
  },
  {
    path: "/circuits",
    name: "Circuits",
    component: Circuits,
  },
  {
    path: "/circuit/:slug",
    name: "CircuitDetail",
    component: () =>
      import(
        /* webpackChunkName: "CircuitDetail" */ "../views/CircuitDetail.vue"
      ),
    params: true,
  },
  {
    path: "/players",
    name: "Players",
    component: () =>
      import(/* webpackChunkName: "Players" */ "../views/Players.vue"),
  },
  {
    path: "/player/:slug",
    name: "PlayerDetail",
    component: () =>
      import(
        /* webpackChunkName: "PlayerDetail" */ "../views/PlayerDetail.vue"
      ),
    params: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
