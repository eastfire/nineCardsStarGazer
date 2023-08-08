<template>
  <div class="my-column">
    <div class="player-name">请输入自己的手牌</div>
    <div class="my-row cards">
      <CardInput v-model="playerHands[0].left" />
      <CardInput v-model="playerHands[0].right" />
    </div>
    <div class="my-column player-list">
      <div v-for="(_value, index) of (new Array(players.length - 1))" :key="index" class="my-column">
        <span class="my-row no-wrap align-items-center hint">请输入{{ players[index + 1] }}的手牌背面</span>
        <span class="my-row cards">
          <CardInput v-model="playerHands[index + 1].left" />
          <CardInput v-model="playerHands[index + 1].right" />
        </span>
      </div>
    </div>
    <a-button @click="onStartPlay" :disabled="playerHands.some(hand => hand.left === null || hand.right === null)">
      开始游戏
    </a-button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Button } from 'ant-design-vue'
import CardInput from "./CardInput.vue"

const props = defineProps(['players'])
const emit = defineEmits(['startPlay'])

const scaningPosition = ref('')

const playerHands = ref((new Array(props.players.length).fill(1)).map(_i => ({
  left: null, right: null
})))

const onStartPlay = () => {
  emit('startPlay', playerHands);
}
</script>

<style scoped>

.cards {
  column-gap: 24px;
  margin-bottom: 40px;
}

.card-image {
  width: 100%;
  height: 100%;
}

.card-border {
  width: 60px;
  height: 80px;
  border-radius: 24px;
  border: 1px dotted black;
  justify-content: center;
  overflow: hidden;
}

.card-border.scaned {
  border: 1px dash black;
}
</style>
