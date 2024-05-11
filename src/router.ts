import { createWebHistory, createRouter } from 'vue-router'
import HomeComponent from './components/HomeComponent.vue'
import LoginComponent from './components/LoginComponent.vue'

// lazy-loaded
const ProfileComponent = () => import('./components/ProfileComponent.vue')
const BoardAdmin = () => import('./components/BoardAdminComponent.vue')
const BoardStoryteller = () => import('./components/BoardStorytellerComponent.vue')
const BoardPlayer = () => import('./components/BoardPlayerComponent.vue')

const Characters = () => import('./components/CharactersComponent.vue')
const PlayerCharacters = () => import('./components/PlayerCharactersComponent.vue')
const AipSessions = () => import('./components/AipSessionsComponent.vue')
const AipSession = () => import('./components/AipSessionComponent.vue')
const CharacterVue = () => import('./components/CharacterComponent.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/home',
    component: HomeComponent
  },
  {
    path: '/login',
    component: LoginComponent
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: ProfileComponent
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: BoardAdmin
  },
  {
    path: '/player',
    name: 'player',
    // lazy-loaded
    component: BoardPlayer,
    children: [
      {
        path: 'playerCharacters',
        name: 'playerCharacters',
        // lazy-loaded
        component: PlayerCharacters
      },
      {
        path: 'character/:id',
        name: 'character',
        // lazy-loaded
        component: CharacterVue,
        props: true
      }
    ]
  },
  {
    path: '/storyteller',
    name: 'storyteller',
    // lazy-loaded
    component: BoardStoryteller,
    children: [
      {
        path: 'characters',
        name: 'characters',
        // lazy-loaded
        component: Characters
      },
      {
        path: 'sessions',
        name: 'sessions',
        // lazy-loaded
        component: AipSessions
      },
      {
        path: 'sessions/:id',
        name: 'session',
        // lazy-loaded
        component: AipSession,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/home']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
