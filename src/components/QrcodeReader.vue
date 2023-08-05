<template>
  <div>
    <qrcode-stream :track="paintOutline" @init="logErrors" @decode="onDecode" />
  </div>
</template>

<script setup>
import { QrcodeStream } from "vue-qrcode-reader"

const paintOutline = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}

const onDecode = (url) => {
  console.log('get url', url)
}

function logErrors(promise) {
  promise.catch(console.error)
}

</script>

<style scoped></style>