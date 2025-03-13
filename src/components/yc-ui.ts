import { App, Plugin } from 'vue';
import { YcUiOptions } from './_type';
import Button, { ButtonGroup } from './Button';
import Drawer from './Drawer';
import Dropdown, {
  DropdownButton,
  DOption,
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
import SvgIcon from '@/components/_components/SvgIcon/index.vue';

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
};

const YcUi = {
  ...components,
  ButtonGroup,
  DropdownButton,
  DOption,
  Dgroup,
  Dsubmenu,
  InputSearch,
  InputPassword,
  Option,
  Optgroup,
  CheckboxGroup,
  install: (app: App, options: YcUiOptions) => {
    app.component('SvgIcon', SvgIcon);
    for (const key of Object.keys(components)) {
      app.use(components[key], options);
    }
  },
};

export default YcUi;
