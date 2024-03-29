import { createStore } from 'vuex'

export default createStore({
  state: {
    gameData: {
      ButtonName: ['red', 'blue', 'green', 'yellow'],
      colors: ['#ff0000', '#00BFFF', '#00FF00', '#FFFF00'],
      colorsInitials: ['#8d0202', '#031e83', '#088901', '#b7bb00'],
      sequence: [],
      playerSequence: [],
      round: 0,
      isGameRunning: false,
      flashColor: null
    }
  },
  mutations: {
    updateGameData(state, payload) {
      state.gameData = { ...state.gameData, ...payload };
    }
  },
  actions: {
    updateGameData({ commit }, payload) {
      commit('updateGameData', payload);
    }
  },
  getters: {},
  modules: {}
})
