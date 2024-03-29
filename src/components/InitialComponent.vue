<template>
  <main class="container-control">
    <button class="control-button" v-for="(name, index) in ButtonName" :key="index"
      @click="handleButtonClick(colors[index])"
      :style="{ backgroundColor: flashColor === colors[index] ? colors[index] : colorsInitials[index] }">
      {{ name }}
    </button>
    <button @click="startGame" v-if="!isGameRunning">Start Game</button>
  </main>
</template>

<script>
export default {
  data() {
    return {
      ButtonName: ['red', 'blue', 'green', 'yellow'],
      colors: ['#ff0000', '#00BFFF', '#00FF00', '#FFFF00'],
      colorsInitials: ['#8d0202', '#031e83', '#088901', '#b7bb00'],
      sequence: [],
      playerSequence: [],
      round: 0,
      isGameRunning: false,
      flashColor: null
    };
  },
  methods: {
    startGame() {
      this.isGameRunning = true;
      this.round = 1;
      this.playRound();
    },
    playRound() {
      this.sequence.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
      this.playSequence();
    },
    playSequence() {
      let index = 0;
      const intervalId = setInterval(() => {
        this.blinkButton(this.sequence[index]);
        index++;
        if (index >= this.sequence.length) {
          clearInterval(intervalId);

          setTimeout(() => {
            this.flashColor = null;
          }, 500);
        }
      }, 1000);
    },
    blinkButton(color) {
      this.flashColor = color;
      setTimeout(() => {
        this.flashColor = null;
      }, 500);
    },
    handleButtonClick(color) {
      if (!this.isGameRunning) return;

      this.playerSequence.push(color);
      const index = this.playerSequence.length - 1;
      if (color !== this.sequence[index]) {
        alert('Game Over!');
        this.resetGame();
        return;
      }

      if (this.playerSequence.length === this.sequence.length) {
        this.playerSequence = [];
        this.round++;
        setTimeout(() => {
          this.playRound();
        }, 1000);
      }
    },
    resetGame() {
      this.sequence = [];
      this.playerSequence = [];
      this.round = 0;
      this.isGameRunning = false;
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
