import {
  checkReadyState,
  checkOpenScript,
  identifyScript,
  initScript,
  openScript,
  eventScript,
  setExtraAttributesScript,
} from './dependencies'
import { IUseHowxm, TAttribute, TCustomerInfo } from './types'

export default function useHowxm(): IUseHowxm {
  const readyState = checkReadyState()

  const initHowxm = (appId: string, callback?: (...data: unknown[]) => void): boolean => {
    try {
      initScript(appId)
      if (callback && typeof callback === 'function') callback(`Howxm ready: true`)

      return true
    } catch (error) {
      console.error(`Howxm error: ${(error as Error).message}`)
      return false
    }
  }

  const identifyHowxm = (customerInfo: TCustomerInfo, callback?: (...data: unknown[]) => void): boolean => {
    try {
      identifyScript(customerInfo)

      if (callback && typeof callback === 'function') callback(`Howxm identified`)

      return true
    } catch (error) {
      console.error(`Howxm error: ${(error as Error).message}`)

      return false
    }
  }

  const checkOpenHowxm = (
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

  const openHowxm = (
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

  const eventHowxm = (eventCode: string, eventAttrs?: TAttribute, callback?: (...data: unknown[]) => void): void => {
    try {
      eventScript(eventCode, eventAttrs)
      if (callback && typeof callback === 'function') {
        callback(`Howxm event trigger success.`)
      }
    } catch (error) {
      console.error(`Howxm error: ${(error as Error).message}`)
    }
  }

  const setExtraAttributes = (eventAttrs: TAttribute, callback?: (...data: unknown[]) => void): void => {
    try {
      setExtraAttributesScript(eventAttrs)
      if (callback && typeof callback === 'function') {
        callback(`Howxm set extra attributes success.`)
      }
    } catch (error) {
      console.error(`Howxm error: ${(error as Error).message}`)
    }
  }

  return {
    readyState,
    initHowxm,
    identifyHowxm,
    checkOpenHowxm,
    openHowxm,
    eventHowxm,
    setExtraAttributes,
  }
}
