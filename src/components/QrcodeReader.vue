<template>
  <div class="wrapper my-column">
    <a-button class="back" @click="onBack">&lt;返回</a-button>
    <qrcode-stream :track="paintOutline" @init="logErrors" @decode="onDecode" :style="{ width: '100%' }" />
  </div>
</template>

<script setup>
import { QrcodeStream } from "vue-qrcode-reader"

const CARD_QRCODE_MAP = {
  'EDE7D5AA-F55A-C8AF-BFC1-8745AC1BE802': { front: 'sun', back: 'earth' },
  'DBD0EA09-E2FF-962B-C394-902E2F6F8B39': { front: 'sun', back: 'moon' },
  'EB49B8FE-79D3-BC56-C64A-21E9FED6DCF7': { front: 'sun', back: 'star' },
  'FD4EBC2C-6D75-05B4-40AE-55925AA50891': { front: 'earth', back: 'sun' },
  'DF786BC2-04F4-81FA-20C9-BC9D432E56E4': { front: '', back: '' },
  '94736209-DF16-30C4-1F69-D87CB8CADDE9': { front: '', back: '' },
  '27E450C8-D636-7D8D-3567-6D4C83928110': { front: '', back: '' },
  'DD97982F-70B1-DDAA-A459-E9A7001DC095': { front: '', back: '' },
  'BDAFDED5-7DFB-2632-02AA-03A2D30DAC71': { front: '', back: '' },
  '1ED9F040-1FBE-B216-C33A-1A004AD25350': { front: '', back: '' },
  '96413A20-9AC2-AB84-C561-3D5FCD137E69': { front: '', back: '' },
  'C82C926B-BEC5-0F51-D9BF-BF07D27EDFCD': { front: '', back: '' },
  'D24454B9-BECB-4286-9917-7D8996475AA9': { front: '', back: '' },
  'DC7D58CC-4A66-4CBD-5E18-B1DC26FD9D26': { front: '', back: '' },
  '3DA9FEB9-44CC-28D3-6AE7-29C5AFFB871A': { front: '', back: '' },
  'FD7D41EB-428A-86F3-5540-0B8AE3991772': { front: '', back: '' },
  'BA8D73CD-1457-437D-D366-93279BA9878F': { front: '', back: '' },
  '46546C4D-5E0D-3AA5-9121-C7AD79783723': { front: '', back: '' },
}

const emit = defineEmits(['scaned', 'cancel'])

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
  width: 100%
}

.back {
  margin-bottom: 16px;
}
</style>