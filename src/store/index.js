import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const enhanceAccessToeken = () => {
  const accessToken = localStorage.accessToken
  if (!accessToken) return
  axios.defaults.headers.common['x-access-token'] = `${accessToken}`
}
enhanceAccessToeken()

console.log(process)
if (process.env.NODE_ENV !== 'development') {
  axios.defaults.baseURL = 'http://ec2-3-34-136-60.ap-northeast-2.compute.amazonaws.com:3000/'
}
export default new Vuex.Store({
  state: {
    accessToken: null
  },
  mutations: {
    LOGIN (state, accessToken) {
      state.accessToken = accessToken
      localStorage.accessToken = accessToken
    },
    LOGOUT (state) {
      state.accessToken = null
    }
  },
  actions: {
    LOGIN ({ commit }, { id, pw, type }) {
      return type === 'seller'
        ? axios.post('/api/sellers/login', { sellerId: id, pw: pw })
          .then(({ data }) => {
            if (data.success === true) {
              commit('LOGIN', data.data)
              axios.defaults.headers.common['x-access-token'] = data.data
              localStorage.accessToken = data.data
              window.location.href = '/Main'
            } else {
              alert(data.err)
            }
          })
        : axios.post('/api/enterprises/login', { enterpriseId: id, pw: pw })
          .then(({ data }) => {
            if (data.success === true) {
              commit('LOGIN', data.data)
              axios.defaults.headers.common['x-access-token'] = data.data
              localStorage.accessToken = data.data
              window.location.href = '/MainEnt'
            } else {
              alert(data.err)
            }
          })
    },
    LOGOUT ({ commit }) {
      commit('LOGOUT')
    }
  },
  modules: {
  }
})
