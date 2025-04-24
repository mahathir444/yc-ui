export interface CollapseProps {
  activeKey?: CollapseValue[];
  defaultActiveKey?: CollapseValue[];
  accordion?: boolean;
  showExpandIcon?: boolean;
  expandIconPosition?: 'left' | 'right';
  bordered?: boolean;
  destroyOnHide?: boolean;
}

export interface CollapseItemProps {
  value?: CollapseValue;
  title?: string;
  disabled?: boolean;
  showExpandIcon?: boolean;
  destroyOnHide?: boolean;
}

export type CollapseValue = string | number;
