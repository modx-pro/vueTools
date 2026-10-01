import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  useDebug,
  enable,
  disable,
  isDebugEnabled,
  redact,
  redactUrl,
  logRequest,
  installDebugApi,
} from '../../src/composables/useDebug.js'

describe('useDebug', () => {
  let logSpy
  let warnSpy
  let errorSpy

  beforeEach(() => {
    disable()
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    disable()
    logSpy.mockRestore()
    warnSpy.mockRestore()
    errorSpy.mockRestore()
  })

  it('is disabled by default', () => {
    expect(isDebugEnabled()).toBe(false)
  })

  it('does not write to console when disabled', () => {
    const debug = useDebug()
    debug.log('hello')
    debug.warn('warn')
    debug.error('err')
    const end = debug.time('x')
    end()

    expect(logSpy).not.toHaveBeenCalled()
    expect(warnSpy).not.toHaveBeenCalled()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('enable and disable toggle output', async () => {
    const debug = useDebug()

    await enable()
    expect(isDebugEnabled()).toBe(true)

    logSpy.mockClear()
    debug.log('visible')
    expect(logSpy).toHaveBeenCalled()
    expect(logSpy.mock.calls[0][0]).toBe('[VueTools]')
    expect(logSpy.mock.calls[0]).toContain('visible')

    disable()
    expect(isDebugEnabled()).toBe(false)
    logSpy.mockClear()
    debug.log('hidden')
    expect(logSpy).not.toHaveBeenCalled()
  })

  it('repeated enable/disable is safe', async () => {
    await enable()
    await enable()
    expect(isDebugEnabled()).toBe(true)
    disable()
    disable()
    expect(isDebugEnabled()).toBe(false)
  })

  it('warn and error write only when enabled', async () => {
    const debug = useDebug()
    await enable()
    warnSpy.mockClear()
    errorSpy.mockClear()

    debug.warn('w')
    debug.error('e')

    expect(warnSpy).toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalled()
  })

  it('time logs duration when enabled', async () => {
    const debug = useDebug()
    await enable()
    logSpy.mockClear()

    const end = debug.time('fetch')
    end()

    expect(logSpy).toHaveBeenCalled()
    const joined = logSpy.mock.calls.map((c) => c.join(' ')).join(' ')
    expect(joined).toMatch(/fetch: \d+(\.\d+)?ms/)
  })

  it('redact masks sensitive object keys', () => {
    expect(
      redact({
        name: 'Ada',
        password: 'secret',
        token: 'abc',
        nested: { authToken: 'x', ok: true },
      })
    ).toEqual({
      name: 'Ada',
      password: '[redacted]',
      token: '[redacted]',
      nested: { authToken: '[redacted]', ok: true },
    })
  })

  it('redactUrl masks sensitive query params', () => {
    const out = redactUrl('https://example.test/c?action=foo&HTTP_MODAUTH=secret&limit=10')
    expect(out).toContain('HTTP_MODAUTH=%5Bredacted%5D')
    expect(out).toContain('limit=10')
    expect(out).not.toContain('secret')
  })

  it('logRequest is silent when disabled', () => {
    logRequest({ method: 'GET', action: 'resource/get', ok: true, durationMs: 12 })
    expect(logSpy).not.toHaveBeenCalled()
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('logRequest writes when enabled and redacts url', async () => {
    await enable()
    logSpy.mockClear()
    warnSpy.mockClear()

    logRequest({
      method: 'GET',
      action: 'resource/get',
      url: 'https://example.test/?HTTP_MODAUTH=tok&action=resource/get',
      durationMs: 12.34,
      ok: true,
    })

    expect(logSpy).toHaveBeenCalled()
    const payload = logSpy.mock.calls.find((c) => c[1] === 'API')?.[2]
    expect(payload.url).toMatch(/HTTP_MODAUTH=%5Bredacted%5D|HTTP_MODAUTH=\[redacted\]/)
    expect(payload.url).not.toContain('tok')
    expect(payload.durationMs).toBe(12.3)
  })

  it('installDebugApi exposes VueTools.debug.enable/disable', async () => {
    installDebugApi()
    expect(typeof window.VueTools.debug.enable).toBe('function')
    expect(typeof window.VueTools.debug.disable).toBe('function')

    await window.VueTools.debug.enable()
    expect(isDebugEnabled()).toBe(true)
    window.VueTools.debug.disable()
    expect(isDebugEnabled()).toBe(false)
  })
})
