/**
 * useEventBus composable
 *
 * Lightweight namespaced event bus for Vue Extra components and modules.
 * Not a replacement for Pinia — events only, no state storage.
 */

import { getCurrentInstance, onUnmounted } from 'vue'

/** @type {Map<string, Map<string, Set<Function>>>} */
const registry = new Map()

/**
 * Get or create the event map for a namespace.
 *
 * @param {string} namespace
 * @returns {Map<string, Set<Function>>}
 */
function getNamespaceMap(namespace) {
  let eventMap = registry.get(namespace)
  if (!eventMap) {
    eventMap = new Map()
    registry.set(namespace, eventMap)
  }
  return eventMap
}

/**
 * Register a handler on an event within a namespace.
 *
 * @param {string} namespace
 * @param {string} event
 * @param {Function} handler
 */
function addListener(namespace, event, handler) {
  const eventMap = getNamespaceMap(namespace)
  let handlers = eventMap.get(event)
  if (!handlers) {
    handlers = new Set()
    eventMap.set(event, handlers)
  }
  handlers.add(handler)
}

/**
 * Remove handler and prune empty Sets/Maps from the registry.
 *
 * @param {string} namespace
 * @param {string} event
 * @param {Function} handler
 */
function removeHandler(namespace, event, handler) {
  const handlers = registry.get(namespace)?.get(event)
  if (!handlers) {
    return
  }

  handlers.delete(handler)

  if (handlers.size > 0) {
    return
  }

  const eventMap = registry.get(namespace)
  eventMap.delete(event)
  if (eventMap.size === 0) {
    registry.delete(namespace)
  }
}

/**
 * Create a namespaced event bus.
 *
 * When called inside a component setup(), listeners registered via `on()`
 * are automatically removed on unmount.
 *
 * @param {string} namespace - Required event namespace (e.g. 'products')
 * @returns {{ on: Function, off: Function, emit: Function }}
 */
export function useEventBus(namespace) {
  if (typeof namespace !== 'string' || namespace === '') {
    throw new TypeError('[useEventBus] namespace must be a non-empty string')
  }

  /** @type {Array<[string, Function]>} */
  const owned = []

  /**
   * Drop matching entries from the setup-owned subscription list.
   *
   * @param {string} event
   * @param {Function} handler
   */
  function dropOwned(event, handler) {
    for (let i = owned.length - 1; i >= 0; i--) {
      const [ownedEvent, ownedHandler] = owned[i]
      if (ownedEvent === event && ownedHandler === handler) {
        owned.splice(i, 1)
      }
    }
  }

  /**
   * Subscribe to an event in this namespace.
   *
   * @param {string} event - Event name
   * @param {Function} handler - Callback receiving the emit payload
   * @returns {Function} Unsubscribe function
   */
  function on(event, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('[useEventBus] handler must be a function')
    }

    addListener(namespace, event, handler)
    owned.push([event, handler])

    return () => off(event, handler)
  }

  /**
   * Unsubscribe a specific handler. Safe to call repeatedly.
   *
   * @param {string} event - Event name
   * @param {Function} handler - Handler previously passed to on()
   */
  function off(event, handler) {
    removeHandler(namespace, event, handler)
    dropOwned(event, handler)
  }

  /**
   * Emit an event to all subscribers in this namespace.
   * No-op when there are no listeners. Does not mutate the payload.
   *
   * @param {string} event - Event name
   * @param {*} [payload] - Data passed to each handler
   */
  function emit(event, payload) {
    const handlers = registry.get(namespace)?.get(event)
    if (!handlers) {
      return
    }

    for (const handler of [...handlers]) {
      handler(payload)
    }
  }

  if (getCurrentInstance()) {
    onUnmounted(() => {
      while (owned.length > 0) {
        const [event, handler] = owned[0]
        off(event, handler)
      }
    })
  }

  return { on, off, emit }
}

export default useEventBus
