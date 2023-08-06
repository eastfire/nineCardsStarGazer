<template>
  <GameSetup v-if="state === 'setup'" @start-game="onStartGame" />
  <InfoScan v-if="state === 'info-scan'" :players="players" />
</template>

<script setup>
import GameSetup from './GameSetup.vue'
import InfoScan from './InfoScan.vue'
import { ref } from "vue"

const state = ref("setup")
const players = ref([])

const onStartGame = (p) => {
  state.value = 'info-scan'
  players.value = p.value;
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
