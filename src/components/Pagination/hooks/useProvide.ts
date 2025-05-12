import {
  ref,
  toRefs,
  Ref,
  provide as _provide,
  inject as _inject,
  computed,
  CSSProperties,
} from 'vue';
import { PaginationProps as _PaginationProps, PaginationEmits } from '../type';
import { Size, Props, RequiredDeep } from '@shared/type';
import { useControlValue, useConfigProvder } from '@shared/hooks';

export const PAGINATION_GROUP_PROVIDE_KEY = 'pagination-group-props';

export interface PaginationProvide {
  computedCurrent: Ref<number>;
  computedPageSize: Ref<number>;
  disabled: Ref<boolean>;
  pageItemStyle: Ref<CSSProperties>;
  activePageItemStyle: Ref<CSSProperties>;
  pageNumber: Ref<number>;
  size: Ref<Size>;
  baseSize: Ref<number>;
}

export type PaginationProps = RequiredDeep<_PaginationProps>;

export default () => {
  const provide = (props: Props, emits: PaginationEmits) => {
    const {
      total,
      disabled,
      current,
      defaultCurrent,
      pageSize,
      defaultPageSize,
      pageSizeOptions,
      pageItemStyle,
      activePageItemStyle,
      baseSize,
    } = toRefs(props as PaginationProps);
    const { size } = useConfigProvder(props);
    // 页数
    const pageNumber = computed(() => {
      return Math.ceil(total.value / computedPageSize.value);
    });
    // current
    const computedCurrent = useControlValue<number>(
      current,
      defaultCurrent.value,
      (val) => {
        emits('update:current', val);
        emits('change', val);
      }
    );
    // pageSize
    const computedPageSize = useControlValue<number>(
      pageSize,
      defaultPageSize.value,
      (val) => {
        emits('update:pageSize', val);
        emits('page-size-change', val);
      }
    );
    const sizes = computed(() => {
      return pageSizeOptions.value.map((item) => {
        return {
          label: `${item}条/页`,
          value: item,
        };
      });
    });
    // 提供给子组件
    _provide<PaginationProvide>(PAGINATION_GROUP_PROVIDE_KEY, {
      computedCurrent,
      computedPageSize,
      disabled,
      pageItemStyle,
      activePageItemStyle,
      pageNumber,
      size,
      baseSize,
    });
    return {
      size,
      pageNumber,
      computedCurrent,
      computedPageSize,
      sizes,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<PaginationProvide>(PAGINATION_GROUP_PROVIDE_KEY, {
      computedCurrent: ref(1),
      computedPageSize: ref(10),
      disabled: ref(false),
      pageItemStyle: ref({}),
      activePageItemStyle: ref({}),
      pageNumber: ref(0),
      size: ref('medium'),
      baseSize: ref(6),
    });
  };
  return {
    provide,
    inject,
  };
};
