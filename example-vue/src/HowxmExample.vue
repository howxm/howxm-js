<template>
  <div class="example">
    <h1>Howxm SDK Vue Example</h1>
    <button @click="handleOpenClick">Open</button>
    <button @click="handleCheckOpenClick">CheckOpen</button>
    <button @click="handleTriggerEvent">TriggerEvent</button>
    <button @click="handleSetExtraAttributes">setExtraAttributes</button>
  </div>
</template>

<script>
import { initHowxm, identifyHowxm, openHowxm, checkOpenHowxm, eventHowxm, setExtraAttributes } from 'howxm-js'
const myLogger = console.info

const campaignId = '<Your published campaignId>'
const appId = '<Your appId>'
const uid = 'my-uid'

export default {
  name: 'HowxmExample',
  mounted() {
    const isReady = initHowxm(appId, myLogger)
    if (isReady) {
      identifyHowxm({ uid })
    }
  },
  methods: {
    handleOpenClick() {
      openHowxm(campaignId, { uid }, { price: 150 }, () => {
        myLogger('openHowxm finished')
      })
    },
    handleCheckOpenClick() {
      checkOpenHowxm(
        campaignId,
        uid,
        () => {
          myLogger('checkOpenHowxm success')
        },
        () => {
          myLogger('checkOpenHowxm failed')
        }
      )
    },
    handleTriggerEvent() {
      eventHowxm('test1', {}, () => {
        myLogger('triggerEvent success')
      })
    },
    handleSetExtraAttributes() {
      const extraAttrs = {
        plan: 'basic',
        vip_level: '1',
      }
      setExtraAttributes(extraAttrs, () => {
        myLogger('setExtraAttributes success')
      })
    },
  },
}
</script>
