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
  install: (app: App, options: YcUiOptions) => {
    for (const key of Object.keys(components)) {
      app.use(components[key], options);
    }
  },
};

export default YcUi;
