<template>
  <div class="my-column wrapper align-items-center">
    <div class="my-column ask-about">
      <div class="player-name">谁在问我：</div>
      <a-radio-group v-model:value="askingPlayerIndex" button-style="solid" class="count-select"
        :disabled="state !== 'before-ask'">
        <a-radio-button v-for='index in canAskPlayers' :key="index" :value="index">
          {{ players[index] }}
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="my-column ask-about">
      <div class="which-symbol">询问哪个星体的数量？</div>
      <a-radio-group v-model:value="askingSymbol" button-style="solid" class="count-select"
        :disabled="state !== 'before-ask'">
        <a-radio-button v-for="symbol in ['sun', 'moon', 'star', 'earth', 'saturn', 'galaxy']" :key="symbol"
          :value="symbol" class="symbol-button">
          <img class="symbol-card" :src="IMAGE_MAP[symbol]" />
        </a-radio-button>
      </a-radio-group>
    </div>
    <a-button class="confirm-ask" @click="onConfirmAsk" v-if="state === 'before-ask'"
      :disabled="askingPlayerIndex === -1 || askingSymbol === ''">确定询问</a-button>
    <a-button class="confirm-ask" @click="onAfterAsk" v-if="state === 'after-ask'">确定</a-button>
    <div v-if="state === 'after-ask'" class="result-count">回答{{ resultCount }}个</div>
    <div v-if="state === 'after-ask'" class="my-column result-reason">
      <div v-for="(reason, index) in reasons" :key="index">
        {{ reason }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { RadioGroup, RadioButton, Button } from 'ant-design-vue'
import { IMAGE_MAP, SYMBOL_MAP, RULE_CHECK_MAP } from './utils.js'

const props = defineProps(['players', 'playerHands', 'ruleMap'])
const playerIndex = ref(0)
const reasons = ref([])
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

const onConfirmAsk = () => {
  state.value = 'after-ask'
}

const onAfterAsk = () => {
  state.value = 'before-ask'
}

const resultCount = computed(() => {
  const askingPlayer = askingPlayerIndex.value
  if (state.value === 'after-ask') {
    const symbol = askingSymbol.value;
    let count = 0;

    for (let i = 0; i < props.players.length; i++) {
      if (props.playerHands[i].left === symbol) {
        count++;
      }
      if (props.playerHands[i].right === symbol) {
        count++;
      }
    }

    const r = [`牌面上看到了${count}个` + SYMBOL_MAP[symbol]]
    let lie = 0;

    Object.entries(RULE_CHECK_MAP).forEach(([key, rule]) => {
      if (key !== symbol) {
        const result = rule(askingPlayer, props.players, props.playerHands, symbol)
        if (result) {
          count += result.adjust;
          if (result.lie) {
            lie = result.lie
          }
          r.push(result.reason)
        }
      }
    })

    if (r.length > 1) {
      reasons.value = r;
    } else {
      reasons.value = []
    }

    if (lie) {
      if (lie < 0) {
        return `${count + lie}~${count}`
      } else {
        return `${count}~${count + lie}`
      }
    }

    return count;
  }
  return '';
})
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  row-gap: 16px;
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
