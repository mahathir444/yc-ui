<template>
  <div
    :class="[
      'yc-input-tag',
      SIZE_CLASS[size],
      !computedValue.length ? 'yc-input-tag-no-value' : '',
      disabled ? 'yc-input-tag-disabled' : 'yc-input-tag-hoverable',
      error ? 'yc-input-tag-error' : '',
    ]"
    :style="{
      minHeight: `${SIZE_MAP[size]}px`,
    }"
    @click="inputRef?.focus()"
  >
    <!-- prefix-icon -->
    <div v-if="$slots.prefix" class="yc-input-tag-prefix">
      <slot name="prefix" />
    </div>
    <!-- input -->
    <div class="yc-input-tag-inner">
      <!-- tag-list -->
      <yc-tag
        v-for="item in curList.showList"
        :key="item.id"
        :closeable="item?.closeable ?? true"
        :bordered="item?.tagProps?.bordered ?? true"
        :nowrap="item?.tagProps?.nowrap ?? tagNowrap"
        :size="size == 'mini' ? 'small' : size"
        prevent-focus
        stop-propagation
        color="white"
        @close="(e) => handleEvent('close', e, item.id)"
      >
        {{ formatTag(item) }}
      </yc-tag>
      <yc-tag
        v-if="maxTagCount > 0 && computedValue.length > maxTagCount"
        :size="size == 'mini' ? 'small' : size"
        :nowrap="tagNowrap"
        bordered
        prevent-focus
        color="white"
        stop-propagation
      >
        +{{ curList.hideList }}...
      </yc-tag>
      <!-- mirror -->
      <div class="yc-input-tag-mirror" ref="mirrorRef">
        {{ computedInputValue || placeholder }}
      </div>
      <!-- input -->
      <input
        v-model="computedInputValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="computedValue.length ? '' : placeholder"
        :style="{
          width: `${width}px`,
        }"
        class="yc-input-tag-input"
        ref="inputRef"
        @input="(e) => $emit('input', (e.target as HTMLInputElement).value)"
        @change="(e) => $emit('inputValueChange', computedInputValue, e)"
        @focus="(e) => emits('focus', e)"
        @blur="(e) => handleEvent('blur', e)"
        @keydown.enter="(e) => handleEvent('create', e)"
        @keydown.delete="(e) => handleEvent('del', e)"
      />
    </div>
    <!-- clear-btn -->
    <yc-icon-button
      v-if="showClearBtn"
      name="close"
      class="yc-input-tag-clear-button"
      @click="(e) => handleEvent('clear', e)"
    />
    <!-- suffix-icon -->
    <div v-if="$slots.suffix" class="yc-input-tag-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { SIZE_CLASS } from './constants';
import { InputTagProps, InputTagValue, TagData, RetainValue } from './type';
import { SIZE_MAP } from '@/components/_constants';
import { isBoolean, isObject } from '@/components/_utils/is';
import { useElementSize } from '@vueuse/core';
import { nanoid } from 'nanoid';
import useControlValue from '../_hooks/useControlValue';
import YcTag from '@/components/Tag/index.vue';

defineOptions({
  name: 'InputTag',
});
const props = withDefaults(defineProps<InputTagProps>(), {
  modelValue: undefined,
  defaultValue: () => [],
  inputValue: undefined,
  defaultInputValue: '',
  placeholder: '',
  disabled: false,
  error: false,
  readonly: false,
  allowClear: false,
  size: 'medium',
  maxTagCount: 5,
  retainInputValue: false,
  formatTag: (data: TagData) => {
    return data.label;
  },
  uniqueValue: false,
  tagNowrap: false,
  enterToCreate: true,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:inputValue', value: string): void;
  (e: 'inputValueChange', value: string, ev: Event): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
  (e: 'remove', ev: MouseEvent | KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'input', value: string): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const {
  modelValue,
  defaultValue,
  inputValue,
  defaultInputValue,
  size,
  allowClear,
  disabled,
  readonly,
  uniqueValue,
  retainInputValue,
  enterToCreate,
  maxTagCount,
} = toRefs(props);
// 输入实例
const inputRef = ref<HTMLInputElement>();
// div的ref
const mirrorRef = ref<HTMLDivElement>();
// 获取miorr的宽度用于模拟
const { width } = useElementSize(mirrorRef, undefined, {
  box: 'border-box',
});
// 受控值
const computedValue = useControlValue<InputTagValue>(
  modelValue,
  defaultValue.value,
  (val) => emits('update:modelValue', val)
);
// 输入值
const computedInputValue = useControlValue<string>(
  inputValue,
  defaultInputValue.value,
  (val) => emits('update:inputValue', val)
);
// 当前展示的list
const curList = computed(() => {
  const handleList = computedValue.value.map((item: TagData) => {
    return isObject(item)
      ? {
          id: nanoid(),
          ...item,
        }
      : {
          id: nanoid(),
          label: item,
          value: item,
        };
  });
  return {
    handleList,
    showList:
      maxTagCount.value > 0
        ? handleList.slice(0, maxTagCount.value)
        : handleList,
    hideList: handleList.slice(maxTagCount.value).length,
  };
});
// 是否展示清除按钮
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !readonly.value &&
    computedValue.value.length
);
// 清除输入值
const clearInputValue = () => {
  // 是否保留值
  if (
    (isBoolean(retainInputValue.value) && retainInputValue.value) ||
    (retainInputValue.value as RetainValue)?.create
  ) {
    return;
  }
  computedInputValue.value = '';
};
// 处理inputTag的事件
const handleEvent = (
  type: string,
  e: MouseEvent | KeyboardEvent | FocusEvent,
  id?: string
) => {
  const inputVal = computedInputValue.value?.trim();
  // 创建
  if (type == 'create') {
    if (
      !enterToCreate.value ||
      !inputVal ||
      (uniqueValue.value &&
        computedValue.value.find(
          (item: TagData) => (item?.value ?? item) == inputVal
        ))
    ) {
      return;
    }
    // 处理添加tag的类型
    const type =
      !computedValue.value.length || !isObject(computedValue.value[0])
        ? 'string'
        : 'object';
    if (type == 'string') {
      computedValue.value = [...computedValue.value, computedInputValue.value];
    } else {
      computedValue.value = [
        ...computedValue.value,
        {
          label: computedInputValue.value,
          value: computedInputValue.value,
          closeable: true,
          tagProps: {
            bordered: true,
          },
        },
      ];
    }
    emits('pressEnter', e as KeyboardEvent);
    clearInputValue();
  }
  // 点击tag关闭见
  else if (type == 'close') {
    computedValue.value = (computedValue.value as TagData[]).filter(
      (_, index) => curList.value.handleList[index].id != id
    );
    emits('remove', e as MouseEvent);
  }
  // 点击del健
  else if (type == 'del') {
    if (inputVal || !computedValue.value?.length) return;
    computedValue.value = computedValue.value.slice(
      0,
      computedValue.value.length - 1
    );
    emits('remove', e as MouseEvent);
  }
  // 清除
  else if (type == 'clear') {
    computedValue.value = [];
    emits('clear', e as MouseEvent);
  }
  // 失焦
  else if (type == 'blur') {
    emits('blur', e as FocusEvent);
    clearInputValue();
  }
};

// 暴露方法
defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
  getValue() {
    return computedValue.value;
  },
});
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
