import {
  checkReadyState,
  checkOpenScript,
  identifyScript,
  initScript,
  openScript,
  eventScript,
  setExtraAttributesScript,
} from './dependencies'
import { TAttribute, TCustomerInfo } from './types'

export const readyState: boolean = checkReadyState()

export const initHowxm = (appId: string, callback?: (...data: unknown[]) => void): boolean => {
   return initHowxmWithCustomSdkUrl(appId, undefined, callback)
}

export const initHowxmWithCustomSdkUrl = (appId: string, customSdkUrl?: string, callback?: (...data: unknown[]) => void): boolean => {
  try {
    initScript(appId, customSdkUrl)
    if (callback && typeof callback === 'function') callback(`Howxm ready: true`)

    return true
  } catch (error) {
    console.error(`Howxm error: ${(error as Error).message}`)
    return false
  }
}

export const identifyHowxm = (customerInfo: TCustomerInfo, callback?: (...data: unknown[]) => void): boolean => {
  try {
    identifyScript(customerInfo)

    if (callback && typeof callback === 'function') callback(`Howxm identified`)

    return true
  } catch (error) {
    console.error(`Howxm error: ${(error as Error).message}`)

    return false
  }
}

export const checkOpenHowxm = (
  campaignId: string,
  uid: string,
  onSuccess?: () => void,
  onFailed?: (errMsg?: string) => void
): void => {
  try {
    checkOpenScript(campaignId, uid, onSuccess, onFailed)
  } catch (error) {
    console.error(`Howxm error: ${(error as Error).message}`)
  }
}

export const openHowxm = (
  campaignId: string,
  customer?: TCustomerInfo,
  extra?: TAttribute,
  onCompleted?: (data: { success: boolean; errMsg?: string }) => void
): void => {
  try {
    openScript(campaignId, customer, extra, onCompleted)
  } catch (error) {
    console.error(`Howxm error: ${(error as Error).message}`)
  }
}

export const eventHowxm = (
  eventCode: string,
  eventAttrs?: TAttribute,
  callback?: (...data: unknown[]) => void
): void => {
  try {
    eventScript(eventCode, eventAttrs)
    if (callback && typeof callback === 'function') {
      callback(`Howxm event trigger success.`)
    }
  } catch (error) {
    console.error(`Howxm error: ${(error as Error).message}`)
  }
}

export const setExtraAttributes = (eventAttrs: TAttribute, callback?: (...data: unknown[]) => void): void => {
  try {
    setExtraAttributesScript(eventAttrs)
    if (callback && typeof callback === 'function') {
      callback(`Howxm set extra attributes success.`)
    }
  } catch (error) {
    console.error(`Howxm error: ${(error as Error).message}`)
  }
}
