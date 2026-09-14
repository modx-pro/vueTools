<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'
import Tag from 'primevue/tag'
import Toolbar from 'primevue/toolbar'
import Tree from 'primevue/tree'

const selected = ref([])
const filters = ref({ global: { value: null, matchMode: 'contains' } })

const resources = ref([
  { id: 1, pagetitle: 'Home', alias: 'index', template: 'BaseTemplate', published: true, menuindex: 0 },
  { id: 2, pagetitle: 'About us', alias: 'about', template: 'BaseTemplate', published: true, menuindex: 1 },
  { id: 3, pagetitle: 'Services', alias: 'services', template: 'Landing', published: true, menuindex: 2 },
  { id: 4, pagetitle: 'Pricing draft', alias: 'pricing', template: 'Landing', published: false, menuindex: 3 },
  { id: 5, pagetitle: 'Blog', alias: 'blog', template: 'BaseTemplate', published: true, menuindex: 4 },
  { id: 6, pagetitle: 'Contact', alias: 'contact', template: 'BaseTemplate', published: false, menuindex: 5 }
])

const tree = ref([
  {
    key: '0',
    label: 'web',
    icon: 'pi pi-globe',
    children: [
      { key: '0-0', label: 'Home', icon: 'pi pi-file' },
      {
        key: '0-1',
        label: 'Services',
        icon: 'pi pi-folder',
        children: [
          { key: '0-1-0', label: 'Development', icon: 'pi pi-file' },
          { key: '0-1-1', label: 'Support', icon: 'pi pi-file' }
        ]
      },
      { key: '0-2', label: 'Contact', icon: 'pi pi-file' }
    ]
  }
])

const expandedKeys = ref({ 0: true, '0-1': true })
const selectionKeys = ref({ '0-1-0': true })
</script>

<template>
  <section class="demo-section">
    <h2>Data</h2>
    <div class="demo-section-body">
      <Toolbar>
        <template #start>
          <Button label="New" icon="pi pi-plus" size="small" />
          <Button label="Duplicate" icon="pi pi-copy" severity="secondary" size="small" />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            size="small"
            :disabled="!selected.length"
          />
        </template>
        <template #end>
          <InputText v-model="filters.global.value" size="small" placeholder="Search" />
        </template>
      </Toolbar>

      <DataTable
        v-model:selection="selected"
        v-model:filters="filters"
        :value="resources"
        :global-filter-fields="['pagetitle', 'alias', 'template']"
        data-key="id"
        striped-rows
        show-gridlines
        removable-sort
        paginator
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
        class="demo-row-spaced"
      >
        <Column selection-mode="multiple" header-style="width: 2rem" />
        <Column field="id" header="Id" sortable header-style="width: 4rem" />
        <Column field="pagetitle" header="Title" sortable />
        <Column field="alias" header="Alias" sortable />
        <Column field="template" header="Template" sortable />
        <Column field="menuindex" header="Index" sortable header-style="width: 5rem" />
        <Column header="State" header-style="width: 7rem">
          <template #body="{ data }">
            <Tag
              :value="data.published ? 'published' : 'unpublished'"
              :severity="data.published ? 'success' : 'secondary'"
            />
          </template>
        </Column>
        <Column header="" header-style="width: 5rem">
          <template #body>
            <Button icon="pi pi-pencil" severity="secondary" text size="small" aria-label="Edit" />
            <Button icon="pi pi-trash" severity="danger" text size="small" aria-label="Delete" />
          </template>
        </Column>
      </DataTable>

      <div class="demo-grid demo-row-spaced">
        <div>
          <p class="demo-hint">Standalone paginator</p>
          <Paginator :rows="10" :total-records="120" :rows-per-page-options="[10, 20, 50]" />
        </div>
        <div>
          <p class="demo-hint">Resource tree</p>
          <Tree
            v-model:expanded-keys="expandedKeys"
            v-model:selection-keys="selectionKeys"
            :value="tree"
            selection-mode="single"
          />
        </div>
      </div>
    </div>
  </section>
</template>
