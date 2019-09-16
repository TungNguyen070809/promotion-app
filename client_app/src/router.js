import Vue from "vue";
import Router from "vue-router";
import Info from "./views/Info";
import Dashboard from "./views/Dashboard";
import Setting from "./views/Setting";
import Promotion from "./views/Promotion";
import Page404 from "./views/Page404";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/info",
      name: "info",
      component: Info
    },
    {
      path: "/setting",
      name: "setting",
      component: Setting
    },
    {
      path: "/promotion",
      name: "promotion",
      component: Promotion
    },
    {
      path: "/404",
      name: "404",
      component: Page404
    },
    {
      path: "*",
      redirect: "/404"
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
