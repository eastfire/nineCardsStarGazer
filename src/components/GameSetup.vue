<template>
  <div>
    <a-radio-group v-model:value="playerCount" button-style="solid" class="count-select">
      <a-radio-button :value="3">3人游戏</a-radio-button>
      <a-radio-button :value="4">4人游戏</a-radio-button>
    </a-radio-group>
    <div class="my-column player-list">
      <span v-for="(_value, index) of (new Array(playerCount))" :key="index" class="my-row">
        <span class="my-row no-wrap align-items-center hint">玩家{{ index + 1 }}</span>
        <a-input v-model:value="players[index]" />
      </span>
    </div>
    <a-button @click="onStart" class="start-game">开始准备游戏</a-button>
  </div>
</template>

<script setup>
import { RadioGroup, RadioButton, Input, Button } from 'ant-design-vue'
import { ref, defineEmits } from 'vue'

const playerCount = ref(3)
const players = ref(['玩家1', '玩家2', '玩家3', '玩家4'])

const emit = defineEmits(['startGame'])

const onStart = () => {
  console.log(123, players.value)
  emit('startGame', players)
}

</script>

<style scoped>
.count-select {
  margin-bottom: 32px;
}

.player-list {
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


.start-game {
  margin-top: 108px;
}
</style>