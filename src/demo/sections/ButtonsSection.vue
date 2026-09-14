<script setup>
import Button from 'primevue/button'
import ButtonGroup from 'primevue/buttongroup'
import SplitButton from 'primevue/splitbutton'

const severities = [
  { label: 'Primary', severity: undefined },
  { label: 'Secondary', severity: 'secondary' },
  { label: 'Save', severity: 'success' },
  { label: 'Info', severity: 'info' },
  { label: 'Warn', severity: 'warn' },
  { label: 'Delete', severity: 'danger' },
  { label: 'Contrast', severity: 'contrast' }
]

const splitItems = [
  { label: 'Duplicate', icon: 'pi pi-copy' },
  { label: 'Publish', icon: 'pi pi-upload' },
  { separator: true },
  { label: 'Delete', icon: 'pi pi-trash' }
]
</script>

<template>
  <section class="demo-section">
    <h2>Buttons</h2>
    <div class="demo-section-body">
      <div class="demo-row">
        <span class="demo-label">Filled</span>
        <Button
          v-for="item in severities"
          :key="item.label"
          :label="item.label"
          :severity="item.severity"
        />
      </div>

      <div class="demo-row">
        <span class="demo-label">Outlined</span>
        <Button
          v-for="item in severities"
          :key="item.label"
          :label="item.label"
          :severity="item.severity"
          outlined
        />
      </div>

      <div class="demo-row">
        <span class="demo-label">Text / link</span>
        <Button label="Text" text />
        <Button label="Secondary" severity="secondary" text />
        <Button label="Danger" severity="danger" text />
        <Button label="Link" link />
      </div>

      <div class="demo-row">
        <span class="demo-label">Sizes</span>
        <Button label="Small" size="small" />
        <Button label="Normal" />
        <Button label="Large" size="large" />
      </div>

      <div class="demo-row">
        <span class="demo-label">Icons</span>
        <Button label="New resource" icon="pi pi-plus" />
        <Button label="Refresh" icon="pi pi-refresh" severity="secondary" />
        <Button icon="pi pi-cog" severity="secondary" aria-label="Settings" />
        <Button icon="pi pi-trash" severity="danger" outlined aria-label="Delete" />
        <Button label="Loading" icon="pi pi-save" loading />
      </div>

      <div class="demo-row">
        <span class="demo-label">States</span>
        <Button label="Disabled" disabled />
        <Button label="Disabled" severity="secondary" disabled />
        <Button label="Raised" raised />
        <Button label="Rounded" rounded />
      </div>

      <div class="demo-row">
        <span class="demo-label">Groups</span>
        <ButtonGroup>
          <Button label="Edit" icon="pi pi-pencil" severity="secondary" />
          <Button label="Move" icon="pi pi-arrows-alt" severity="secondary" />
          <Button label="Remove" icon="pi pi-trash" severity="secondary" />
        </ButtonGroup>
        <SplitButton label="Save" icon="pi pi-save" severity="success" :model="splitItems" />
      </div>

      <p class="demo-hint">
        The manager Save action is green: use <code>severity="success"</code>.
        Toolbar buttons are the white bordered <code>severity="secondary"</code>.
      </p>
    </div>
  </section>
</template>
