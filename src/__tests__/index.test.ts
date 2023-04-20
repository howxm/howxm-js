import {
  readyState,
  initHowxm,
  identifyHowxm,
  checkOpenHowxm,
  openHowxm,
} from '../index'

xdescribe('howxm-js', () => {
  const mockInitScript = jest.fn()
  const identifyScript = jest.fn()
  const checkOpenScript = jest.fn()
  const openScript = jest.fn()


  beforeEach(() => {

    jest.mock('../dependencies', () => ({
      checkReadyState: jest.fn(() => true),
      initScript: mockInitScript,
      identifyScript: identifyScript,
      checkOpenScript: checkOpenScript,
      openScript: openScript,
      eventScript: jest.fn(),
      setExtraAttributesScript: jest.fn(),
    }))
  })

  describe('readyState', () => {
    it('should return a boolean', () => {
      expect(typeof readyState).toBe('boolean')
    })
  })

  describe('initHowxm', () => {
    it('should return true if initScript is successful', () => {
      // Arrange
      const appId = '123'

      // Act
      const result = initHowxm(appId)

      // Assert
      expect(mockInitScript).toHaveBeenCalledWith(appId)
      expect(result).toBe(true)
    })

    it('should call the callback with "Howxm ready: true" if it exists', () => {
      // Arrange
      const appId = '123'
      const mockInitScript = jest.fn()
      const mockCallback = jest.fn()

      // Act
      const result = initHowxm(appId, mockCallback)

      // Assert
      expect(mockInitScript).toHaveBeenCalledWith(appId)
      expect(mockCallback).toHaveBeenCalledWith('Howxm ready: true')
      expect(result).toBe(true)
    })

    it('should return false if initScript throws an error', () => {
      // Arrange
      const appId = '123'
      const mockInitScript = jest.fn(() => {
        throw new Error('initScript error')
      })

      // Act
      const result = initHowxm(appId)

      // Assert
      expect(mockInitScript).toHaveBeenCalledWith(appId)
      expect(result).toBe(false)
    })

    it('should log the error message if initScript throws an error', () => {
      // Arrange
      const appId = '123'
      const mockInitScript = jest.fn(() => {
        throw new Error('initScript error')
      })
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      jest.mock('./dependencies', () => ({
        initScript: mockInitScript,
      }))

      // Act
      initHowxm(appId)

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: initScript error')
      consoleErrorSpy.mockRestore()
    })
  })

  describe('identifyHowxm', () => {
    it('should call identifyScript with the customerInfo', () => {
      const customerInfo = { id: 'your_customer_id' }
      identifyHowxm(customerInfo)
      expect(identifyScript).toHaveBeenCalledWith(customerInfo)
    })

    it('should call the callback with a message if provided', () => {
      const customerInfo = { id: 'your_customer_id' }
      const callback = jest.fn()
      identifyHowxm(customerInfo, callback)
      expect(callback).toHaveBeenCalledWith('Howxm identified')
    })

    it('should return true on success', () => {
      const customerInfo = { id: 'your_customer_id' }
      expect(identifyHowxm(customerInfo)).toBe(true)
    })

    // it('should return false on error', () => {
    //   const customerInfo = null
    //   expect(identifyHowxm(customerInfo)).toBe(false)
    // })
  })

  describe('checkOpenHowxm', () => {
    it('should call checkOpenScript with the campaignId, uid, onSuccess, and onFailed', () => {
      const campaignId = 'your_campaign_id'
      const uid = 'your_user_id'
      const onSuccess = jest.fn()
      const onFailed = jest.fn()
      checkOpenHowxm(campaignId, uid, onSuccess, onFailed)
      expect(checkOpenScript).toHaveBeenCalledWith(campaignId, uid, onSuccess, onFailed)
    })
  })

  describe('openHowxm', () => {
    it('should call openScript with the campaignId, customer, extra, and onCompleted', () => {
      const campaignId = 'your_campaign_id'
      const customer = { id: 'your_customer_id' }
      const extra = { attribute: 'value' }
      const onCompleted = jest.fn()
      openHowxm(campaignId, customer, extra, onCompleted)
      expect(openScript).toHaveBeenCalledWith(campaignId, customer, extra, onCompleted)
    })
  })

  describe('eventHowxm', () => {})
  describe('setExtraAttributes', () => {})
})
