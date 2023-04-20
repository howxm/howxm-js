export type TCustomerInfo = Record<string, string | number | Date | boolean>

export type TAttribute = Record<string, string | number | Date | boolean>

export interface IWindowHowxmEmbedded extends Window {
  _howxm: (method: string, ...data: unknown[]) => void
}
