<template>
  <div>
    <div class="panel">
      <BaseButton :buttonText='"Start Game"' @click="startGame">{{ gameData.isGameRunning ? 'Restart Game' : 'Start Game'
        }}</BaseButton>
      <BaseRules />
    </div>
    <main class="layout">
      <section class="container-control">
        <button class="control-button" v-for="(color, index) in gameData.colors" :key="index"
          @click="handleButtonClick(color, gameData.buttonName[index])" :style="buttonStyle(index)"
          :class="{ 'highlight': isHighlighted(index) }">
        </button>
      </section>
    </main>
  
    <BaseModal :showModal="gameOverModal.show" :titleModal="'Game Over'" :textModal="'Your Score:'"
      :content="(sequenceLength() - 1).toString()" @close="closeGameOverModal" />
  </div>
</template>

<script>
import BaseRules from "../atoms/BaseRules.vue";
import BaseModal from "../molecules/BaseModal.vue";
import BaseButton from "../atoms/BaseButton.vue";

export default {
  name: "VideoGame",
  components: {
    BaseRules,
    BaseModal,
    BaseButton
  },
  data() {
    return {
      selectedColorIndex: null,
      highlightedIndex: null,
      gameOverModal: {
        show: false,
        sequenceLength: 0
      }
    };
  },
  computed: {
    gameData() {
      return this.$store.state.gameData;
    }
  },
  methods: {
    startGame() {
      if (this.gameData.isGameRunning) {
        this.resetGame();
      }
      const updatedData = { isGameRunning: true, round: 1 };
      this.updateGameData(updatedData);
      this.playRound();
    },
    playRound() {
      const colorIndex = Math.floor(Math.random() * this.gameData.colors.length);
      const updatedData = { sequence: [...this.gameData.sequence, this.gameData.colors[colorIndex]] };
      this.updateGameData(updatedData);
      this.highlightButton(colorIndex);
      this.playSequence();
    },
    playSequence() {
      let index = 0;

      const playNext = () => {
        const color = this.gameData.sequence[index];
        const colorIndex = this.gameData.colors.indexOf(color);
        const audioName = this.gameData.buttonName[colorIndex];
        this.updateGameData({ flashColor: color });

        const audioElement = new Audio(`/${audioName}.mp3`);
        audioElement.currentTime = 0;
        audioElement.play();

        setTimeout(() => {
          this.updateGameData({ flashColor: null });
          index++;

          if (index < this.gameData.sequence.length) {
            setTimeout(playNext, 500);
          }
        }, 500);
      };


      playNext();
    },

    handleButtonClick(color, name) {
      if (!this.gameData.isGameRunning) return;

      const index = this.gameData.playerSequence.length;
      const correctColor = this.gameData.sequence[index];
      this.updateGameData({ playerSequence: [...this.gameData.playerSequence, color] });
      this.selectedColorIndex = this.gameData.colors.indexOf(color);

      const audioElement = new Audio(`/${name}.mp3`);
      audioElement.currentTime = 0;
      audioElement.play();

      if (color !== correctColor) {
        this.showGameOverModal();
        return;
      }

      if (this.gameData.playerSequence.length === this.gameData.sequence.length) {
        this.updateGameData({ playerSequence: [], round: this.gameData.round + 1 });
        setTimeout(() => {
          this.playRound();
        }, 1000);
      }
      setTimeout(() => {
        this.selectedColorIndex = null;
      }, 500);
    },
    resetGame() {
      const updatedData = { sequence: [], playerSequence: [], round: 0, isGameRunning: false };
      this.updateGameData(updatedData);
      this.selectedColorIndex = null;
      this.highlightedIndex = null;
    },
    buttonStyle(index) {
      const color = this.gameData.colors[index];
      const initialColor = this.gameData.colorsInitials[index];

      let backgroundColor = initialColor;
      if (this.gameData.flashColor === color || this.selectedColorIndex === index) {
        backgroundColor = color;
      }

      return { backgroundColor };
    },

    updateGameData(payload) {
      this.$store.dispatch('updateGameData', payload);
    },
    showGameOverModal() {
      this.gameOverModal.show = true;
      this.gameOverModal.sequenceLength = this.sequenceLength();
    },
    sequenceLength() {
      return this.gameData.sequence.length;
    },
    highlightButton(index) {
      this.highlightedIndex = index;
    },
    isHighlighted(index) {
      return this.highlightedIndex === index;
    },
    closeGameOverModal() {
      this.gameOverModal.show = false;
    }
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/favicon.png');
  background-size: 150px 150px;
}

.panel {
  padding: 10px;
  position: absolute;
  height: 400px;
  width: 250px;
  background: #000000;
  border-bottom: solid 10px white;
  border-right: solid 10px white;
  box-shadow: 0px 10px 10px 10px black;
}

.container-control {
  border: solid 10px white;
  border-radius: 100%;
  width: 49vw;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 6vh;
  background: #000000;
  box-shadow: 0px 10px 10px 10px black;
}

.control-button {
  color: #FFFFFF;
  width: 18vw;
  height: 34vh;
  border-radius: 100%;
  border: solid 2px #FFFFFF;
}

.control-button:hover {
  cursor: grab;
}
</style>
