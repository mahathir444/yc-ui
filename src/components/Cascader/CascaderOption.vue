<template>
  <li
    tabindex="0"
    role="menuitem"
    :class="[
      'yc-cascader-option',
      {
        'yc-cascader-option-selected': checked,
        'yc-cascader-option-disabled': disabled,
      },
    ]"
  >
    <yc-checkbox
      v-if="multiple"
      :disabled="disabled"
      :model-value="checked"
      :indeterminate="indeterminate"
      @update:model-value="handleMuti"
    />
    <div
      class="yc-cascader-option-label text-ellipsis"
      @mouseenter="handleEvent('hover')"
      @click="handleEvent('click')"
    >
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
import YcCheckbox from '@/components/Checkbox';
import { default as useContext, getLeafNodes } from './hooks/useContext';
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
const { value, disabled, level, children, nodePath } = toRefs(props);
// 接收注入
const {
  computedValue,
  optionMap,
  pathMode,
  curLevel,
  curPath,
  multiple,
  expandTrigger,
  getValue,
  getValueKey,
  blur,
} = useContext().inject();
// 是否全选
const checked = computed(() => {
  if (!multiple.value) {
    if (!computedValue.value) {
      return false;
    }
    const option = optionMap.value[getValueKey(computedValue.value)];
    return option.nodePath?.some((node) => {
      return getValueKey(node.value!) == getValueKey(value.value);
    });
  } else {
    const options = (computedValue.value as CascaderOptionValue[]).map((v) => {
      return optionMap.value[getValueKey(v)];
    });
    return;
  }
});
// 是否半选
const indeterminate = computed(() => {
  return false;
});
// 组装valueMap
const getValueMap = (value: CascaderOptionValue[]) => {
  return Object.fromEntries(
    value.map((v) => {
      const key = isArray(v)
        ? v.map((v1) => getValue(v1)).join('-')
        : getValue(v);
      return [key, v];
    })
  );
};
// 处理对选
const handleMuti = (val: boolean) => {
  const option = optionMap.value[getValueKey(value.value)];
  const leafNodes = getLeafNodes(option);
  const curValue = computedValue.value as CascaderOptionValue[];
  if (val) {
    const valueMap = getValueMap(curValue);
    computedValue.value = [
      ...curValue,
      ...leafNodes
        .map((item) => {
          return pathMode.value
            ? item.nodePath!.map((v) => v.value)
            : item.value;
        })
        .filter((item) => {
          return !valueMap[getValueKey(item!)];
        }),
    ];
  } else {
    const valueMap = getValueMap(
      leafNodes.map((item) => {
        return pathMode.value ? item.nodePath!.map((v) => v.value) : item.value;
      }) as CascaderOptionValue[]
    );
    computedValue.value = curValue.filter((item) => {
      return !valueMap[getValueKey(item!)];
    });
  }
};
// 处理点击
const handleEvent = (type: 'click' | 'hover') => {
  if (disabled.value) {
    return;
  }
  const isLeafNode = !children.value.length;
  // 处理展开
  if (!isLeafNode && expandTrigger.value == type) {
    curLevel.value = level.value + 1;
    curPath.value = nodePath.value.map((item) => item.index!);
  }
  // 处理点击
  if (isLeafNode && type == 'click' && !multiple.value) {
    computedValue.value = pathMode.value
      ? nodePath.value.map((item) => item.value)
      : value.value;
    blur();
  }
};
</script>

<style lang="less" scoped>
@import './style/option.less';
</style>
