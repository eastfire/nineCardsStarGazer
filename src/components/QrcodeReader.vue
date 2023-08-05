<template>
  <div>
    <qrcode-stream :track="selected.value" @init="logErrors" />
  </div>
</template>

<script setup>
import { QrcodeStream } from "vue-qrcode-reader"


</script>

<style scoped>

</style>