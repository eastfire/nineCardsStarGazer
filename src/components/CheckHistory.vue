<template>
  <div class="my-column">
    <a-button @click="emit('back')">&lt;返回</a-button>
    <div class="my-column history-list">
      <span class="my-row" v-for="(item, index) in histroy" :key="index">
        <div>{{ players[item.playerIndex] }}</div>问<div>{{ players[item.askingPlayerIndex] }}</div>看到几个
        <img class="symbol-card" :src="IMAGE_MAP[item.askingSymbol]" />
        答：{{ item.resultCount }}个
      </span>
    </div>
  </div>
</div></template>

<script setup>
import { Button } from 'ant-design-vue'
import { IMAGE_MAP } from './utils.js'

defineEmits(['back'])
defineProps(['history', 'players'])

</script>

<style scoped>
.history-list {
  overflow: auto;
  row-gap: 8px;
}
</style>
