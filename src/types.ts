export type TCustomerInfo = Record<string, string | number | Date | boolean>

export type TAttribute = Record<string, string | number | Date | boolean>

export interface IUseHowxm {
  readyState: boolean
  initHowxm: (appId: string, callback?: (...data: unknown[]) => void) => boolean
  identifyHowxm: (customerInfo: TCustomerInfo, callback?: (...data: unknown[]) => void) => boolean
  checkOpenHowxm: (
    campaignId: string,
    uid: string,
    onSuccess?: () => void,
    onFailed?: (errMsg?: string) => void
  ) => void
  openHowxm: (
    campaignId: string,
    customer?: TCustomerInfo,
    extra?: TAttribute,
    onCompleted?: (data: { success: boolean; errMsg?: string }) => void
  ) => void
  eventHowxm: (eventCode: string, eventAttrs?: TAttribute, callback?: (...data: unknown[]) => void) => void
  setExtraAttributes: (extraAttrs: TAttribute, callback?: (...data: unknown[]) => void) => void
}

export interface IWindowHowxmEmbedded extends Window {
  _howxm: (method: string, ...data: unknown[]) => void
}
