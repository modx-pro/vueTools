<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Fieldset from 'primevue/fieldset'
import InputText from 'primevue/inputtext'
import Panel from 'primevue/panel'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import Tabs from 'primevue/tabs'
</script>

<template>
  <section class="demo-section">
    <h2>Layout</h2>
    <div class="demo-section-body">
      <Tabs value="0">
        <TabList>
          <Tab value="0">Document</Tab>
          <Tab value="1">Settings</Tab>
          <Tab value="2">Template variables</Tab>
          <Tab value="3" disabled>Access</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <div class="demo-grid">
              <div class="demo-field">
                <label for="tab-title">Title</label>
                <InputText id="tab-title" model-value="Home" />
              </div>
              <div class="demo-field">
                <label for="tab-alias">Alias</label>
                <InputText id="tab-alias" model-value="index" />
              </div>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <p>
              Inactive tabs are flat, hover fills with $lightGray, and the active tab
              merges into the panel below.
            </p>
          </TabPanel>
          <TabPanel value="2">
            <p>Template variables would render here.</p>
          </TabPanel>
          <TabPanel value="3">Access</TabPanel>
        </TabPanels>
      </Tabs>

      <Divider />

      <div class="demo-grid">
        <Panel header="Panel header" toggleable>
          <p>
            Panels are plain boxes: a hairline border, bold 13px header, content on the
            manager spacing scale.
          </p>
          <template #footer>
            <Button label="Apply" size="small" />
          </template>
        </Panel>

        <Fieldset legend="Fieldset" toggleable>
          <div class="demo-field">
            <label for="fs-field">Setting</label>
            <InputText id="fs-field" placeholder="value" />
          </div>
        </Fieldset>

        <Card>
          <template #title>Card title</template>
          <template #subtitle>Subtitle</template>
          <template #content>
            <p>Restrained elevation: hairline shadow instead of a floating surface.</p>
          </template>
          <template #footer>
            <Button label="Open" size="small" severity="secondary" />
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>
