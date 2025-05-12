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
  baseSize: Ref<number>;
}

export type PaginationProps = RequiredDeep<_PaginationProps>;

function calculatePagination(params: {
  total: number;
  pagesize: number;
  current: number;
  baseSize: number;
  bufferSize: number;
}) {
  const { total, pagesize, current, baseSize, bufferSize } = params;
  const totalPages = Math.ceil(total / pagesize);
  const result = [];
  if (totalPages <= 1) return [1];
  // 当总页数 ≤ baseSize 时，显示所有页码，不显示省略号
  if (totalPages <= baseSize) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
    return result;
  }
  // 始终显示第一页
  result.push(1);
  // 计算左侧省略
  const leftHidden = current - bufferSize - 2; // 2代表第一页和可能的省略号
  const showLeftEllipsis = leftHidden > 0;
  // 计算右侧省略
  const rightHidden = totalPages - (current + bufferSize + 1);
  const showRightEllipsis = rightHidden > 0;
  // 计算中间页码范围
  let start = 2;
  let end = totalPages - 1;
  if (showLeftEllipsis && showRightEllipsis) {
    // 两侧都有省略号
    start = current - bufferSize;
    end = current + bufferSize;
  } else if (showLeftEllipsis) {
    // 只有左侧有省略号
    start = totalPages - (baseSize - 1);
    end = totalPages - 1;
  } else if (showRightEllipsis) {
    // 只有右侧有省略号
    start = 2;
    end = baseSize;
  } else {
    // 无省略号，显示全部页码
    start = 2;
    end = totalPages - 1;
  }
  // 确保范围有效
  start = Math.max(2, start);
  end = Math.min(totalPages - 1, end);
  // 添加左侧省略号
  if (showLeftEllipsis) {
    result.push('ellipsis-left');
  }
  // 添加中间页码
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  // 添加右侧省略号
  if (showRightEllipsis) {
    result.push('ellipsis-right');
  }
  // 始终显示最后一页
  result.push(totalPages);
  return result;
}

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
      bufferSize,
    } = toRefs(props as PaginationProps);
    const { size } = useConfigProvder(props);
    // 页数
    const pageNumber = computed(() => {
      return Math.ceil(total.value / computedPageSize.value);
    });
    const pages = computed(() =>
      calculatePagination({
        total: total.value,
        pagesize: computedPageSize.value,
        current: computedCurrent.value,
        baseSize: baseSize.value - 1,
        bufferSize: bufferSize.value,
      })
    );
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
        computedCurrent.value = 1;
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
      baseSize,
    });
    return {
      size,
      pageNumber,
      computedCurrent,
      computedPageSize,
      sizes,
      pages,
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
      baseSize: ref(6),
    });
  };
  return {
    provide,
    inject,
  };
};
