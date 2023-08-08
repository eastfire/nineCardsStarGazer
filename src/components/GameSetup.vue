<template>
  <div class="my-column" v-if="!showRuleSetting">
    <a-radio-group v-model:value="playerCount" button-style="solid" class="count-select">
      <a-radio-button :value="3">3人游戏</a-radio-button>
      <a-radio-button :value="4">4人游戏</a-radio-button>
    </a-radio-group>
    <div>请按顺时针输入玩家信息</div>
    <div class="my-column player-list">
      <span class="my-row justify-center"><span>我</span></span>
      <span v-for="(_value, index) of (new Array(playerCount - 1))" :key="index" class="my-row">
        <span class="my-row no-wrap align-items-center hint">左起玩家{{ index + 1 }}</span>
        <a-input v-model:value="players[index + 1]" />
      </span>
    </div>
    <a-button @click="showRuleSetting = true" class="rule-setting">进阶规则</a-button>
    <a-button @click="onStart" class="start-game">开始准备游戏</a-button>
  </div>
  <RuleSetting v-if="showRuleSetting" @setRule="onChangeRule" :ruleMap="ruleMap" />
</template>

<script setup>
import { RadioGroup, RadioButton, Input, Button } from 'ant-design-vue'
import { ref, defineEmits, watch } from 'vue'
import RuleSetting from './RuleSetting.vue'

const playerCount = ref(3)
const players = ref(['我', '左手边玩家', '右手边玩家'])
const ruleMap = ref({})
const showRuleSetting = ref(false)

watch(playerCount, (newValue) => {
  if (newValue === 3) {
    players.value = ['我', players.value[1], players.value[3]]
  } else {
    players.value = ['我', players.value[1], '对面玩家', players.value[2]]
  }
})

const emit = defineEmits(['startGame'])

const onStart = () => {
  players.value = players.value.slice(0, playerCount.value)
  emit('startGame', players, ruleMap)
}

const onChangeRule = (rules) => {
  console.log(11111111111, rules)
  showRuleSetting.value = false;
  ruleMap.value = rules
}

</script>

<style scoped>
.count-select {
  margin-bottom: 32px;
}

.player-list {
  margin-top: 32px;
  row-gap: 16px;
}

.hint {
  word-break: keep-all;
  margin-right: 8px;
}

.player-name-input {
  display: flex;
  flex-direction: row;
}

.rule-setting {
  margin-top: 54px;
}

.start-game {
  margin-top: 54px;
}
</style>