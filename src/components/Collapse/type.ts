import { WritableComputedRef, Ref } from 'vue';
export interface CollapseProps {
  activeKey?: CollapseValue[];
  defaultActiveKey?: CollapseValue[];
  accordion?: boolean;
  showExpandIcon?: boolean;
  expandIconPosition?: ExpandIconPosition;
  bordered?: boolean;
  destroyOnHide?: boolean;
}

export interface CollapseEmits {
  (e: 'update:activekey', value: CollapseValue): void;
  (e: 'change', value: CollapseValue): void;
}

export interface CollapseItemProps {
  value?: CollapseValue;
  title?: string;
  disabled?: boolean;
  showExpandIcon?: boolean;
  destroyOnHide?: boolean;
}

export type CollapseValue = string | number;

export type ExpandIconPosition = 'left' | 'right';

export type CollapseProvide = {
  computedActiveKey:
    | WritableComputedRef<CollapseValue[]>
    | Ref<CollapseValue[]>;
  accordion: Ref<boolean>;
  expandIconPosition: Ref<ExpandIconPosition>;
  showExpandIcon: Ref<boolean>;
  destroyOnHide: Ref<boolean>;
};
