<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :popup-offset="4"
    :popup-container="popupContainer"
    :disabled="disabled"
    :unmount-on-close="false"
    position="bl"
    trigger="focus"
    animation-name="slide-dynamic-origin"
    prevent-focus
    v-bind="triggerProps"
  >
    <div
      :class="[
        'yc-cascader',
        {
          'yc-cascader-allow-clear': allowClear,
          'yc-cascader-allow-search': allowSearch,
        },
      ]"
    >
      <yc-input-tag
        v-if="multiple"
        v-model:input-value="computedInputValue"
        :model-value="selectOptions"
        :placeholder="placeholder"
        :readonly="isReadonly"
        :disabled="disabled"
        :size="size"
        :error="error"
        :max-tag-count="maxTagCount"
        :tag-nowrap="tagNowrap"
        ref="inputRef"
        @focus="handleEvent('focus')"
        @blur="handleEvent('blur')"
        @input="(v) => handleEvent('search', v)"
        @update:model-value="(v) => handleEvent('updateValue', v)"
      >
        <!-- suffix -->
        <template #suffix>
          <cascader-icon
            :popup-visible="computedVisible"
            :allow-search="allowSearch"
            :loading="loading"
            :show-clear-btn="showClearBtn"
            @clear="handleEvent('clear')"
          />
        </template>
      </yc-input-tag>
      <yc-input
        v-else
        v-model="computedInputValue"
        :show-input="computedVisible"
        :readonly="isReadonly"
        :disabled="disabled"
        :size="size"
        :error="error"
        :placeholder="selectOptions[0]?.label?.toString() || ''"
        ref="inputRef"
        @click="handleEvent('focus')"
        @blur="handleEvent('blur')"
        @input="(v) => handleEvent('search', v)"
      >
        <template #label>
          <slot name="label" :data="selectOptions[0]">
            <span
              :class="[
                {
                  'yc-input-placeholder': !selectOptions.length,
                },
              ]"
            >
              {{ selectOptions[0]?.label || placeholder }}
            </span>
          </slot>
        </template>
        <!-- suffix -->
        <template #suffix>
          <cascader-icon
            :popup-visible="computedVisible"
            :allow-search="allowSearch"
            :loading="loading"
            :show-clear-btn="showClearBtn"
            @clear="handleEvent('clear')"
          />
        </template>
      </yc-input>
    </div>
    <template #content>
      <cascader-panel />
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { CascaderProps, CascaderEmits, CascaderOptionValue } from './type';
import { sleep } from '@shared/utils';
import useContext from './hooks/useContext';
import { default as YcInput, InputInstance } from '@/components/Input';
import {
  default as YcInputTag,
  InputTagValue,
  TagData,
} from '@/components/InputTag';
import YcTrigger from '@/components/Trigger';
import CascaderPanel from './CascaderPanel.vue';
import CascaderIcon from './CascaderIcon.vue';
defineOptions({
  name: 'Cascader',
});
const props = withDefaults(defineProps<CascaderProps>(), {
  pathMode: false,
  multiple: false,
  modelValue: undefined,
  defaultValue: '',
  options: () => [],
  disabled: false,
  error: false,
  size: undefined,
  allowSearch: false,
  allowClear: false,
  inputValue: undefined,
  defaultInputValue: '',
  popupVisible: undefined,
  defaultPopupVisible: false,
  expandTrigger: 'click',
  placeholder: '',
  filterOption: (inputValue, option) => {
    return (
      option.label?.toLowerCase().includes(inputValue.toLowerCase()) || true
    );
  },
  popupContainer: undefined,
  maxTagCount: 0,
  formatLabel: undefined,
  triggerProps: () => {
    return {};
  },
  loading: false,
  searchDelay: 500,
  fieldNames: () => {
    return {};
  },
  valueKey: 'value',
  tagNowrap: false,
});
const emits = defineEmits<CascaderEmits>();
// 输入实例
const inputRef = ref<InputInstance>();
// 注入数据
const {
  computedValue,
  computedInputValue,
  computedVisible,
  searchDelay,
  multiple,
  pathMode,
  disabled,
  allowClear,
  allowSearch,
  loading,
  selectOptions,
  options,
  curLevel,
  curPath,
  getValue,
} = useContext().provide(props, emits, inputRef);
// 是否展示清除按钮
const showClearBtn = computed(() => {
  let hasValue = true;
  if (pathMode.value) {
    hasValue = multiple.value
      ? computedValue.value.flat(1).length
      : computedValue.value.length;
  } else {
    hasValue = multiple.value
      ? computedValue.value.length
      : computedValue.value;
  }
  return allowClear.value && !disabled.value && !loading.value && !!hasValue;
});
// 是否只读
const isReadonly = computed(() => {
  return !allowSearch.value || loading.value;
});
// 处理事件
const handleEvent = async (
  type: string,
  value: string | InputTagValue = ''
) => {
  switch (type) {
    case 'clear':
      {
        computedValue.value = multiple.value || pathMode.value ? [] : '';
        emits('clear');
      }
      break;
    case 'search':
      {
        await sleep(searchDelay.value);
        emits('search', value as string);
      }
      break;
    case 'focus':
      {
        if (disabled.value) return;
        if (computedVisible.value) {
          return inputRef.value?.blur();
        }
        computedVisible.value = true;
        // 计算回显的面板
        const target = options.value.find((option) => {
          if (pathMode.value) {
            const curValue = multiple.value
              ? computedValue.value[0]
              : computedValue.value;
            return (
              curValue
                .map((value: CascaderOptionValue) => getValue(value))
                .join('-') ==
              option.nodePath?.map((item) => getValue(item.value!)).join('-')
            );
          } else {
            const curValue = multiple.value
              ? computedValue.value[0]
              : computedValue.value;
            return getValue(curValue) == getValue(option.value!);
          }
        });
        if (target) {
          curPath.value = target.nodePath!.map((item) => item.index!);
          curLevel.value = target.level!;
        }
        await sleep(0);
        inputRef.value?.focus();
      }
      break;
    case 'blur':
      {
        computedVisible.value = false;
        computedInputValue.value = '';
      }
      break;
    case 'updateValue':
      {
        computedValue.value = (value as InputTagValue).map(
          (item) => (item as TagData).value
        );
      }
      break;
  }
};
</script>

<style lang="less" scoped>
@import './style/cascader.less';
</style>
