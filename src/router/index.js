import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/signup.vue'
import Main from '../views/main.vue'

Vue.use(VueRouter)

const requireAuth = () => (from, to, next) => {
  return next()
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    beforeEnter: requireAuth()
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
