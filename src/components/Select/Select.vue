<template>
  <yc-trigger
    v-model:popup-visible="popupVisible"
    trigger="click"
    :popup-offset="4"
    :content-style="{
      transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion],
    }"
    :unmount-on-close="false"
    :disabled="disabled"
    :click-out-side-ingore-fn="isCloseButton"
    position="bl"
    animation-name="slide-dynamic-origin"
    auto-fit-popup-min-width
    @position-change="(v) => (triggerPostion = v)"
  >
    <div
      :class="[
        'yc-select',
        allowSearch ? 'yc-select-allow-search' : '',
        allowClear && showClearBtn ? 'yc-select-allow-clear' : '',
      ]"
      @click="handleClick"
    >
      <yc-input
        v-model="computedInputValue"
        :placeholder="computedLabel"
        :readonly="!allowSearch || loading"
        :disabled="disabled"
        :size="size"
        :error="error"
        ref="inputRef"
        @blur="computedInputValue = ''"
      >
        <div
          v-if="!popupVisible"
          :class="{
            'text-ellipsis': true,
            'yc-input': true,
            'select-value-placeholder': !computedLabel,
          }"
        >
          {{ computedLabel || placeholder }}
        </div>
        <template #suffix>
          <!-- loading -->
          <yc-spin
            v-if="loading"
            :size="12"
            style="color: inherit"
            class="yc-select-loading-icon"
          />
          <template v-else>
            <!-- default -->
            <div class="yc-select-suffix-icon">
              <svg-icon name="arrow-left" />
            </div>
            <!-- search -->
            <div class="yc-select-search-icon">
              <svg-icon name="search" />
            </div>
            <!-- clear -->
            <yc-icon-button
              v-if="showClearBtn"
              name="close"
              style="color: inherit"
              class="yc-select-clear-icon"
              @click.stop="handleClear"
            />
          </template>
        </template>
      </yc-input>
    </div>
    <template #content>
      <div class="yc-select-dropdown">
        <yc-scrollbar style="height: 200px; overflow: auto">
          <div class="yc-select-dropdown-list">
            <slot />
          </div>
        </yc-scrollbar>
      </div>
    </template>
  </yc-trigger>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, CSSProperties, provide, toRefs } from 'vue';
import { TRANSFORM_ORIGIN_MAP } from '@/components/Trigger/constants';
import { TriggerPostion } from '@/components/Trigger';
import { SelectProps, SelectValue } from './type';
import useSelectControlValue from '../_hooks/useSeletControlValue';
import { sleep } from '@/components/_utils/fn';
import YcInput, { InputInstance } from '@/components/Input';
import YcTrigger from '@/components/Trigger/index.vue';
import YcScrollbar from '@/components/Scrollbar/index.vue';
import YcSpin from '@/components/Spin/index.vue';
import YcIconButton from '@/components/_components/IconButton/index.vue';
const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  defaultValue: '',
  inputValue: undefined,
  defaultInputValue: '',
  size: 'medium',
  placeholder: '',
  loading: false,
  disabled: false,
  error: false,
  allowClear: true,
  allowSearch: true,
});
const emits = defineEmits<{
  (e: 'change', value: SelectValue): void;
  (e: 'input-value-change', value: string): void;
  (e: 'update:modelValue', value: SelectValue): void;
  (e: 'update:inputValue', value: SelectValue): void;
}>();
const {
  modelValue,
  defaultValue,
  inputValue,
  defaultInputValue,
  allowClear,
  disabled,
  loading,
} = toRefs(props);
// 当前的位置
const triggerPostion = ref<TriggerPostion>('bl');
// 输入实例
const inputRef = ref<InputInstance>();
// 处理值
const { computedInputValue, computedValue, computedLabel, popupVisible } =
  useSelectControlValue({
    modelValue,
    defaultValue,
    defaultInputValue,
    inputValue,
    emits,
  });
// 是否展示清除按钮
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !loading.value &&
    String(computedValue.value).length
);
// 判断是否是关闭按钮,从而不关闭选项
const isCloseButton = (el: HTMLElement): boolean => {
  const classList = el.classList;
  if (classList.contains('yc-select-clear-icon')) {
    return true;
  } else if (el.tagName == 'BODY') {
    return false;
  } else {
    return isCloseButton(el.parentElement as HTMLElement);
  }
};
// 处理点击
const handleClick = async () => {
  popupVisible.value = !popupVisible.value;
  if (popupVisible.value) {
    await sleep(0);
    inputRef.value?.focus();
  } else {
    inputRef.value?.blur();
  }
};
// 处理清除
const handleClear = () => {
  computedValue.value = '';
  computedLabel.value = '';
};
</script>

<style lang="less" scoped>
@import '../Input/index.less';
.yc-select {
  width: 100%;
  height: fit-content;

  &:focus-within {
    .yc-select-suffix-icon {
      transform: rotate(270deg);
    }
  }

  .yc-select-suffix-icon,
  .yc-select-search-icon {
    font-size: 12px;
    color: inherit;
    &.yc-select-suffix-icon {
      transform: rotate(90deg);
    }
  }

  .yc-select-clear-icon,
  .yc-select-search-icon {
    display: none;
  }

  .yc-input.select-value-placeholder {
    color: rgb(134, 144, 156);
  }
}
// search
.yc-select-allow-search {
  &:focus-within {
    .yc-select-clear-icon,
    .yc-select-suffix-icon {
      display: none;
    }
    .yc-select-search-icon {
      display: block;
    }
  }
}
// clear
.yc-select-allow-clear {
  &:hover {
    .yc-select-search-icon,
    .yc-select-suffix-icon {
      display: none;
    }
    .yc-select-clear-icon {
      display: flex;
    }
  }
}
// select-dropdown样式
.yc-select-dropdown {
  padding: 4px 0;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
  .yc-select-dropdown-list {
    display: flex;
    flex-direction: column;
    .yc-select-option {
      flex-shrink: 0;
    }
  }
}
</style>
