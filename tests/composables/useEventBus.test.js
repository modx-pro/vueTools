import { describe, it, expect, vi } from 'vitest'
import { createApp, defineComponent, nextTick } from 'vue'
import { useEventBus } from '../../src/composables/useEventBus.js'

describe('useEventBus', () => {
  it.each([
    ['empty string', ''],
    ['undefined', undefined],
    ['null', null],
  ])('throws TypeError for %s namespace', (_label, namespace) => {
    expect(() => useEventBus(namespace)).toThrow(TypeError)
  })

  it('delivers payload to subscribers via on + emit', () => {
    const bus = useEventBus('test-on-emit')
    const handler = vi.fn()

    bus.on('updated', handler)
    const product = { id: 1, name: 'Widget' }
    bus.emit('updated', product)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(product)
  })

  it('notifies multiple independent listeners on the same namespace', () => {
    const busA = useEventBus('test-multi')
    const busB = useEventBus('test-multi')
    const handlerA = vi.fn()
    const handlerB = vi.fn()

    busA.on('ping', handlerA)
    busB.on('ping', handlerB)
    busA.emit('ping', 'hello')

    expect(handlerA).toHaveBeenCalledWith('hello')
    expect(handlerB).toHaveBeenCalledWith('hello')
  })

  it('off removes a specific handler; repeat off is safe', () => {
    const bus = useEventBus('test-off')
    const handler = vi.fn()

    bus.on('evt', handler)
    bus.off('evt', handler)
    bus.off('evt', handler)
    bus.emit('evt', 1)

    expect(handler).not.toHaveBeenCalled()
  })

  it('unsubscribe returned by on() removes the handler', () => {
    const bus = useEventBus('test-unsub')
    const handler = vi.fn()

    const unsub = bus.on('evt', handler)
    unsub()
    bus.emit('evt', true)

    expect(handler).not.toHaveBeenCalled()
  })

  it('emit without subscribers does not throw', () => {
    const bus = useEventBus('test-empty-emit')
    expect(() => bus.emit('nothing', {})).not.toThrow()
  })

  it('isolates events by namespace', () => {
    const busA = useEventBus('ns-a')
    const busB = useEventBus('ns-b')
    const handlerA = vi.fn()
    const handlerB = vi.fn()

    busA.on('evt', handlerA)
    busB.on('evt', handlerB)
    busA.emit('evt', 'from-a')

    expect(handlerA).toHaveBeenCalledWith('from-a')
    expect(handlerB).not.toHaveBeenCalled()
  })

  it('does not mutate the payload object', () => {
    const bus = useEventBus('test-payload')
    const payload = { value: 42 }
    const snapshot = JSON.stringify(payload)

    bus.on('evt', (p) => {
      expect(p).toBe(payload)
    })
    bus.emit('evt', payload)

    expect(JSON.stringify(payload)).toBe(snapshot)
  })

  it('removes listeners automatically on component unmount', async () => {
    const handler = vi.fn()
    let mounted = false

    const Comp = defineComponent({
      setup() {
        const bus = useEventBus('test-cleanup')
        bus.on('evt', handler)
        mounted = true
        return () => null
      },
    })

    const el = document.createElement('div')
    document.body.appendChild(el)
    const app = createApp(Comp)
    app.mount(el)
    await nextTick()
    expect(mounted).toBe(true)

    app.unmount()
    await nextTick()

    // Same namespace, outside setup — emit should not reach cleaned-up handler
    const bus = useEventBus('test-cleanup')
    bus.emit('evt', 'after-unmount')
    expect(handler).not.toHaveBeenCalled()

    el.remove()
  })
})
