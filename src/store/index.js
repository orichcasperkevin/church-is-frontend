import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
state: {
    member_list_version: 0
},
mutations: {
    incrementCounter(state, payload) {
        state.member_list_version += payload
    }
},
actions: {
    incrementAction (context, payload) {
      context.commit('incrementCounter', payload)
    }
},
getters: {
    member_list_version (state) {
      return state.member_list_version
    }
}
})