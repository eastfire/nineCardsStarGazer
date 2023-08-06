<template>
  <div class="my-column wrapper" v-if="state === 'showing-card'">
    <div class="player-name">当前玩家：{{ players[playerIndex] }}</div>
    <div class="which-player">询问哪个玩家？</div>
    <a-radio-group v-model:value="askingPlayerIndex" button-style="solid" class="count-select">
      <a-radio-button v-for='index in canAskPlayers' :key="index" :value="index">
        {{ players[index] }}
      </a-radio-button>
    </a-radio-group>
    <div class="which-symbol">观察到哪个星体的数量？</div>
    <a-radio-group v-model:value="askingSymbol" button-style="solid" class="count-select">
      <a-radio-button v-for="symbol in ['sun', 'moon', 'star', 'earth']" :key="symbol" :value="symbol">
        <img class="symbol-card" :src="IMAGE_MAP[symbol]" />
      </a-radio-button>
    </a-radio-group>
    <div v-if="state === 'after-ask'" class="result-count">看到{{ resultCount }}个</div>
    <a-button class="confirm-ask" @click="onConfirmAsk" v-if="state === 'before-ask'">确定询问</a-button>
    <a-button class="confirm-ask" @click="onNextPlayer" v-if="state === 'after-ask'">下一个玩家{{ players[askingPlayerIndex]
    }}</a-button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { RadioGroup, RadioButton, Button } from 'ant-design-vue'

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
const canAskPlayers = computed(() => {
  const indexList = []
  for (let i = 0; i < props.players.lenth; i++) {
    if (i !== playerIndex.value) {
      indexList.push(i)
    }
  }
  return indexList
})
const askingPlayerIndex = ref(-1)
const askingSymbol = ref('')
const state = ref('before-ask')

const onNextPlayer = () => {
  playerIndex.value = askingPlayerIndex.value;
  askingPlayerIndex.value = -1
  askingSymbol.value = ''
}

const onConfirmAsk = () => {
  state.value = 'after-ask'
}

const resultCount = computed(() => {
  if (state.value === 'after-ask' && askingPlayerIndex.value !== -1) {
    const symbol = askingSymbol.value;
    const count = 0;

    for (let i = 0; i < props.players.length; i++) {
      if (i === askingPlayerIndex.value) {
        if (props.playerHands[i].front === symbol) {
          count++;
        }
      } else {
        if (props.playerHands[i].back === symbol) {
          count++;
        }
      }
    }
    return count;
  }
  return -1;
})
</script>

<style scoped>
.wrapper {
  justify-content: space-around;
}

.player-name {
  margin-bottom: 24px;
}

.symbol-card {
  width: 50px;
}

.result-count {
  font-size: 48px;
  font-weight: bolder;
}
</style>
