<template>
  <li
    tabindex="0"
    role="menuitem"
    :class="[
      'yc-cascader-option',
      {
        'yc-cascader-option-selected': isSelected,
        'yc-cascader-option-disabled': disabled,
      },
    ]"
    @click="handleClick"
  >
    <div class="yc-cascader-option-label">
      {{ label }}
      <icon-arrow-right v-if="children.length" />
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { CascaderOptionProps, CascaderOptionValue } from './type';
import { IconArrowRight } from '@shared/icons';
import { isArray } from '@shared/utils';
import useContext from './hooks/useContext';
const props = withDefaults(defineProps<CascaderOptionProps>(), {
  label: '',
  value: '',
  render: undefined,
  disabled: false,
  tagProps: () => {
    return {};
  },
  children: () => [],
  isLeaf: false,
  level: -1,
  index: -1,
  nodePath: () => [],
});
const { level, children, value, disabled, nodePath } = toRefs(props);
// 接收注入
const {
  computedValue,
  pathMode,
  curLevel,
  curPath,
  multiple,
  options,
  getValue,
  blur,
} = useContext().inject();
// 判断值是否相等
const isValueEqual = (v: any, v1: any) => {
  if (isArray(v) && isArray(v1)) {
    return (
      v.map((item) => getValue(item)).toString() ==
      v1.map((item) => getValue(item)).toString()
    );
  } else {
    return getValue(v) == getValue(v1);
  }
};
// 判断选项是否选中
const isOptionSelected = (v: CascaderOptionValue) => {
  const option = options.value.find((v1) => {
    return isValueEqual(
      v,
      v1.nodePath!.map((item) => item.value)
    );
  })!;
  return option.nodePath?.some((node) => {
    return isValueEqual(node.value, value.value);
  });
};
//是否选中
const isSelected = computed(() => {
  return multiple.value
    ? (computedValue.value as CascaderOptionValue[]).find((v) => {
        return isOptionSelected(v);
      })
    : computedValue.value && isOptionSelected(computedValue.value);
});
// 处理点击
const handleClick = () => {
  if (disabled.value) {
    return;
  }
  if (children.value.length) {
    curLevel.value = level.value + 1;
    curPath.value = nodePath.value.map((item) => item.index!);
  } else {
    computedValue.value = pathMode.value
      ? nodePath.value.map((item) => item.value)
      : value.value;
    blur();
  }
};
</script>

<style lang="less" scoped>
.yc-cascader-option {
  cursor: pointer;
  position: relative;
  height: 36px;
  min-width: 100px;
  background-color: transparent;
  color: rgb(29, 33, 41);
  font-size: 14px;
  line-height: 36px;
  transition: all 0.2s cubic-bezier(0, 0, 1, 1);
  display: flex;
  align-items: center;
  &:not(.yc-cascader-option-disabled):hover {
    background-color: rgb(242, 243, 245);
  }
  .yc-cascader-option-label {
    padding: 0 34px 0 12px;
    .yc-icon {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      color: rgb(78, 89, 105);
      font-size: 12px;
    }
  }
}
.yc-cascader-option-selected {
  background-color: rgb(242, 243, 245);
}
.yc-cascader-option-disabled {
  color: rgb(201, 205, 212);
  background-color: transparent;
  cursor: not-allowed;
}
</style>
