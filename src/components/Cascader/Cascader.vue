<template>
  <yc-trigger
    v-model:popup-visible="computedVisible"
    :popup-offset="4"
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
        :size="size"
        :disabled="disabled"
        :readonly="isReadonly"
        :error="error"
        :max-tag-count="maxTagCount"
        :tag-nowrap="tagNowrap"
        :placeholder="placeholder"
        ref="inputRef"
        @focus="handleEvent('focus')"
        @blur="handleEvent('blur')"
        @input="(v) => handleEvent('search', v)"
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
        :size="size"
        :disabled="disabled"
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
import { CascaderProps, CascaderEmits } from './type';
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
  //   formatLabel: (option:) => {

  // },
  triggerProps: () => {
    return {};
  },
  loading: false,
  valueKey: 'value',
});
const emits = defineEmits<CascaderEmits>();
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
} = useContext().provide(props, emits);
// 输入实例
const inputRef = ref<InputInstance>();
// 是否展示清除按钮
const showClearBtn = computed(() => {
  const hasValue = multiple.value
    ? computedValue.value.length
    : String(computedValue.value).length;
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
        const target = options.value.find((item) => {
          if (pathMode.value) {
            const optionPath = item.path?.join('');
            return multiple.value
              ? computedValue.value?.[0]?.join('') == optionPath
              : computedValue.value.join('') == optionPath;
          } else {
            return multiple.value
              ? computedValue.value?.[0] == item.value
              : computedValue.value == item.value;
          }
        });
        if (target) {
          curPath.value = target.path!;
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
  }
};
</script>

<style lang="less" scoped>
@import './style/cascader.less';
// allow-search
.yc-cascader-allow-search {
  &:deep(.yc-cascader-search-icon) {
    display: none;
  }
  &:focus-within {
    &:deep(.yc-cascader-clear-icon),
    &:deep(.yc-cascader-suffix-icon) {
      display: none;
    }
    &:deep(.yc-cascader-search-icon) {
      display: block;
    }
  }
  &:deep(.yc-input-outer) {
    .yc-input-wrapper {
      .yc-input {
        &::placeholder {
          color: rgb(134, 144, 156);
        }
      }
    }
  }
}
// allow-clear
.yc-cascader-allow-clear {
  &:deep(.yc-cascader-clear-icon) {
    display: none;
  }
  &:hover {
    &:deep(.yc-cascader-search-icon),
    &:deep(.yc-cascader-suffix-icon) {
      display: none;
    }
    &:deep(.yc-cascader-clear-icon) {
      display: flex;
    }
  }
}
</style>
