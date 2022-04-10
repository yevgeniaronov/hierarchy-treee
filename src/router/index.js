import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "hierarchy-tree",
    component: () =>
      import(
        /* webpackChunkName: "hierarchy-tree-view" */ "../views/HierarchyTreeView/index.js"
      ),
    meta: {
      guarded: true,
      title: "Hierarchy Tree",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login-view" */ "@/views/LoginView/index.js"),
    meta: {
      preventIfAuth: true,
      title: "Please Login",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem("app-authToken"); // a global state getter would be better here: i.e: store.getters['isAuth']
  if (to.meta.preventIfAuth && isAuth) return next(from); // prevent authenticated user from accessing login page
  if (to.meta.guarded && !isAuth)
    return next({
      name: "login",
    });
  // prevent un-authenticated user from going to home dashboard
  next();
});

export default router;
