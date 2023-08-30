import { IWindowHowxmEmbedded, TAttribute, TCustomerInfo } from './types'
import { APP_ID } from './constant'

function appendHeadScript(scriptText: string, scriptId: string, appId: string): boolean {
  try {
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement
    if (existingScript) {
      if (existingScript?.getAttribute('appId') !== appId) {
        (window as unknown as IWindowHowxmEmbedded)._howxm?.('updateHowxm', appId)
      } else {
        sessionStorage.setItem(APP_ID, JSON.stringify(appId))
      }
      return true
    }
    const script = document.createElement('script')
    script.id = scriptId
    script.setAttribute('appId', appId)
    script.innerText = scriptText
    script.crossOrigin = 'anonymous'

    document.head.appendChild(script)

    return true
  } catch {
    return false
  }
}

export function initScript(appId: string, customSdkUrl?: string): boolean {
  const url = customSdkUrl ?? 'https://static.howxm.com/sdk.js'
  const hasWindow = typeof window !== 'undefined'
  if (!hasWindow) throw Error('Howxm depends on window. Window is undefined.')

  const scriptCode = `function _howxm(){_howxmQueue.push(arguments)}window._howxmQueue=window._howxmQueue||[],_howxm("setAppID","${appId}"),function(){if(!document.getElementById("howxm_script")){var e=document.createElement("script"),t=document.getElementsByTagName("script")[0];e.setAttribute("id","howxm_script"),e.type="text/javascript",e.async=!0,e.src="${url}",t.parentNode.insertBefore(e,t)}}();`
  const isAppended = appendHeadScript(scriptCode, 'howxm-init-script', appId)
  if (isAppended && hasWindow && (window as unknown as IWindowHowxmEmbedded)._howxm) {
    return true
  }

  throw Error('Howxm initialization failed!')
}

function throwNotInitializedError() {
  throw Error('Howxm is not available! Is Howxm initialized?')
}

export function identifyScript(customerInfo: TCustomerInfo): void {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('identify', customerInfo)
  }

  throwNotInitializedError()
}

export function openScript(
  campaignId: string,
  customer?: TCustomerInfo,
  extra?: TAttribute,
  onCompleted?: (data: { success: boolean; errMsg?: string }) => void
): void {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('open', {
      campaignId,
      customer,
      extra,
      onCompleted,
    })
  }
  throwNotInitializedError()
}

export function checkOpenScript(
  campaignId: string,
  uid: string,
  onSuccess?: () => void,
  onFailed?: (errMsg?: string) => void
): void {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('checkOpen', {
      campaignId,
      uid,
      onSuccess,
      onFailed,
    })
  }
  throwNotInitializedError()
}

export function checkReadyState(): boolean {
  const hasWindow = typeof window !== 'undefined'
  return !!(hasWindow && (window as unknown as IWindowHowxmEmbedded)._howxm)
}

export function eventScript(eventCode: string, eventAttrs?: TAttribute) {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('event', eventCode, eventAttrs)
  }
  throwNotInitializedError()
}

export function setExtraAttributesScript(eventAttrs: TAttribute) {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('setExtraAttributes', eventAttrs)
  }
  throwNotInitializedError()
}

export function onBeforeOpenScript(
    callback?: (campaignId: string, uid: string, attributes: any) => void
): void {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('registerCallback', 'onBeforeOpen', callback)
  }
  throwNotInitializedError()
}

export function onOpenScript(
    callback?: (campaignId: string, uid: string, attributes: any) => void
): void {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('registerCallback', 'onOpen', callback)
  }
  throwNotInitializedError()

}

export function onCloseScript(
    callback?: (campaignId: string, uid: string) => void
): void {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('registerCallback', 'onClose', callback)
  }
  throwNotInitializedError()
}

export function onPageCompleteScript(
    callback?: (campaignId: string, uid: string, fieldsEntry: any) => void
): void {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('registerCallback', 'onPageComplete', callback)
  }
  throwNotInitializedError()
}

export function onCompleteScript(
    callback?: (campaignId: string, uid: string) => void
): void {
  if (checkReadyState()) {
    return (window as unknown as IWindowHowxmEmbedded)._howxm('registerCallback', 'onComplete', callback)
  }
  throwNotInitializedError()
}

