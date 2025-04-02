<template>
  <a-select
    v-bind="props"
    v-model="computedValue"
    v-model:input-value="computedInputValue"
    v-model:popup-visible="computedVisible"
    :trigger-props="{
      ...triggerProps,
      contentClass: 'cx-select-popup-content',
    }"
    class="cx-select"
    @clear="(e) => $emit('clear', e)"
    @remove="(v) => $emit('remove', v)"
    @search="(v) => $emit('search', v)"
    @dropdown-scroll="$emit('dropdownScroll')"
    @dropdown-reach-bottom="$emit('dropdownReachBottom')"
    @exceed-limit="(v, ev) => $emit('exceedLimit', v, ev)"
  >
    <template #arrow-icon>
      <img :src="computedVisible ? IconArrowUp : IconArrowDown" />
    </template>
    <template v-if="$slots.prefix || prefixText" #prefix>
      <slot name="prefix">
        <div class="cx-select-prefix-text">
          {{ prefixText }}
        </div>
      </slot>
    </template>
    <template v-if="$slots.suffix" #prefix>
      <slot name="suffix" />
    </template>
  </a-select>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { SelectProps, SelectValue } from './type';
import useControlValue from '../_shared/hooks/useControlValue';
import IconArrowDown from '../_shared/icons/select-arrow-down.svg';
import IconArrowUp from '../_shared/icons/select-arrow-up.svg';
const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  modelValue: undefined,
  defaultValue: '',
  inputValue: undefined,
  defaultInputValue: '',
  size: 'medium',
  placeholder: '',
  loading: false,
  disabled: false,
  error: false,
  allowClear: false,
  allowSearch: false,
  allowCreate: false,
  maxTagCount: 0,
  popupContainer: 'body',
  bordered: true,
  defaultActivefirstOption: false,
  popupVisible: undefined,
  defaultPopupVisible: false,
  unmountOnClose: false,
  filterOption: undefined,
  options: () => [],
  formatLabel: undefined,
  fallbackOption: undefined,
  showExtraOptions: true,
  valueKey: '',
  triggerProps: () => {
    return {
      contentStyle: {},
    };
  },
  limit: 0,
  fieldNames: undefined,
  scrollbar: true,
  searchDelay: 500,
  showHeaderOnEmpty: false,
  showFooterOnEmpty: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: SelectValue): void;
  (e: 'update:inputValue', value: SelectValue): void;
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'change', value: SelectValue): void;
  (e: 'input-value-change', value: string): void;
  (e: 'popupVisibleChange', value: boolean): void;
  (e: 'clear', ev?: Event): void;
  (e: 'remove', removed?: SelectValue): void;
  (e: 'search', value: string): void;
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
  (e: 'exceedLimit', value?: SelectValue, ev?: Event): void;
}>();
const {
  modelValue,
  defaultValue,
  inputValue,
  defaultInputValue,
  popupVisible,
  defaultPopupVisible,
} = toRefs(props);
// modelValue
const computedValue = useControlValue<SelectValue>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
    emits('change', val);
  }
);
// inputValue
const computedInputValue = useControlValue<string>(
  inputValue,
  defaultInputValue.value,
  (val) => {
    emits('update:inputValue', val);
    emits('input-value-change', val);
  }
);
// visible
const computedVisible = useControlValue<boolean>(
  popupVisible,
  defaultPopupVisible.value,
  (val) => {
    emits('update:popupVisible', val);
    emits('popupVisibleChange', val);
  }
);
</script>

<style lang="less">
.cx-select.arco-select-view-size-medium {
  padding: 0 9px 0 8px;
  border-radius: 8px;
  border: 1px solid #e1e5eb;
  background: #fff;
  &:hover {
    border: 1px solid #0065ff;
    background: #fff;
  }
  .arco-select-view-prefix {
    padding-right: 16px;
    .cx-select-prefix-text {
      position: relative;
      color: #79828f;
      font-family: 'PingFang SC';
      font-size: 14px;
      font-weight: 400;
      &::after {
        display: block;
        content: '';
        z-index: 2;
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background-color: #e1e5eb;
      }
    }
  }
  .arco-select-view-input {
    caret-color: #0065ff;
    color: #474f59;
    font-family: 'PingFang SC';
    font-size: 14px;
    font-weight: 400;
    &::placeholder {
      color: #c9ced6;
    }
  }
  .arco-select-view-inner {
    .arco-tag {
      min-height: 22px;
      height: 22px;
      padding: 0 8px;
      border-radius: 4px;
      background: #f5f7fa;
      border: none;
      .arco-tag-close-btn {
        flex-shrink: 0;
        width: 12px;
        height: 12px;
        background: url('../_shared/icons/close.svg') no-repeat;
        svg {
          display: none;
        }
        &::before {
          display: none;
        }
      }
    }
  }
  .arco-select-view-suffix {
    .arco-select-view-clear-btn {
      flex-shrink: 0;
      width: 12px;
      height: 12px;
      background: url('../_shared/icons/close-fill.svg') no-repeat;
      svg {
        display: none;
      }
      &::before {
        display: none;
      }
    }
    .arco-select-view-icon {
      font-size: 12px;
    }
  }
  &.arco-select-view-focus {
    .arco-select-view-suffix {
      .arco-select-view-icon {
        background: url('../_shared/icons/arrow-up-blue.svg') no-repeat;
      }
    }
  }
}
// popup
.arco-trigger-popup-wrapper {
  .cx-select-popup-content {
    background: #fff;

    .arco-select-dropdown {
      border-radius: 8px;
      border: 1px solid #e1e5eb;
      box-shadow: 0px 0px 8px 0px rgba(0, 101, 255, 0.06);
      .arco-scrollbar {
        .arco-scrollbar-container {
          .arco-select-dropdown-list {
            padding: 3px;
            .arco-select-option {
              margin-top: 2px;
              height: 30px;
              padding: 5px 0 5px 8px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              &:hover {
                background: #edf1f7;
              }
              .arco-select-option-content {
                color: #0d1014;
                font-family: 'PingFang SC';
                font-size: 14px;
                font-weight: 400;
              }
              &.arco-select-option-selected {
                background: rgba(0, 101, 255, 0.08);
                .arco-select-option-content {
                  color: #0065ff;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
