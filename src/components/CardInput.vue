<template>
  <a-popover v-model:open="visible" title="Title" trigger="click">
    <template #content>
      <a-radio-group v-model:value="value" button-style="solid" class="count-select">
        <a-radio-button v-for="symbol in ['sun', 'moon', 'star', 'earth', 'saturn', 'galaxy']" :key="symbol"
          :value="symbol" class="symbol-button">
          <img class="symbol-card" :src="IMAGE_MAP[symbol]" />
        </a-radio-button>
      </a-radio-group>
    </template>
    <div class="card-border">
      <img class='card-image' :src="IMAGE_MAP[value]" />
    </div>
  </a-popover>
</template>

<script setup>
import { Popover, RadioGroup, RadioButton, } from "ant-design-vue"
import { IMAGE_MAP } from './utils.js'
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: 'string'
})
const emit = defineEmits(["update:modelValue"])

const visible = ref(false)

const value = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    visible.value = false;
    emit("update:modelValue", v)
  }
})

</script>

<style scoped>
.card-image {
  width: 100%;
  height: 100%;
}

.card-border {
  width: 60px;
  height: 80px;
  border-radius: 6px;
  border: 1px dotted black;
  justify-content: center;
  overflow: hidden;
}

.symbol-button {
  width: 50px;
  height: 72px;
  padding: 8px 4px 8px 4px;
}

.symbol-card {
  width: 42px;
}
</style>