import { App, Plugin } from 'vue';
import GlobalComponents from '@shared/components';
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
import AutoComplete from './AutoComplete';
import Radio, { RadioGroup } from './Radio';
import Switch from './Switch';
import InputNumber from './InputNumber';

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
  AutoComplete,
  Radio,
  Switch,
  InputNumber,
};

export default {
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
  RadioGroup,
  install: (app: App) => {
    app.use(GlobalComponents);
    for (const key of Object.keys(components)) {
      app.use(components[key]);
    }
  },
};
