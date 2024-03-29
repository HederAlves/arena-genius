import { createStore } from 'vuex'

export default createStore({
  state: {
    gameData: {
      ButtonName: ['green', 'red', 'yellow', 'blue'],
      colors: ['#00FF00', '#ff0000', '#FFFF00', '#00BFFF'],
      colorsInitials: ['#088901', '#8d0202', '#b7bb00', '#031e83'],
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
