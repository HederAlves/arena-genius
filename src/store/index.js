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
      flashColor: null,
      audioSources: {
        '#00FF00': "../../public/green.mp3",
        '#ff0000': "../../public/red.mp3",
        '#FFFF00': "../../public/yellow.mp3",
        '#00BFFF': "../../public/blue.mp3"
      },
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
