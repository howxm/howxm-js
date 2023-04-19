import React from 'react'
import { useEffect } from 'react'

import useHowxm from 'howxm-js'

const myLogger = console.info

const App = () => {
  const { initHowxm, identifyHowxm, openHowxm, checkOpenHowxm, eventHowxm, setExtraAttributes } = useHowxm()
  const campaignId = 'd2b44c1f68925adbfe03738b0ac9ecf9'
  const appId = 'b3596cfb-9e91-4271-b5c0-c82fa8c3f0de'
  const uid = 'my-uid'

  useEffect(() => {
    const isReady = initHowxm(appId, myLogger)
    if (isReady) {
      identifyHowxm({ uid })
    }
  }, [initHowxm, identifyHowxm])

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
      <h1>Howxm SDK Example</h1>
      <button onClick={handleOpenClick}>Open</button>
      <button onClick={handleCheckOpenClick}>CheckOpen</button>
      <button onClick={handleTriggerEvent}>TriggerEvent</button>
      <button onClick={handleSetExtraAttributes}>setExtraAttributes</button>
    </>
  )
}
export default App
