import Button from "./Button/index.js";
import Drawer from "./Drawer/index.js";
import Dropdown from "./Dropdown/index.js";
import Input from "./Input/index.js";
import Link from "./Link/index.js";
import Message from "./Message/index.js";
import Modal from "./Modal/index.js";
import Message$1 from "./Notification/index.js";
import Popconfirm from "./Popconfirm/index.js";
import Popover from "./Popover/index.js";
import ResizeBox from "./ResizeBox/index.js";
import Scrollbar from "./Scrollbar/index.js";
import Textarea from "./Textarea/index.js";
import Tooltip from "./Tooltip/index.js";
import Trigger from "./Trigger/index.js";
import Spin from "./Spin/index.js";
import Tag from "./Tag/index.js";
import Select from "./Select/index.js";
import Empty from "./Empty/index.js";
import Checkbox from "./Checkbox/index.js";
import YcIcon from "./_components/Icon/index.vue.js";
import YcIconButton from "./_components/IconButton/index.vue.js";
import _sfc_main from "./Button/ButtonGroup.vue.js";
import "./Button/ButtonGroup.vue2.js";
import _sfc_main$1 from "./Dropdown/DropdownButton.vue.js";
import Doption from "./Dropdown/Doption.vue.js";
import Dgroup from "./Dropdown/Dgroup.vue.js";
import Dsubmenu from "./Dropdown/Dsubmenu.vue.js";
import InputSearch from "./Input/InputSearch.vue.js";
import _sfc_main$2 from "./Input/InputPassword.vue.js";
import Option from "./Select/Option.vue.js";
import Optgroup from "./Select/Optgroup.vue.js";
import _sfc_main$3 from "./Checkbox/CheckboxGroup.vue.js";
import "./Checkbox/CheckboxGroup.vue2.js";
const components = {
  Button,
  Drawer,
  Dropdown,
  Input,
  Link,
  Message,
  Modal,
  Notification: Message$1,
  Popconfirm,
  Popover,
  ResizeBox,
  Scrollbar,
  Textarea,
  Tooltip,
  Trigger,
  Spin,
  Tag,
  Select,
  Empty,
  Checkbox
};
const YcUi = {
  ...components,
  ButtonGroup: _sfc_main,
  DropdownButton: _sfc_main$1,
  Doption,
  Dgroup,
  Dsubmenu,
  InputSearch,
  InputPassword: _sfc_main$2,
  Option,
  Optgroup,
  CheckboxGroup: _sfc_main$3,
  install: (app, options) => {
    app.component("YcIcon", YcIcon);
    app.component("YcIconButton", YcIconButton);
    for (const key of Object.keys(components)) {
      app.use(components[key], options);
    }
  }
};
export {
  components,
  YcUi as default
};
