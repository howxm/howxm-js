import useHowxm from '../index'
import { IWindowHowxmEmbedded } from '../types'

const fakeHowxmFunction = jest.fn(() => {
  return null
})

const mockAppId = 'abc-123-def'
const mockCustomer = {
  name: 'andy',
  address: 'streets of GaoXin 5rd',
}

describe('useHowxm', () => {
  beforeAll(() => {
    ;(window as unknown as IWindowHowxmEmbedded)._howxm = fakeHowxmFunction
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all methods', () => {
    const { initHowxm, identifyHowxm, readyState, checkOpenHowxm, openHowxm, eventHowxm, setExtraAttributes } = useHowxm()
    expect(initHowxm).toBeTruthy()
    expect(identifyHowxm).toBeTruthy()
    expect(readyState).toBeTruthy()
    expect(checkOpenHowxm).toBeTruthy()
    expect(openHowxm).toBeTruthy()
    expect(eventHowxm).toBeTruthy()
    expect(setExtraAttributes).toBeTruthy()
  })

  it('should initHowxm when howxm script not exited', () => {
    const result = useHowxm()
    const initHowxmSpy = jest.spyOn(result, 'initHowxm')
    const { initHowxm } = result
    initHowxm(mockAppId)
    expect(initHowxmSpy).toHaveBeenCalledWith(mockAppId)
  })

  it('should updateHowxm when script exited and init with different appId', () => {
    const result = useHowxm()
    const initHowxmSpy = jest.spyOn(result, 'initHowxm')
    const { initHowxm } = result
    initHowxm(mockAppId)
    expect(initHowxmSpy).toHaveBeenCalledWith(mockAppId)

    initHowxm('new-app-id')
    expect(initHowxmSpy).toHaveBeenCalledWith('new-app-id')
  })

  it('should initHowxm with callback', () => {
    const result = useHowxm()
    const initHowxmSpy = jest.spyOn(result, 'initHowxm')
    const consoleInfoSpy = jest.spyOn(console, 'info')
    const { initHowxm } = result

    const callback = console.info

    initHowxm(mockAppId, callback)

    expect(initHowxmSpy).toHaveBeenCalledWith(mockAppId, callback)
    expect(consoleInfoSpy).toHaveBeenCalledWith('Howxm ready: true')
  })

  it('should identifyHowxm with pure object', () => {
    const result = useHowxm()
    const identifyHowxmSpy = jest.spyOn(result, 'identifyHowxm')
    const { identifyHowxm } = result

    identifyHowxm(mockCustomer)
    expect(identifyHowxmSpy).toHaveBeenCalledWith(mockCustomer)
  })

  it('should identifyHowxm with broken callback', () => {
    console.error = jest.fn()
    const result = useHowxm()
    const identifyHowxmSpy = jest.spyOn(result, 'identifyHowxm')
    const consoleErrorSpy = jest.spyOn(console, 'error')
    const { identifyHowxm } = result

    const brokencallback = () => {
      throw Error('test')
    }

    identifyHowxm(mockCustomer, brokencallback as (...data: unknown[]) => void)

    expect(identifyHowxmSpy).toHaveBeenCalledWith(mockCustomer, brokencallback)
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Howxm error: ${Error('test').message}`)
  })

  it('should identifyHowxm withCallback', () => {
    const result = useHowxm()
    const identifyHowxmSpy = jest.spyOn(result, 'identifyHowxm')
    const consoleInfoSpy = jest.spyOn(console, 'info')
    const { identifyHowxm } = result

    const callback = console.info

    identifyHowxm(mockCustomer, callback)

    expect(identifyHowxmSpy).toHaveBeenCalledWith(mockCustomer, callback)
    expect(consoleInfoSpy).toHaveBeenCalledWith('Howxm identified')
  })

  it('should checkOpenHowxm ', () => {
    const result = useHowxm()
    const checkOpenHowxmSpy = jest.spyOn(result, 'checkOpenHowxm')
    const { checkOpenHowxm } = result
    const campaignId = 'abc'
    const uid = '123'
    const onSuccess = jest.fn()
    const onFailed = jest.fn()
    checkOpenHowxm(campaignId, uid, onSuccess, onFailed)
    expect(checkOpenHowxmSpy).toHaveBeenCalledWith(campaignId, uid, onSuccess, onFailed)
  })

  it('should openHowxm with campaignId', () => {
    const result = useHowxm()
    const openHowxmSpy = jest.spyOn(result, 'openHowxm')
    const { openHowxm } = result
    const campaignId = 'abc'
    openHowxm(campaignId)
    expect(openHowxmSpy).toHaveBeenLastCalledWith(campaignId)
  })

  it('should eventHowxm with eventCode', () => {
    const result = useHowxm()
    const eventHowxmSpy = jest.spyOn(result, 'eventHowxm')
    const { eventHowxm } = result
    const eventCode = 'abc'
    eventHowxm(eventCode)
    expect(eventHowxmSpy).toHaveBeenLastCalledWith(eventCode)
  })

  it('should eventHowxm with callback', () => {
    const result = useHowxm()
    const eventHowxmSpy = jest.spyOn(result, 'eventHowxm')
    const { eventHowxm } = result

    const callback = console.info

    const eventCode = 'abc'
    eventHowxm(eventCode, {}, callback)
    expect(eventHowxmSpy).toHaveBeenLastCalledWith(eventCode, {}, callback)
  })

  it('should setExtraAttributes to eventAttrs', () => {
    const result = useHowxm()
    const setExtraAttributesSpy = jest.spyOn(result, 'setExtraAttributes')
    const { setExtraAttributes } = result
    const eventAttrs = {
      name: 'andy',
      address: 'streets of GaoXin 5rd',
    }
    setExtraAttributes(eventAttrs)
    expect(setExtraAttributesSpy).toHaveBeenLastCalledWith(eventAttrs)
  })

  it('should setExtraAttributes to eventAttrs with callback', () => {
    const result = useHowxm()
    const setExtraAttributesSpy = jest.spyOn(result, 'setExtraAttributes')
    const { setExtraAttributes } = result

    const callback = console.info

    const eventAttrs = {
      name: 'andy',
      address: 'streets of GaoXin 5rd',
    }
    setExtraAttributes(eventAttrs, callback)
    expect(setExtraAttributesSpy).toHaveBeenLastCalledWith(eventAttrs, callback)
  })
})

describe('Tests Howxm without being loaded into window', () => {
  beforeAll(() => {
    // @ts-ignore
    ;(window as unknown as IWindowHowxmEmbedded)._howxm = undefined
    console.error = jest.fn()
  })

  it('should not init howxm and throw errors', () => {
    const { identifyHowxm } = useHowxm()
    const consoleErrorSpy = jest.spyOn(console, 'error')

    identifyHowxm({ name: 'andy' })

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Howxm error: ${Error('Howxm is not available! Is Howxm initialized?').message}`
    )
  })

  it('should identifyHowxm with pure object and throw errors', () => {
    const { identifyHowxm } = useHowxm()
    const consoleErrorSpy = jest.spyOn(console, 'error')

    identifyHowxm(mockCustomer)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })

  it('should checkOpenHowxm throw errors', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error')

    const { checkOpenHowxm } = useHowxm()
    const campaignId = 'abc'
    const uid = '123'

    checkOpenHowxm(campaignId, uid)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })

  it('should openHowxm with campaign and throw errors', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error')

    const { openHowxm } = useHowxm()
    const campaignId = 'abc'

    openHowxm(campaignId)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })

  it('should eventHowxm with campaign and throw errors', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error')

    const { eventHowxm } = useHowxm()
    const campaignId = 'abc'

    eventHowxm(campaignId)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })

  it('should setExtraAttributes to eventAttrs', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error')

    const { setExtraAttributes } = useHowxm()

    setExtraAttributes(mockCustomer)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })
})

describe('Tests useHowxm init and its rejections', () => {
  beforeAll(() => {
    global.document.getElementById = () => {
      throw Error('Error')
    }
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should fail on initializing Howxm', () => {
    const consoleSpy = jest.spyOn(console, 'error')

    const { initHowxm } = useHowxm()

    const failedInitResult = initHowxm(mockAppId)

    expect(failedInitResult).toBeFalsy()
    expect(consoleSpy).toHaveBeenCalledWith('Howxm error: Howxm initialization failed!')
  })
})
