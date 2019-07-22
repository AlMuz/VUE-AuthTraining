import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
  },
  mutations: {

  },
  actions: {
    signup({ commit }, payload) {

      axios.post('accounts:signUp?key=AIzaSyCaBZzde1-B1upFVZQgUx4hyuP6tOVwalw', {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },
    signin({ commit }, payload) {

      axios.post('accounts:signInWithPassword?key=AIzaSyCaBZzde1-B1upFVZQgUx4hyuP6tOVwalw', {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  },
  getters: {

  }
})
