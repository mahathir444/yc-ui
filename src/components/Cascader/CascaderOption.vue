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
  getValueKey,
  blur,
} = useContext().inject();
// 是否全选
const checked = computed(() => {
  if (!computedValue.value) {
    return false;
  }
  if (!multiple.value) {
    const option = optionMap.value[getValueKey(computedValue.value)];
    return option.nodePath?.some((node) => {
      return getValueKey(node.value!) == getValueKey(value.value);
    });
  } else {
    const valueOptions = (computedValue.value as CascaderOptionValue[]).map(
      (v) => {
        return optionMap.value[getValueKey(v)];
      }
    );
    const valueMap = Object.fromEntries(
      valueOptions.map((option) => [getValueKey(option.value), option])
    );
    const leafNodes = getLeafNodes(props);
    const isLeaf = leafNodes[0].level == level.value;
    return isLeaf
      ? valueOptions.some(
          (option) => getValueKey(option.value) == getValueKey(value.value)
        )
      : leafNodes.every((node) => {
          return valueMap[getValueKey(node.value)];
        });
  }
});
// 是否半选
const indeterminate = computed(() => {
  const valueOptions = (computedValue.value as CascaderOptionValue[]).map(
    (v) => {
      return optionMap.value[getValueKey(v)];
    }
  );
  const valueMap = Object.fromEntries(
    valueOptions.map((option) => [getValueKey(option.value), option])
  );
  const leafNodes = getLeafNodes(props);
  const isLeaf = leafNodes[0].level == level.value;
  return isLeaf
    ? false
    : leafNodes.some((node) => {
        return valueMap[getValueKey(node.value)];
      });
});
// 处理对选
const handleMuti = (checked: boolean) => {
  // 拿到当前所有的子叶节点
  const leafNodes = getLeafNodes(props);
  // 处理当前的value
  const curValue = computedValue.value as CascaderOptionValue[];
  if (checked) {
    const valueMap = Object.fromEntries(
      curValue.map((v) => {
        return [getValueKey(v), v];
      })
    );
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
    // 计算当前的node
    const nodes = leafNodes.map((item) => {
      return pathMode.value ? item.nodePath!.map((v) => v.value) : item.value;
    }) as CascaderOptionValue[];
    // 计算当前的valueMap
    const valueMap = Object.fromEntries(
      nodes.map((v) => {
        return [getValueKey(v), v];
      })
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
