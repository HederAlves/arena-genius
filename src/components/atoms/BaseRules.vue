<template>
  <section class="rules-section">
    <h1>Como Jogar</h1>
    <ul>
      <li>1ª- Aperte o botão start game e aguarde acender algum dos botões</li>
    </ul>
    <ul>
      <li>2ª- Aparte o botão que acendeu e aguarde a nova sequência</li>
    </ul>
    <ul>
      <li>3ª- Cada rodada vai ser adicionado uma nova cor aumentando a sequência </li>
    </ul>
    <ul>
      <li>4ª- Você pode reiniciar o jogo a qualquer momento clicando em start game</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "BaseRules",
};
</script>

<style scoped>
.rules-section {
  color: white;
}

.rules-section h1 {
  margin: 10px 0px;
}

.rules-section ul {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10vh;
}
</style>