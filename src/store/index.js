import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import mutations from './mutations'

Vue.use(Vuex)

const state = {
  favorites: []
}

export default new Vuex.Store({
  state,
  mutations,

  plugins: [createPersistedState()]
})
