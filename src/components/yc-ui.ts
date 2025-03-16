import { App, Plugin } from 'vue';
import { YcUiOptions } from './_type';
import Button, { ButtonGroup } from './Button';
import Drawer from './Drawer';
import Dropdown, {
  DropdownButton,
  Doption,
  Dgroup,
  Dsubmenu,
} from './Dropdown';
import Input, { InputSearch, InputPassword } from './Input';
import Link from './Link';
import Message from './Message';
import Modal from './Modal';
import Notification from './Notification';
import Popconfirm from './Popconfirm';
import Popover from './Popover';
import ResizeBox from './ResizeBox';
import Scrollbar from './Scrollbar';
import Textarea from './Textarea';
import Tooltip from './Tooltip';
import Trigger from './Trigger';
import Spin from './Spin';
import Tag from './Tag';
import Select, { Option, Optgroup } from './Select';
import Empty from './Empty';
import Checkbox, { CheckboxGroup } from './Checkbox';
import InputTag from './InputTag';
import YcIcon from '@/components/_components/Icon/index.vue';
import YcIconButton from '@/components/_components/IconButton/index.vue';

export const components: Record<string, Plugin> = {
  Button,
  Drawer,
  Dropdown,
  Input,
  Link,
  Message,
  Modal,
  Notification,
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
  Checkbox,
  InputTag,
};

const YcUi = {
  ...components,
  ButtonGroup,
  DropdownButton,
  Doption,
  Dgroup,
  Dsubmenu,
  InputSearch,
  InputPassword,
  Option,
  Optgroup,
  CheckboxGroup,
  install: (app: App, options?: YcUiOptions) => {
    app.component('YcIcon', YcIcon);
    app.component('YcIconButton', YcIconButton);
    for (const key of Object.keys(components)) {
      app.use(components[key], options);
    }
  },
};

export default YcUi;

// 定义类型
declare module 'vue' {
  export interface GlobalComponents {
    YcIcon: typeof YcIcon;
    YcIconButton: typeof YcIconButton;
    YcButtonGroup: typeof ButtonGroup;
    YcButton: typeof Button;
    YcDrawer: typeof Drawer;
    YcDropdown: typeof Dropdown;
    YcDropdownButton: typeof DropdownButton;
    YcDoption: typeof Doption;
    YcDgroup: typeof Dgroup;
    YcDsubmenu: typeof Dsubmenu;
    YcInput: typeof Input;
    YcInputSearch: typeof InputSearch;
    YcInputPassword: typeof InputPassword;
    YcLink: typeof Link;
    YcMessage: typeof Message;
    YcModal: typeof Modal;
    YcNotification: typeof Notification;
    YcPopconfirm: typeof Popconfirm;
    YcPopover: typeof Popover;
    YcResizeBox: typeof ResizeBox;
    YcScrollbar: typeof Scrollbar;
    YcTextarea: typeof Textarea;
    YcTooltip: typeof Tooltip;
    YcTrigger: typeof Trigger;
    YcSpin: typeof Spin;
    YcTag: typeof Tag;
    YcSelect: typeof Select;
    YcOption: typeof Option;
    YcOptgroup: typeof Optgroup;
    YcEmpty: typeof Empty;
    YcCheckbox: typeof Checkbox;
    YcCheckboxGroup: typeof CheckboxGroup;
    YcInputTag: typeof InputTag;
  }
}
