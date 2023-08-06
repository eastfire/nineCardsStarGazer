<template>
  <div class="my-column" v-if="state === 'showing-card'">
    <div class="player-name">当前玩家：{{ players[playerIndex] }}</div>
    <div class="which-player">询问哪个玩家？</div>
    
    <div class="which-symbol">观察到哪个星体的数量？</div>

    <a-button class="confirm-ask">确定询问</a-button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Button } from 'ant-design-vue'

import sunImg from "../assets/images/sun.png"
import moonImg from "../assets/images/moon.png"
import starImg from "../assets/images/star.png"
import earthImg from "../assets/images/earth.png"
import saturnImg from "../assets/images/saturn.png"
import galaxyImg from "../assets/images/galaxy.png"

const IMAGE_MAP = {
  sun: sunImg,
  moon: moonImg,
  star: starImg,
  earth: earthImg,
  saturn: saturnImg,
  galaxy: galaxyImg,
}

const props = defineProps(['players', 'playerHands'])

const playerIndex = ref(0)
const state = ref('before-ask')

const onNextPlayer = () => {
  
}
</script>

<style scoped>
.player-name {
  margin-bottom: 24px;
}


</style>
