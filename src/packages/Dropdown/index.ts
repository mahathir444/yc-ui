import { App } from 'vue';
import _Dropdown from './Dropdown.vue';
import _Doption from './Doption.vue';
import _Dgroup from './Dgroup.vue';
import _DropdownButton from './DropdownButton.vue';
import { getComponentPrefix } from '@/packages/_utils/global-config';

export type DropdownInstance = InstanceType<typeof _Dropdown>;
export type DoptionInstance = InstanceType<typeof _Doption>;
export type DgroupInstance = InstanceType<typeof _Dgroup>;
export type DropdownButtonInstance = InstanceType<typeof _Dropdown>;
export type ButonGroupInstance = InstanceType<typeof _DropdownButton>;
export type {
  DropdownButtonProps,
  DropdownProps,
  DoptionValue,
  DoptionProps,
  DsubmenuProps,
} from './type';

const Dropdown = Object.assign(_Dropdown, {
  option: _Doption,
  group: _Dgroup,
  button: _DropdownButton,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Dropdown.name, _Dropdown);
  },
});

export default Dropdown;
