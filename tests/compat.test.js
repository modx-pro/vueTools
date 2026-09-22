import { describe, expect, it } from 'vitest'
import {
  compareVersions,
  createCompatApi,
  normalizeVersion
} from '../src/runtime/compat.js'

describe('normalizeVersion', () => {
  it('strips MODX release suffixes', () => {
    expect(normalizeVersion('1.2.0-pl')).toEqual([1, 2, 0])
    expect(normalizeVersion('1.2.0-dev')).toEqual([1, 2, 0])
    expect(normalizeVersion('v1.2.0')).toEqual([1, 2, 0])
  })
})

describe('compareVersions', () => {
  it('compares equal versions ignoring -pl', () => {
    expect(compareVersions('1.2.0-pl', '1.2.0')).toBe(0)
  })

  it('orders lower and higher versions', () => {
    expect(compareVersions('1.1.0', '1.2.0')).toBeLessThan(0)
    expect(compareVersions('1.2.1', '1.2.0')).toBeGreaterThan(0)
  })
})

describe('createCompatApi', () => {
  const api = createCompatApi({
    version: '1.2.0-pl',
    features: {
      useTheme: true,
      dataTable: true,
      missingFlag: false
    }
  })

  it('exposes the runtime version string', () => {
    expect(api.version).toBe('1.2.0-pl')
  })

  it('returns true for known enabled features', () => {
    expect(api.hasFeature('useTheme')).toBe(true)
    expect(api.hasFeature('dataTable')).toBe(true)
  })

  it('returns false for unknown or disabled features', () => {
    expect(api.hasFeature('noSuchFeature')).toBe(false)
    expect(api.hasFeature('missingFlag')).toBe(false)
    expect(api.hasFeature('')).toBe(false)
    expect(api.hasFeature(null)).toBe(false)
  })

  it('accepts a matching minVersion', () => {
    expect(api.checkCompatibility({ minVersion: '1.2.0' })).toBe(true)
    expect(api.checkCompatibility({ minVersion: '1.1.0' })).toBe(true)
  })

  it('throws when the installed version is too old', () => {
    expect(() => api.checkCompatibility({ minVersion: '1.3.0' })).toThrow(
      /installed 1\.2\.0-pl.*required >= 1\.3\.0/s
    )
  })

  it('throws when minVersion is missing', () => {
    expect(() => api.checkCompatibility({})).toThrow(/minVersion/)
  })
})
