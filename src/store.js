import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth';
import globalAxios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    storeUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    signup({ commit, dispatch }, payload) {

      axios.post('accounts:signUp?key=AIzaSyCaBZzde1-B1upFVZQgUx4hyuP6tOVwalw', {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
        .then(res => {
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch('storeUser', payload);
        })
        .catch(error => console.log(error));
    },
    signin({ commit }, payload) {

      axios.post('accounts:signInWithPassword?key=AIzaSyCaBZzde1-B1upFVZQgUx4hyuP6tOVwalw', {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
        .then(res => {
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
        })
        .catch(error => console.log(error))
    },
    storeUser({ commit, state }, payload) {

      if (!state.idToken) {
        return;
      }

      globalAxios.post('/users.json' + '?auth=' + state.idToken, payload)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser({ commit, state }, payload) {
      if (!state.idToken) {
        return;
      }

      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          commit('storeUser', users[0])
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuth(state) {
      return state.idToken !== null;
    }
  }
})
