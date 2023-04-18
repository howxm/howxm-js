import useHowxm from '../index'

describe.only('Tests useHowxm without window', () => {
  beforeAll(() => {
    console.error = jest.fn()
  })

  it('should fail on initializing howxm without window', () => {
    const consoleSpy = jest.spyOn(console, 'error')
    const oldWindow = globalThis.window

    const { initHowxm } = useHowxm()

    delete globalThis.window

    const failedInitResult = initHowxm('abc-123')

    globalThis.window = oldWindow

    expect(failedInitResult).toBeFalsy()
    expect(consoleSpy).toHaveBeenCalledWith('Howxm error: Howxm depends on window. Window is undefined.')
  })
})
