import { ref, toRefs, Ref, provide as _provide, inject as _inject } from 'vue';
import { CollapseEmits, CollapseValue, ExpandIconPosition } from '../type';
import { Props } from '@shared/type';
import { useControlValue } from '@shared/utils';

export const COLLAPSE_PROVIDE_KEY = 'collapse-props';

export type CollapseProvide = {
  computedActiveKey: Ref<CollapseValue[]>;
  accordion: Ref<boolean>;
  expandIconPosition: Ref<ExpandIconPosition>;
  showExpandIcon: Ref<boolean>;
  destroyOnHide: Ref<boolean>;
};

export default () => {
  const provide = (props: Props, emits: CollapseEmits) => {
    const {
      activeKey,
      defaultActiveKey,
      accordion,
      expandIconPosition,
      showExpandIcon,
      destroyOnHide,
    } = toRefs(props);
    // 受控的key
    const computedActiveKey = useControlValue<CollapseValue[]>(
      activeKey,
      defaultActiveKey.value,
      (val) => {
        emits('update:activekey', val);
        emits('change', val);
      }
    );
    _provide<CollapseProvide>(COLLAPSE_PROVIDE_KEY, {
      computedActiveKey,
      accordion,
      expandIconPosition,
      showExpandIcon,
      destroyOnHide,
    });
  };
  const inject = (props: Props) => {
    const { showExpandIcon: _showExpandIcon, destroyOnHide: _destroyOnHide } =
      toRefs(props);
    // 接收的值
    return _inject<CollapseProvide>(COLLAPSE_PROVIDE_KEY, {
      computedActiveKey: ref([]),
      accordion: ref(false),
      expandIconPosition: ref('left'),
      showExpandIcon: _showExpandIcon,
      destroyOnHide: _destroyOnHide,
    });
  };
  return {
    provide,
    inject,
  };
};
