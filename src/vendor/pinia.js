/**
 * Pinia ESM bundle for modxpro-vue-core
 *
 * Re-exports all Pinia APIs for use via Import Map
 */

export {
  // Core
  createPinia,
  defineStore,
  storeToRefs,
  setActivePinia,
  getActivePinia,

  // Map Helpers (Options API)
  mapState,
  mapGetters,
  mapActions,
  mapStores,
  mapWritableState,

  // HMR
  acceptHMRUpdate
} from 'pinia'
