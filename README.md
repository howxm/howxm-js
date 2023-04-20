# howxm-js

> Adds [Howxm](https://howxm.com/) capabilities to your project

[![NPM](https://img.shields.io/npm/v/howxm-js.svg)](https://www.npmjs.com/package/howxm-js)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm downloads](https://img.shields.io/npm/dt/howxm-js.svg?style=flat-square)](https://www.npmjs.com/package/howxm-js)

## Install

```bash
npm install --save howxm-js
```

## Usage

- Initializing Howxm

```tsx
import React from 'react'
import { initHowxm } from 'howxm-js'

const myLogger = console.info

const HowxmReadyApp = () => {
  const appId = '<Your App ID>'

  useEffect(() => {
    initHowxm(appId, myLogger)
  }, [])

  return <App />
}
```

- Identifying Customer ([Identify API's rules](https://howxm.com/help/articles/x-sdk-api#part-2ae9459859b8f9f3))

```tsx
import React from 'react'
import { identifyHowxm } from 'howxm-js'

const myLogger = console.info

const MyCustomComponent = () => {
  const customerInfo = {
    uid: '00000001', // 用户唯一ID, 默认字段, 必填，string 类型
  }

  const handleUserInfo = (userInfo) => {
    identifyHowxm(customerInfo)
  }
}
```

- Check Open Campaign ([Check Open API's rules](https://howxm.com/help/articles/web-sdk-intro#4-checkopen))

```tsx
import React from 'react'
import { checkOpenHowxm } from 'howxm-js'

const myLogger = console.info

const MyCustomComponent = () => {
  const campaignId = '<You Campaign ID>'
  const uid = '00000001'

  const handlecCheckOpenCampaign = () => {
    checkOpenHowxm(
      campaignId,
      customerInfo,
      () => {
        myLogger('checkOpenHowxm success')
      },
      (data) => {
        myLogger('checkOpenHowxm faield', data)
      }
    )
  }
}
```

- Open Campaign (Not recommended. [Open API's rules](https://howxm.com/help/articles/web-sdk-intro#3-open))

```tsx
import React from 'react'
import { openHowxm } from 'howxm-js'

const myLogger = console.info

const MyCustomComponent = () => {
  const campaignId = '<You Campaign ID>'
  const customerInfo = {
    uid: '00000001', // 用户唯一ID, 默认字段, 必填，string 类型
  }
  const extra = {
    plan: 'free',
  }

  const handleOpenCampaign = () => {
    openHowxm(campaignId, customerInfo, extra, () => {
      myLogger('openHowxm finished')
    })
  }
}
```

- Send Event ([Event API's rules](https://howxm.com/help/articles/web-sdk-intro#2-event))

```tsx
import React from 'react'
import { eventHowxm } from 'howxm-js'

const myLogger = console.info

const MyCustomComponent = () => {
  const eventCode = '<event code>'
  const eventAttrs = {
    plan: 'free',
    age: 17,
  }

  const handleTriggerEvent = () => {
    eventHowxm(eventCode, eventAttrs, () => {
      myLogger('triggerEvent success')
    })
  }
}
```

- Set extra attributes to scalable (Not recommended.[setExtraAttributes API's rules](https://howxm.com/help/articles/web-sdk-intro#5-setextraattributes))

```tsx
import React from 'react'
import { setExtraAttributes } from 'howxm-js'

const myLogger = console.info

const MyCustomComponent = () => {
  const extraAttrs = {
    plan: 'basic',
    vip_level: '1',
  }

  const handleTriggerEvent = () => {
    setExtraAttributes(eventAttrs, myLogger)
  }
}
```

## License

MIT © [jinshuju](https://github.com/jinshuju)

更多信息，请查看我们的[帮助文档](https://howxm.com/help/articles/npm-web-sdk-intro)。
