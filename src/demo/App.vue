<script setup>
import { computed, ref, watchEffect } from 'vue'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'

import ButtonsSection from './sections/ButtonsSection.vue'
import DataSection from './sections/DataSection.vue'
import FeedbackSection from './sections/FeedbackSection.vue'
import FormsSection from './sections/FormsSection.vue'
import LayoutSection from './sections/LayoutSection.vue'
import OverlaySection from './sections/OverlaySection.vue'

const scheme = ref('light')
const schemes = ['light', 'dark']

/**
 * ModxTheme is configured with `.p-dark` as the dark mode selector, so the
 * class on the document root is all it takes to flip the scheme.
 */
watchEffect(() => {
  document.documentElement.classList.toggle('p-dark', scheme.value === 'dark')
})

const isDark = computed(() => scheme.value === 'dark')
</script>

<template>
  <div class="demo">
    <header class="demo-bar">
      <h1>Modx theme</h1>
      <p>PrimeVue 4 preset built on the MODX Revolution 3 manager</p>
      <div class="demo-bar-actions">
        <SelectButton v-model="scheme" :options="schemes" :allow-empty="false" size="small" />
        <Button
          :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
          severity="secondary"
          size="small"
          :aria-label="isDark ? 'Switch to light' : 'Switch to dark'"
          @click="scheme = isDark ? 'light' : 'dark'"
        />
      </div>
    </header>

    <ButtonsSection />
    <FormsSection />
    <DataSection />
    <LayoutSection />
    <OverlaySection />
    <FeedbackSection />
  </div>
</template>
