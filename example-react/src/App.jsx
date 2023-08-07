import React from 'react'
import { useEffect } from 'react'

import { initHowxm, identifyHowxm, openHowxm, checkOpenHowxm, eventHowxm, setExtraAttributes, onBeforeOpenHowxm, onOpenHowxm, onCloseHowxm, onPageCompleteHowxm, onCompleteHowxm } from 'howxm-js'

const myLogger = console.info

const App = () => {
  const campaignId = '<Your published campaignId>'
  const appId = '<Your appId>'
  const uid = 'my-uid'

  useEffect(() => {
    const isReady = initHowxm(appId, myLogger)
    if (isReady) {
      identifyHowxm({ uid })

      onBeforeOpenHowxm((campaignId, uid, attributes) => {
        myLogger('onBeforeOpenHowxm: ', campaignId, uid, attributes)
      })

      onOpenHowxm((campaignId, uid, attributes) => {
        myLogger('onOpenHowxm: ', campaignId, uid, attributes)
      })

      onCloseHowxm((campaignId, uid) => {
        myLogger('onCloseHowxm: ', campaignId, uid)
      })

      onPageCompleteHowxm((campaignId, uid, fieldsEntry) => {
        myLogger('onPageCompleteHowxm: ', campaignId, uid, fieldsEntry)
      })

      onCompleteHowxm((campaignId, uid) => {
        myLogger('onCompleteHowxm: ', campaignId, uid)
      })
    }
  }, [])

  const handleOpenClick = () => {
    openHowxm(campaignId, { uid }, { price: 150 }, () => {
      myLogger('openHowxm finished')
    })
  }

  const handleCheckOpenClick = () => {
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
  }

  const handleTriggerEvent = () => {
    eventHowxm('test1', {}, () => {
      myLogger('triggerEvent success')
    })
  }

  const handleSetExtraAttributes = () => {
    const extraAttrs = {
      plan: 'basic',
      vip_level: '1',
    }
    setExtraAttributes(extraAttrs, () => {
      myLogger('setExtraAttributes success')
    })
  }

  return (
    <>
      <h1>Howxm SDK React Example</h1>
      <button onClick={handleOpenClick}>Open</button>
      <button onClick={handleCheckOpenClick}>CheckOpen</button>
      <button onClick={handleTriggerEvent}>TriggerEvent</button>
      <button onClick={handleSetExtraAttributes}>setExtraAttributes</button>
    </>
  )
}
export default App
