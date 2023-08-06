<template>
  <div class="wrapper my-column">
    <a-button class="back" @click="onBack">&lt;返回</a-button>
    <qrcode-stream :track="paintBoundingBox" @init="logErrors" @decode="onDecode" :style="{ width: '320px' }" />
  </div>
</template>

<script setup>
import { QrcodeStream } from "vue-qrcode-reader"

const CARD_QRCODE_MAP = {
  'EDE7D5AA-F55A-C8AF-BFC1-8745AC1BE802': { front: 'sun', back: 'earth' },
  'DBD0EA09-E2FF-962B-C394-902E2F6F8B39': { front: 'sun', back: 'moon' },
  'EB49B8FE-79D3-BC56-C64A-21E9FED6DCF7': { front: 'sun', back: 'star' },
  '27E450C8-D636-7D8D-3567-6D4C83928110': { front: 'moon', back: 'saturn' },
  'DD97982F-70B1-DDAA-A459-E9A7001DC095': { front: 'moon', back: 'galaxy' },
  '96413A20-9AC2-AB84-C561-3D5FCD137E69': { front: 'saturn', back: 'star' },
  'C82C926B-BEC5-0F51-D9BF-BF07D27EDFCD': { front: 'saturn', back: 'earth' },
  'D24454B9-BECB-4286-9917-7D8996475AA9': { front: 'star', back: 'galaxy' },
  'DC7D58CC-4A66-4CBD-5E18-B1DC26FD9D26': { front: 'galaxy', back: 'earth' },
  //翻面
  'FD4EBC2C-6D75-05B4-40AE-55925AA50891': { front: 'earth', back: 'sun' },
  'DF786BC2-04F4-81FA-20C9-BC9D432E56E4': { front: 'moon', back: 'sun' },
  '94736209-DF16-30C4-1F69-D87CB8CADDE9': { front: 'star', back: 'sun' },
  'BDAFDED5-7DFB-2632-02AA-03A2D30DAC71': { front: 'saturn', back: 'moon' },
  '1ED9F040-1FBE-B216-C33A-1A004AD25350': { front: 'galaxy', back: 'moon' },
  '3DA9FEB9-44CC-28D3-6AE7-29C5AFFB871A': { front: 'star', back: 'saturn' },
  'FD7D41EB-428A-86F3-5540-0B8AE3991772': { front: 'earth', back: 'saturn' },
  'BA8D73CD-1457-437D-D366-93279BA9878F': { front: 'galaxy', back: 'star' },
  '46546C4D-5E0D-3AA5-9121-C7AD79783723': { front: 'earth', back: 'galaxy' },
}

const emit = defineEmits(['scaned', 'cancel'])

const paintBoundingBox = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}

const onDecode = (url) => {
  console.log('get url', url)
  if (CARD_QRCODE_MAP[url]) {
    emit('scaned', CARD_QRCODE_MAP[url])
  } else {
    //not a correct card
  }
}

const onBack = () => {
  emit('cancel')
}

function logErrors(promise) {
  promise.catch(console.error)
}

</script>

<style scoped>
.wrapper {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.back {
  position: fixed;
  z-index: 1100;
  top: 0;
  left: 0;
}
</style>