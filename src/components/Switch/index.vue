<template>
  <button
    :class="{
      'yc-switch': true,
      'yc-switch-unchecked': !isChecked,
      'yc-switch-checked': isChecked,
      'yc-switch-loading': loading,
      'yc-switch-disabled': disabled,
      'yc-switch-line': type == 'line',
      'yc-switch-size-small': size == 'small',
      'yc-switch-size-medium': size == 'medium',
    }"
    :aria-checked="isChecked"
    :style="{
      borderRadius: type == 'round' ? '2px' : `${SIZE_MAP[size]}px`,
    }"
    role="switch"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @click="handleClick"
  >
    <span
      class="yc-switch-handle"
      :style="{
        borderRadius: ['circle', 'line'].includes(type) ? '50%' : '2px',
      }"
    >
      <span class="yc-switch-handle-icon">
        <yc-spin
          v-if="loading"
          style="font-size: inherit; color: inherit"
          :loading="loading"
        />
        <template v-else>
          <slot v-if="isChecked" name="checked-icon" />
          <slot v-else name="unchecked-icon" />
        </template>
      </span>
    </span>
    <!-- placeholder -->
    <span
      v-if="size != 'small' && (checkedText || uncheckedText)"
      class="yc-switch-text-placeholder"
    >
      {{ isChecked ? checkedText : uncheckedText }}
    </span>
    <!-- text -->
    <span
      v-if="size != 'small' && (checkedText || uncheckedText)"
      class="yc-switch-text"
    >
      <slot v-if="isChecked" name="checked-text">
        {{ checkedText }}
      </slot>
      <slot v-else name="unchecked-text">
        {{ uncheckedText }}
      </slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { SwitchProps, SwitchValue } from './type';
import { SIZE_MAP } from '@/components/_constants';
import useControlValue from '@/components/_hooks/useControlValue';
import YcSpin from '@/components/Spin';
defineOptions({
  name: 'Switch',
});
const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: undefined,
  defaultValue: false,
  disabled: false,
  loading: false,
  type: 'round',
  size: 'medium',
  checkedValue: true,
  uncheckedValue: false,
  checkedColor: '',
  uncheckedColor: '',
  checkedText: '',
  uncheckedText: '',
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: SwitchValue): void;
  (e: 'change', value: SwitchValue, ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  checkedValue,
  uncheckedValue,
  loading,
  disabled,
  type,
  size,
} = toRefs(props);
// 计算值
const computedValue = useControlValue<SwitchValue>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 是否选中
const isChecked = computed(() => {
  return computedValue.value == checkedValue.value;
});
// 处理点击
const handleClick = (e: Event) => {
  if (loading.value || disabled.value) return;
  computedValue.value = isChecked.value
    ? uncheckedValue.value
    : checkedValue.value;
  emits('change', computedValue.value, e);
};
</script>

<style lang="less" scoped>
.yc-switch {
  cursor: pointer;
  overflow: hidden;
  position: relative;
  padding: 0;
  vertical-align: middle;
  outline: none;
  border: none;
  transition: background-color 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  .yc-switch-handle {
    position: absolute;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    .yc-switch-handle-icon {
      font-size: inherit;
    }
  }
  .yc-switch-text-placeholder {
    visibility: hidden;
    font-size: 12px;
  }
  .yc-switch-text {
    position: absolute;
    font-size: 12px;
  }
}
// unchecked
.yc-switch-unchecked {
  background-color: rgb(201, 205, 212);
  .yc-switch-handle {
    background-color: #fff;
    color: rgb(229, 230, 235);
  }
  .yc-switch-text-placeholder {
    margin: 0 8px 0 26px;
  }
  .yc-swtich-text {
    left: 26px;
    color: #fff;
  }
}
// checked
.yc-switch-checked {
  background-color: rgba(22, 93, 255);
  .yc-switch-handle {
    background-color: #fff;
    color: rgb(22, 93, 255);
  }
  .yc-switch-text-placeholder {
    margin: 0 26px 0 8px;
  }
  .yc-switch-text {
    left: 8px;
    color: #fff;
  }
  &.yc-switch-size-medium {
    .yc-switch-handle {
      left: calc(100% - 20px);
    }
  }
  &.yc-switch-size-small {
    .yc-switch-handle {
      left: calc(100% - 14px);
    }
  }
}
// loading disabled
.yc-switch-loading,
.yc-switch-disabled {
  &.yc-switch-disabled {
    cursor: not-allowed;
  }
  &.yc-switch-unchecked {
    background-color: rgb(242, 243, 245);
    .yc-switch-handle {
      color: rgb(229, 230, 235);
    }
    .yc-switch-text {
      color: #fff;
    }
  }
  &.yc-switch-checked {
    background-color: rgb(148, 191, 255);
    .yc-switch-handle {
      color: rgb(148, 191, 255);
    }
    .yc-switch-text {
      color: rgb(232, 243, 255);
    }
  }
}
// size
.yc-switch-size-small {
  min-width: 28px;
  height: 16px;
  line-height: 16px;
  .yc-switch-handle {
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    font-size: 8px;
  }
}
.yc-switch-size-medium {
  min-width: 40px;
  height: 24px;
  line-height: 24px;
  .yc-switch-handle {
    top: 4px;
    left: 4px;
    width: 16px;
    height: 16px;
    font-size: 12px;
  }
}
</style>
