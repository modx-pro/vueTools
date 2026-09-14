<script setup>
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import Skeleton from 'primevue/skeleton'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const severities = ['success', 'info', 'warn', 'error', 'secondary', 'contrast']

const notify = (severity) => {
  toast.add({
    severity,
    summary: severity === 'success' ? 'Resource saved' : `${severity} message`,
    detail: 'Status messages in the manager are solid colored bars.',
    life: 4000
  })
}
</script>

<template>
  <section class="demo-section">
    <h2>Feedback</h2>
    <div class="demo-section-body">
      <div class="demo-row">
        <span class="demo-label">Toast</span>
        <Button
          v-for="severity in severities"
          :key="severity"
          :label="severity"
          :severity="severity === 'error' ? 'danger' : severity"
          size="small"
          @click="notify(severity)"
        />
      </div>

      <div class="demo-row demo-row-stack">
        <Message severity="success">Resource saved.</Message>
        <Message severity="info">Cache was refreshed 2 minutes ago.</Message>
        <Message severity="warn">This resource is unpublished.</Message>
        <Message severity="error" closable>Alias is already in use.</Message>
      </div>

      <div class="demo-row">
        <span class="demo-label">Message variants</span>
        <Message severity="error" variant="outlined">Outlined</Message>
        <Message severity="error" variant="simple">Simple</Message>
        <Message severity="warn" size="small">Small</Message>
        <Message severity="info" size="large">Large</Message>
      </div>

      <div class="demo-row">
        <span class="demo-label">Tags</span>
        <Tag value="published" severity="success" />
        <Tag value="draft" severity="secondary" />
        <Tag value="deleted" severity="danger" />
        <Tag value="scheduled" severity="warn" />
        <Tag value="cached" severity="info" />
      </div>

      <div class="demo-row">
        <span class="demo-label">Progress</span>
        <div class="demo-progress">
          <ProgressBar :value="62" />
        </div>
        <ProgressSpinner class="demo-spinner" stroke-width="6" />
        <Skeleton width="8rem" height="1rem" />
      </div>

      <Toast />
    </div>
  </section>
</template>
