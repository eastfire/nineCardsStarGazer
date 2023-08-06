<template>
  <div class="my-column" v-if="state === 'showing-card'">
    <div class="player-name">当前玩家：{{ players[playerIndex] }}</div>
    <div class="my-row cards">
      <div class='card-border my-row align-items-center' v-if="playerHands[playerIndex].left === null"
        @click="scanCard('left')">
        请扫描左边的牌
      </div>
      <div class='card-border scaned' v-else @click="scanCard('left')">
        <img :src="IMAGE_MAP[playerHands[playerIndex].left.front]" class="card-image">
      </div>
      <div class='card-border my-row align-items-center' v-if="playerHands[playerIndex].right === null"
        @click="scanCard('right')">
        请扫描右边的牌
      </div>
      <div class='card-border scaned' v-else @click="scanCard('right')">
        <img :src="IMAGE_MAP[playerHands[playerIndex].right.front]" class="card-image">
      </div>
    </div>
    <a-button @click="onNext"
      :disabled="playerHands[playerIndex].left === null || playerHands[playerIndex].right === null">
      {{ playerIndex === players.length - 1 ? '开始游戏' : '下一个玩家' }}
    </a-button>
  </div>
  <QrcodeReader v-if="state === 'scanning'" @scaned="onScaned" @cancel="onCancelScan" />
</template>

<script setup>
import { ref } from "vue"
import { Button } from 'ant-design-vue'
import QrcodeReader from "./QrcodeReader.vue"

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

const props = defineProps(['players'])
const emit = defineEmits(['startPlay'])

const playerIndex = ref(0)
const state = ref('showing-card')
const scaningPosition = ref('')

const playerHands = ref([{
  left: { front: 'sun', back: 'star' }, right: { front: 'sun', back: 'moon' }
}, {
  left: { front: 'moon', back: 'saturn' }, right: { front: 'saturn', back: 'star' }
}, {
  left: { front: 'moon', back: 'galaxy' }, right: { front: 'saturn', back: 'earth' }
}, {
  left: { front: 'earth', back: 'galaxy' }, right: { front: 'star', back: 'galaxy' }
}])
// const playerHands = ref([{
//   left: null, right: null
// }, {
//   left: null, right: null
// }, {
//   left: null, right: null
// }, {
//   left: null, right: null
// }])

const scanCard = (position) => {
  scaningPosition.value = position;
  state.value = 'scanning';
}

const onScaned = (cardInfo) => {
  playerHands.value[playerIndex.value][scaningPosition.value] = cardInfo;
  state.value = 'showing-card'
}

const onCancelScan = () => {
  state.value = 'showing-card'
}

const onNext = () => {
  if (playerIndex.value === props.players.length - 1) {
    //last player
    emit('startPlay', playerHands);
  } else {
    playerIndex.value++
  }
}
</script>

<style scoped>
.player-name {
  margin-bottom: 24px;
}

.cards {
  column-gap: 24px;
  margin-bottom: 40px;
}

.card-image {
  width: 100%;
  height: 100%;
}

.card-border {
  width: 120px;
  height: 160px;
  border-radius: 24px;
  border: 1px dotted black;
  justify-content: center;
  overflow: hidden;
}

.card-border.scaned {
  border: 1px dash black;
}
</style>
