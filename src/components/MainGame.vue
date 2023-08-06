<template>
  <div class="my-column wrapper align-items-center">
    <div class="my-column ask-about">
      <div class="player-name">当前玩家：{{ players[playerIndex] }}</div>
      <a-button @click="checkHistory" v-if="state === 'before-ask'">查看历史提问</a-button>
    </div>
    <div class="my-column ask-about">
      <div class="which-player">询问哪个玩家？</div>
      <a-radio-group v-model:value="askingPlayerIndex" button-style="solid" class="count-select"
        :disabled="state !== 'before-ask'">
        <a-radio-button v-for='index in canAskPlayers' :key="index" :value="index"
          :disabled="recentAskMap[playerIndex] === index">
          {{ players[index] }}
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="my-column ask-about">
      <div class="which-symbol">观察到哪个星体的数量？</div>
      <a-radio-group v-model:value="askingSymbol" button-style="solid" class="count-select"
        :disabled="state !== 'before-ask'">
        <a-radio-button v-for="symbol in ['sun', 'moon', 'star', 'earth', 'saturn', 'galaxy']" :key="symbol"
          :value="symbol" class="symbol-button">
          <img class="symbol-card" :src="IMAGE_MAP[symbol]" />
        </a-radio-button>
      </a-radio-group>
    </div>
    <div v-if="state === 'after-ask'" class="result-count">看到{{ resultCount }}个</div>
    <a-button class="confirm-ask" @click="onConfirmAsk" v-if="state === 'before-ask'"
      :disabled="askingPlayerIndex === -1 || askingSymbol === ''">确定询问</a-button>
    <a-button class="confirm-ask" @click="onNextPlayer" v-if="state === 'after-ask'">下一个玩家{{ players[askingPlayerIndex]
    }}</a-button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { RadioGroup, RadioButton, Button } from 'ant-design-vue'
import { IMAGE_MAP } from './utils.js'

const props = defineProps(['players', 'playerHands'])
const playerIndex = ref(0)
const recentAskMap = ref({})
const history = ref({})
const canAskPlayers = computed(() => {
  const indexList = []
  for (let i = 0; i < props.players.length; i++) {
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
  history.value.push({ playerIndex: playerIndex.value, askingPlayerIndex: askingPlayerIndex.value, askingSymbol: askingSymbol.value, resultCount: resultCount.value })
  state.value = 'before-ask'
  playerIndex.value = askingPlayerIndex.value;
  askingPlayerIndex.value = -1
  askingSymbol.value = ''
}

const onConfirmAsk = () => {
  state.value = 'after-ask'
  recentAskMap.value[playerIndex.value] = askingPlayerIndex.value;
}

const checkHistory = () => {
  state.value = 'check-history'
}

const resultCount = computed(() => {
  if (state.value === 'after-ask' && askingPlayerIndex.value !== -1) {
    const symbol = askingSymbol.value;
    let count = 0;

    for (let i = 0; i < props.players.length; i++) {
      if (i === askingPlayerIndex.value) {
        if (props.playerHands[i].left.front === symbol) {
          count++;
        }
        if (props.playerHands[i].right.front === symbol) {
          count++;
        }
      } else {
        if (props.playerHands[i].left.back === symbol) {
          count++;
        }
        if (props.playerHands[i].right.back === symbol) {
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
  width: 100%;
  height: 100%;
}

.player-name {
  margin-bottom: 24px;
}

.ask-about {
  row-gap: 8px;
}

.symbol-button {
  width: 50px;
  height: 72px;
  padding: 8px 4px 8px 4px;
}

.symbol-card {
  width: 42px;
}

.result-count {
  font-size: 48px;
  font-weight: bolder;
}
</style>
