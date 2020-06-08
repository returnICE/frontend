import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/signup.vue'
import SignUpEnt from '../views/signupEnt.vue'
import Main from '../views/main.vue'
import MainEnt from '../views/mainEnt.vue'

Vue.use(VueRouter)

const requireAuth = () => (from, to, next) => {
  return next()
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    props: true
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signUpEnt',
    name: 'SignUp',
    component: SignUpEnt
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    beforeEnter: requireAuth()
  },
  {
    path: '/mainEnt',
    name: 'mainEnt',
    component: MainEnt,
    beforeEnter: requireAuth()
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
