<template>
  <main class="container-control">
    <button class="control-button" v-for="(name, index) in gameData.ButtonName" :key="index"
      @click="handleButtonClick(gameData.colors[index])"
      :style="{ backgroundColor: gameData.flashColor === gameData.colors[index] ? gameData.colors[index] : gameData.colorsInitials[index] }">
      {{ name }}
    </button>
    <button @click="startGame" v-if="!gameData.isGameRunning">Start Game</button>
  </main>
</template>

<script>
export default {
  computed: {
    gameData() {
      return this.$store.state.gameData;
    }
  },
  methods: {
    startGame() {
      const updatedData = { isGameRunning: true, round: 1 };
      this.$store.dispatch('updateGameData', updatedData);
      this.playRound();
    },
    playRound() {
      const updatedData = { sequence: [...this.gameData.sequence, this.gameData.colors[Math.floor(Math.random() * this.gameData.colors.length)]] };
      this.$store.dispatch('updateGameData', updatedData);
      this.playSequence();
    },
    playSequence() {
      let index = 0;

      const playNext = () => {
        const color = this.gameData.sequence[index];
        const updatedData = { flashColor: color };
        this.$store.dispatch('updateGameData', updatedData);

        setTimeout(() => {
          const updatedData = { flashColor: null };
          this.$store.dispatch('updateGameData', updatedData);

          index++;

          if (index < this.gameData.sequence.length) {
            setTimeout(playNext, 500);
          }
        }, 500);
      };

      playNext();
    },
    handleButtonClick(color) {
      if (!this.gameData.isGameRunning) return;

      const index = this.gameData.playerSequence.length;
      const correctColor = this.gameData.sequence[index];
      const updatedData = { playerSequence: [...this.gameData.playerSequence, color] };
      this.$store.dispatch('updateGameData', updatedData);

      if (color !== correctColor) {
        alert('Game Over!');
        this.resetGame();
        return;
      }

      if (this.gameData.playerSequence.length === this.gameData.sequence.length) {
        const updatedData = { playerSequence: [], round: this.gameData.round + 1 };
        this.$store.dispatch('updateGameData', updatedData);
        setTimeout(() => {
          this.playRound();
        }, 1000);
      }
    },
    resetGame() {
      const updatedData = { sequence: [], playerSequence: [], round: 0, isGameRunning: false };
      this.$store.dispatch('updateGameData', updatedData);
    }
  }
};
</script>

<style scoped>
.container-control {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  height: 35rem;
}

.control-button {
  color: #FFFFFF;
  padding: 5px;
}
</style>
