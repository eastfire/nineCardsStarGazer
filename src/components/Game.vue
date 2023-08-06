<template>
  <GameSetup v-if="state === 'setup'" @start-game="onStartGame" />
  <InfoScan v-if="state === 'info-scan'" :players="players" @start-play="onStartPlay" />
  <MainGame vi-if="main-game" :players="players" :playerHands="playerHands" />
</template>

<script setup>
import GameSetup from './GameSetup.vue'
import InfoScan from './InfoScan.vue'
import MainGame from './MainGame.vue'
import { ref } from "vue"

const state = ref("setup")
const players = ref([])
const playerHands = ref([])

const onStartGame = (p) => {
  state.value = 'info-scan'
  players.value = p.value;
}

const onStartPlay = (hands) => {
  state.value = 'main-game';
  playerHands.value = hands.value
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
