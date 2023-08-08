<template>
  <div class="my-column rule-list">
    <div class="my-row align-items-center" v-for="rule in RULES" :key="rule.name">
      <a-switch v-model:checked="rules[rule.name]" />
      <div class="my-column rule-detail">
        <div>如果问的不是{{ SYMBOL_MAP[rule.name] }}</div>
        <div class="rule-description">{{ rule.description }}</div>
      </div>
    </div>
    <a-button @click="onBack">确定</a-button>
  </div>
</template>

<script setup>
import { Button, Switch } from 'ant-design-vue'
import { IMAGE_MAP, SYMBOL_MAP } from "./utils.js"
import { ref, defineEmits } from "vue"

const RULES = [
  { name: 'star', description: '看到几个⭐，将回答的总数加几' },
  { name: 'sun', description: '如果发问者的图标有🌞，将回答的总数+1' },
  { name: 'moon', description: '回答者如果看到左右两边相邻玩家的图标有且仅有1个🌜，将回答的数+1' },
  { name: 'earth', description: '如果回答者玩家手中有🌍，可以选择将回答的总数-1' },
  { name: 'saturn', description: '🪐视为与玩家手中另一张牌的符号相同(无论是回答者自己，还是回答者看其他玩家时)' },
  { name: 'galaxy', description: '如果看到奇数个🌌，将回答的总数+1' },
]

const props = defineProps(['ruleMap'])

const emit = defineEmits(['setRule'])

const rules = ref(props.ruleMap)

const onBack = () => {
  emit('setRule', rules.value)
}

</script>

<style scoped>
.rule-list {
  row-gap: 12px;
  overflow: auto;
}

.symbol-card {
  width: 32px;
  margin-left: 8px
}

.rule-detail {
  margin-left: 8px;
}
</style>