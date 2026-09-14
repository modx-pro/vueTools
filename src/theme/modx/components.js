/**
 * Component tokens of the Modx preset
 *
 * Only components whose manager appearance differs from the base preset are
 * listed. Everything else - InputText, Textarea, Password, Popover, Menu,
 * ContextMenu, TieredMenu, ConfirmDialog, ConfirmPopup, Badge - is already
 * correct through the semantic layer (form field, list, navigation, overlay,
 * content) and is deliberately left to inherit.
 */

import autocomplete from './components/autocomplete.js'
import breadcrumb from './components/breadcrumb.js'
import button from './components/button.js'
import card from './components/card.js'
import checkbox from './components/checkbox.js'
import colorpicker from './components/colorpicker.js'
import datatable from './components/datatable.js'
import datepicker from './components/datepicker.js'
import dialog from './components/dialog.js'
import divider from './components/divider.js'
import drawer from './components/drawer.js'
import fieldset from './components/fieldset.js'
import fileupload from './components/fileupload.js'
import inlinemessage from './components/inlinemessage.js'
import inputgroup from './components/inputgroup.js'
import inputnumber from './components/inputnumber.js'
import message from './components/message.js'
import multiselect from './components/multiselect.js'
import paginator from './components/paginator.js'
import panel from './components/panel.js'
import radiobutton from './components/radiobutton.js'
import select from './components/select.js'
import tabs from './components/tabs.js'
import tag from './components/tag.js'
import toast from './components/toast.js'
import togglebutton from './components/togglebutton.js'
import toggleswitch from './components/toggleswitch.js'
import toolbar from './components/toolbar.js'
import tooltip from './components/tooltip.js'
import tree from './components/tree.js'
import treetable from './components/treetable.js'

export const components = {
  autocomplete,
  breadcrumb,
  button,
  card,
  checkbox,
  colorpicker,
  datatable,
  datepicker,
  dialog,
  divider,
  drawer,
  fieldset,
  fileupload,
  inlinemessage,
  inputgroup,
  inputnumber,
  message,
  multiselect,
  paginator,
  panel,
  radiobutton,
  select,
  tabs,
  tag,
  toast,
  togglebutton,
  toggleswitch,
  toolbar,
  tooltip,
  tree,
  treetable
}

export default components
