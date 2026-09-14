<script setup>
import { ref } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import Checkbox from 'primevue/checkbox'
import ColorPicker from 'primevue/colorpicker'
import DatePicker from 'primevue/datepicker'
import FloatLabel from 'primevue/floatlabel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import Password from 'primevue/password'
import RadioButton from 'primevue/radiobutton'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import Slider from 'primevue/slider'
import Textarea from 'primevue/textarea'
import ToggleSwitch from 'primevue/toggleswitch'

const pagetitle = ref('Home')
const alias = ref('index')
const invalid = ref('')
const longtitle = ref('')
const secret = ref('')
const menuindex = ref(0)
const published = ref(true)
const hidemenu = ref(false)
const searchable = ref(true)
const contentType = ref({ name: 'HTML', code: 'html' })
const templates = ref([])
const publishedOn = ref(new Date())
const color = ref('234368')
const opacity = ref(60)
const contextValue = ref('web')
const richtext = ref('resource')
const suggestions = ref([])

const contentTypes = [
  { name: 'HTML', code: 'html' },
  { name: 'XML', code: 'xml' },
  { name: 'JSON', code: 'json' },
  { name: 'CSS', code: 'css' }
]

const templateOptions = [
  { name: 'BaseTemplate', code: 1 },
  { name: 'Landing', code: 2 },
  { name: 'Blog post', code: 3 }
]

const contexts = ['web', 'mgr']
const resourceTypes = ['resource', 'weblink', 'symlink']

const search = (event) => {
  suggestions.value = ['modResource', 'modChunk', 'modSnippet', 'modTemplate'].filter((item) =>
    item.toLowerCase().includes(event.query.toLowerCase())
  )
}
</script>

<template>
  <section class="demo-section">
    <h2>Form controls</h2>
    <div class="demo-section-body">
      <div class="demo-grid">
        <div class="demo-field">
          <label for="pagetitle">Resource title</label>
          <InputText id="pagetitle" v-model="pagetitle" />
          <span class="demo-hint">32px tall, 3px radius, 13px text</span>
        </div>

        <div class="demo-field">
          <label for="alias">Alias</label>
          <IconField>
            <InputIcon class="pi pi-link" />
            <InputText id="alias" v-model="alias" fluid />
          </IconField>
        </div>

        <div class="demo-field">
          <label for="invalid">Invalid field</label>
          <InputText id="invalid" v-model="invalid" invalid placeholder="Required" />
          <Message severity="error" size="small" variant="simple">Field is required</Message>
        </div>

        <div class="demo-field">
          <label for="disabled">Disabled field</label>
          <InputText id="disabled" model-value="Locked by another user" disabled />
        </div>

        <div class="demo-field">
          <FloatLabel>
            <InputText id="longtitle" v-model="longtitle" fluid />
            <label for="longtitle">Long title</label>
          </FloatLabel>
        </div>

        <div class="demo-field">
          <label for="secret">Password</label>
          <Password id="secret" v-model="secret" toggle-mask fluid />
        </div>

        <div class="demo-field">
          <label for="menuindex">Menu index</label>
          <InputNumber id="menuindex" v-model="menuindex" show-buttons :min="0" :max="99" fluid />
        </div>

        <div class="demo-field">
          <label for="contenttype">Content type</label>
          <Select
            id="contenttype"
            v-model="contentType"
            :options="contentTypes"
            option-label="name"
            fluid
          />
        </div>

        <div class="demo-field">
          <label for="templates">Available templates</label>
          <MultiSelect
            id="templates"
            v-model="templates"
            :options="templateOptions"
            option-label="name"
            display="chip"
            placeholder="Any template"
            fluid
          />
        </div>

        <div class="demo-field">
          <label for="class">Class key</label>
          <AutoComplete
            id="class"
            :suggestions="suggestions"
            dropdown
            fluid
            @complete="search"
          />
        </div>

        <div class="demo-field">
          <label for="publishedon">Published on</label>
          <DatePicker
            id="publishedon"
            v-model="publishedOn"
            show-time
            hour-format="24"
            show-icon
            icon-display="input"
            fluid
          />
        </div>

        <div class="demo-field">
          <label for="notes">Description</label>
          <Textarea id="notes" rows="3" auto-resize placeholder="Internal notes" fluid />
        </div>
      </div>

      <div class="demo-row demo-row-spaced">
        <span class="demo-label">Toggles</span>
        <div class="demo-check">
          <Checkbox v-model="published" input-id="published" binary />
          <label for="published">Published</label>
        </div>
        <div class="demo-check">
          <Checkbox v-model="hidemenu" input-id="hidemenu" binary />
          <label for="hidemenu">Hide from menus</label>
        </div>
        <div class="demo-check">
          <Checkbox :model-value="true" input-id="locked" binary disabled />
          <label for="locked">Locked</label>
        </div>
        <div class="demo-check">
          <ToggleSwitch v-model="searchable" input-id="searchable" />
          <label for="searchable">Searchable</label>
        </div>
      </div>

      <div class="demo-row">
        <span class="demo-label">Radio</span>
        <div
          v-for="type in resourceTypes"
          :key="type"
          class="demo-check"
        >
          <RadioButton v-model="richtext" :input-id="type" :value="type" />
          <label :for="type">{{ type }}</label>
        </div>
      </div>

      <div class="demo-row">
        <span class="demo-label">Select button</span>
        <SelectButton v-model="contextValue" :options="contexts" />
      </div>

      <div class="demo-row">
        <span class="demo-label">Color / slider</span>
        <ColorPicker v-model="color" />
        <div class="demo-slider">
          <Slider v-model="opacity" />
        </div>
        <span class="demo-hint">opacity {{ opacity }}%</span>
      </div>

      <div class="demo-row">
        <span class="demo-label">Sizes</span>
        <InputText size="small" placeholder="small" />
        <InputText placeholder="normal" />
        <InputText size="large" placeholder="large" />
      </div>
    </div>
  </section>
</template>
