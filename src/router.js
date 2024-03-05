import { createWebHistory, createRouter } from "vue-router";
import HomeComponent from "./components/HomeComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
// lazy-loaded
const ProfileComponent = () => import("./components/ProfileComponent.vue")
const BoardAdmin = () => import("./components/BoardAdminComponent.vue")
const BoardStoryteller = () => import("./components/BoardStorytellerComponent.vue")
const BoardPlayer = () => import("./components/BoardPlayerComponent.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeComponent,
  },
  {
    path: "/home",
    component: HomeComponent,
  },
  {
    path: "/login",
    component: LoginComponent,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: ProfileComponent,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/player",
    name: "player",
    // lazy-loaded
    component: BoardPlayer,
  },
  {
    path: "/storyteller",
    name: "storyteller",
    // lazy-loaded
    component: BoardStoryteller,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;