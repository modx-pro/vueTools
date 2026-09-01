<script setup>
import { ref } from 'vue'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import ContextMenu from 'primevue/contextmenu'
import Dialog from 'primevue/dialog'
import Drawer from 'primevue/drawer'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import Popover from 'primevue/popover'
import Select from 'primevue/select'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()

const dialogVisible = ref(false)
const drawerVisible = ref(false)
const popover = ref(null)
const contextTarget = ref(null)
const contextMenu = ref(null)

const menuItems = [
  { label: 'Resources', icon: 'pi pi-sitemap' },
  { label: 'Elements', icon: 'pi pi-code' },
  { separator: true },
  { label: 'Files', icon: 'pi pi-folder' },
  { label: 'Clear cache', icon: 'pi pi-refresh' }
]

const breadcrumbItems = [
  { label: 'web', icon: 'pi pi-globe' },
  { label: 'Services' },
  { label: 'Development' }
]

const askDelete = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Delete this resource?',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    acceptProps: { severity: 'danger', size: 'small' },
    rejectProps: { severity: 'secondary', size: 'small', outlined: true }
  })
}

const askClearCache = () => {
  confirm.require({
    header: 'Clear cache',
    message: 'The whole site cache will be refreshed.',
    icon: 'pi pi-info-circle',
    acceptLabel: 'Clear',
    rejectLabel: 'Cancel',
    acceptProps: { size: 'small' },
    rejectProps: { severity: 'secondary', size: 'small', outlined: true }
  })
}
</script>

<template>
  <section class="demo-section">
    <h2>Overlays and navigation</h2>
    <div class="demo-section-body">
      <div class="demo-row">
        <span class="demo-label">Windows</span>
        <Button label="Open dialog" icon="pi pi-window-maximize" @click="dialogVisible = true" />
        <Button label="Open drawer" icon="pi pi-bars" severity="secondary" @click="drawerVisible = true" />
        <Button label="Popover" severity="secondary" outlined @click="popover.toggle($event)" />
      </div>

      <div class="demo-row">
        <span class="demo-label">Confirm</span>
        <Button label="Delete (popup)" severity="danger" outlined @click="askDelete" />
        <Button label="Clear cache (dialog)" severity="secondary" @click="askClearCache" />
      </div>

      <div class="demo-row">
        <span class="demo-label">Tooltip</span>
        <Button
          v-tooltip.top="'Publishes the resource and clears the cache'"
          label="Hover me"
          severity="secondary"
        />
        <Select
          :options="['web', 'mgr']"
          model-value="web"
          v-tooltip.right="'Context of the resource'"
        />
      </div>

      <div class="demo-row">
        <span class="demo-label">Breadcrumb</span>
        <Breadcrumb :model="breadcrumbItems" />
      </div>

      <div class="demo-grid demo-row-spaced">
        <div>
          <p class="demo-hint">Menu</p>
          <Menu :model="menuItems" />
        </div>
        <div>
          <p class="demo-hint">Context menu (right click the box)</p>
          <div ref="contextTarget" class="demo-context" @contextmenu="contextMenu.show($event)">
            Right click here
          </div>
          <ContextMenu ref="contextMenu" :model="menuItems" />
        </div>
      </div>

      <Dialog v-model:visible="dialogVisible" header="Resource settings" modal :style="{ width: '28rem' }">
        <div class="demo-field">
          <label for="dlg-title">Title</label>
          <InputText id="dlg-title" model-value="Home" fluid />
        </div>
        <div class="demo-field demo-row-spaced">
          <label for="dlg-template">Template</label>
          <Select
            id="dlg-template"
            :options="['BaseTemplate', 'Landing']"
            model-value="BaseTemplate"
            fluid
          />
        </div>
        <template #footer>
          <Button label="Cancel" severity="secondary" outlined size="small" @click="dialogVisible = false" />
          <Button label="Save" severity="success" size="small" @click="dialogVisible = false" />
        </template>
      </Dialog>

      <Drawer v-model:visible="drawerVisible" header="Tree" position="left">
        <Menu :model="menuItems" />
      </Drawer>

      <Popover ref="popover">
        <div class="demo-popover">
          <strong>Quick update</strong>
          <p class="demo-hint">Popovers use the 4px overlay radius and a restrained shadow.</p>
          <InputText placeholder="Title" fluid />
        </div>
      </Popover>

      <ConfirmDialog />
      <ConfirmPopup />
    </div>
  </section>
</template>
