import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/signup.vue'
import SignUpEnt from '../views/signupEnt.vue'
import Main from '../views/main.vue'
import MainEnt from '../views/mainEnt.vue'

Vue.use(VueRouter)

const requireAuth = () => (from, to, next) => {
  if (localStorage.accessToken === 'null' && (from.name === 'main' || from.name === 'mainEnt')) {
    console.log('aa')
    return next('/')
  } else if (localStorage.user === 'seller' && (from.name === 'mainEnt' || from.name === 'Login')) {
    console.log('bb')
    return next('/main')
  } else if (localStorage.user === 'enterprise' && (from.name === 'main' || from.name === 'Login')) {
    console.log('cc')
    return next('/mainEnt')
  } else {
    return next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    props: true,
    beforeEnter: requireAuth()
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
