/**
 * PrimeVue ESM bundle for modxpro-vue-core
 *
 * Single bundle with all commonly used components.
 * Components selected based on MiniShop3 usage.
 */

// Config & Theme
export { default as PrimeVue } from 'primevue/config'
export { default as Aura } from '@primevue/themes/aura'

// Services
export { default as ConfirmationService } from 'primevue/confirmationservice'
export { default as ToastService } from 'primevue/toastservice'
export { default as DialogService } from 'primevue/dialogservice'

// Composables
export { useConfirm } from 'primevue/useconfirm'
export { useToast } from 'primevue/usetoast'
export { useDialog } from 'primevue/usedialog'

// Layout Components
export { default as Card } from 'primevue/card'
export { default as Panel } from 'primevue/panel'
export { default as Fieldset } from 'primevue/fieldset'
export { default as Divider } from 'primevue/divider'
export { default as Splitter } from 'primevue/splitter'
export { default as SplitterPanel } from 'primevue/splitterpanel'
export { default as ScrollPanel } from 'primevue/scrollpanel'
export { default as Toolbar } from 'primevue/toolbar'

// Tab Components
export { default as Tabs } from 'primevue/tabs'
export { default as TabList } from 'primevue/tablist'
export { default as Tab } from 'primevue/tab'
export { default as TabPanels } from 'primevue/tabpanels'
export { default as TabPanel } from 'primevue/tabpanel'

// Data Components
export { default as DataTable } from 'primevue/datatable'
export { default as Column } from 'primevue/column'
export { default as ColumnGroup } from 'primevue/columngroup'
export { default as Row } from 'primevue/row'
export { default as Paginator } from 'primevue/paginator'
export { default as Tree } from 'primevue/tree'
export { default as TreeTable } from 'primevue/treetable'
export { default as DataView } from 'primevue/dataview'
export { default as OrderList } from 'primevue/orderlist'
export { default as PickList } from 'primevue/picklist'
export { default as Timeline } from 'primevue/timeline'

// Form - Input
export { default as InputText } from 'primevue/inputtext'
export { default as InputNumber } from 'primevue/inputnumber'
export { default as InputMask } from 'primevue/inputmask'
export { default as InputOtp } from 'primevue/inputotp'
export { default as Textarea } from 'primevue/textarea'
export { default as Password } from 'primevue/password'
export { default as InputGroup } from 'primevue/inputgroup'
export { default as InputGroupAddon } from 'primevue/inputgroupaddon'
export { default as IconField } from 'primevue/iconfield'
export { default as InputIcon } from 'primevue/inputicon'
export { default as FloatLabel } from 'primevue/floatlabel'
export { default as IftaLabel } from 'primevue/iftalabel'

// Form - Select
export { default as Select } from 'primevue/select'
export { default as MultiSelect } from 'primevue/multiselect'
export { default as AutoComplete } from 'primevue/autocomplete'
export { default as CascadeSelect } from 'primevue/cascadeselect'
export { default as TreeSelect } from 'primevue/treeselect'
export { default as Listbox } from 'primevue/listbox'

// Form - Checkbox & Radio
export { default as Checkbox } from 'primevue/checkbox'
export { default as RadioButton } from 'primevue/radiobutton'
export { default as ToggleButton } from 'primevue/togglebutton'
export { default as ToggleSwitch } from 'primevue/toggleswitch'
export { default as SelectButton } from 'primevue/selectbutton'

// Form - Date & Color
export { default as DatePicker } from 'primevue/datepicker'
export { default as ColorPicker } from 'primevue/colorpicker'

// Form - Slider & Rating
export { default as Slider } from 'primevue/slider'
export { default as Rating } from 'primevue/rating'
export { default as Knob } from 'primevue/knob'

// Form - File
export { default as FileUpload } from 'primevue/fileupload'

// Note: Editor component requires 'quill' package, not included by default
// If needed, install quill and uncomment:
// export { default as Editor } from 'primevue/editor'

// Buttons
export { default as Button } from 'primevue/button'
export { default as ButtonGroup } from 'primevue/buttongroup'
export { default as SplitButton } from 'primevue/splitbutton'
export { default as SpeedDial } from 'primevue/speeddial'

// Overlay Components
export { default as Dialog } from 'primevue/dialog'
export { default as ConfirmDialog } from 'primevue/confirmdialog'
export { default as ConfirmPopup } from 'primevue/confirmpopup'
export { default as DynamicDialog } from 'primevue/dynamicdialog'
export { default as Drawer } from 'primevue/drawer'
export { default as Popover } from 'primevue/popover'
export { default as Tooltip } from 'primevue/tooltip'
export { default as OverlayBadge } from 'primevue/overlaybadge'

// Menu Components
export { default as Menu } from 'primevue/menu'
export { default as Menubar } from 'primevue/menubar'
export { default as ContextMenu } from 'primevue/contextmenu'
export { default as TieredMenu } from 'primevue/tieredmenu'
export { default as MegaMenu } from 'primevue/megamenu'
export { default as Breadcrumb } from 'primevue/breadcrumb'
export { default as Steps } from 'primevue/steps'
export { default as Dock } from 'primevue/dock'

// Message Components
export { default as Toast } from 'primevue/toast'
export { default as Message } from 'primevue/message'
export { default as InlineMessage } from 'primevue/inlinemessage'

// Misc Components
export { default as Badge } from 'primevue/badge'
export { default as Tag } from 'primevue/tag'
export { default as Chip } from 'primevue/chip'
export { default as Avatar } from 'primevue/avatar'
export { default as AvatarGroup } from 'primevue/avatargroup'
export { default as Image } from 'primevue/image'
export { default as Galleria } from 'primevue/galleria'
export { default as Carousel } from 'primevue/carousel'
export { default as ProgressBar } from 'primevue/progressbar'
export { default as ProgressSpinner } from 'primevue/progressspinner'
export { default as Skeleton } from 'primevue/skeleton'
export { default as BlockUI } from 'primevue/blockui'
export { default as Terminal } from 'primevue/terminal'
export { default as MeterGroup } from 'primevue/metergroup'
export { default as ScrollTop } from 'primevue/scrolltop'
export { default as Inplace } from 'primevue/inplace'
export { default as DeferredContent } from 'primevue/deferredcontent'
export { default as FocusTrap } from 'primevue/focustrap'
export { default as AnimateOnScroll } from 'primevue/animateonscroll'
export { default as StyleClass } from 'primevue/styleclass'
export { default as Ripple } from 'primevue/ripple'

// CSS - import for side effects
import 'primeicons/primeicons.css'
