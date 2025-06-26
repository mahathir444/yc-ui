<template>
  <li
    tabindex="0"
    role="menuitem"
    :class="[
      'yc-cascader-option',
      {
        'yc-cascader-option-selected': checked || indeterminate,
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
      <component :is="renderLabel" />
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
const { label, value, disabled, level, children, nodePath } = toRefs(props);
// 接收注入
const {
  computedValue,
  pathMode,
  curLevel,
  curPath,
  multiple,
  expandTrigger,
  expandChild,
  slots,
  getOption,
  getValueKey,
  blur,
} = useContext().inject();
// 获取所有的子叶节点
const leafNodes = computed(() => {
  return children.value.length
    ? getLeafNodes(children.value)
    : [getOption(value.value!)];
});
// 判断是否是子叶节点
const isLeafNode = computed(() => {
  return !children.value.length;
});
// 是否全选
const checked = computed(() => {
  if (!computedValue.value) {
    return false;
  }
  if (!multiple.value) {
    const option = getOption(computedValue.value) ?? {};
    return option.nodePath?.some((node) => {
      return getValueKey(node.value!) == getValueKey(value.value);
    });
  }
  const valueOptions = (computedValue.value as CascaderOptionValue[]).map(
    (v) => {
      return getOption(v) ?? {};
    }
  );
  if (isLeafNode.value) {
    return valueOptions.some(
      (option) => getValueKey(option?.value) == getValueKey(value.value)
    );
  }
  const valueMap = Object.fromEntries(
    valueOptions.map((option) => [getValueKey(option?.value), option])
  );
  return leafNodes.value.every((node) => valueMap[getValueKey(node.value)]);
});
// 是否半选
const indeterminate = computed(() => {
  if (isLeafNode.value || !multiple.value) {
    return false;
  }
  const valueOptions = (computedValue.value as CascaderOptionValue[]).map(
    (v) => {
      return getOption(v) ?? {};
    }
  );
  const valueMap = Object.fromEntries(
    valueOptions.map((option) => [getValueKey(option.value), option])
  );
  return leafNodes.value.some((node) => valueMap[getValueKey(node.value)]);
});
// 处理对选
const handleMuti = (checked: boolean) => {
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
      ...leafNodes.value
        .map((item) => {
          return pathMode.value
            ? item.nodePath!.map((v) => v.value)
            : item.value;
        })
        .filter((item) => {
          return !valueMap[getValueKey(item!)];
        }),
    ];
    curLevel.value = leafNodes.value?.[0]?.level ?? curLevel.value;
    curPath.value =
      leafNodes.value?.[0]?.nodePath?.map((item) => item.index!) ??
      curPath.value;
  } else {
    // 计算当前的valueMap
    const valueMap = Object.fromEntries(
      leafNodes.value
        .map((item) => {
          return pathMode.value
            ? item.nodePath!.map((v) => v.value)
            : item.value;
        })
        .map((v) => {
          return [getValueKey(v), v];
        })
    );
    // 过滤值
    computedValue.value = curValue.filter((item) => {
      return !valueMap[getValueKey(item!)];
    });
    curLevel.value = level.value;
    curPath.value = nodePath.value.map((item) => item.index!);
  }
};
// 处理点击
const handleEvent = (type: 'click' | 'hover') => {
  if (disabled.value) {
    return;
  }
  // 处理展开
  if (!isLeafNode.value && expandTrigger.value == type) {
    curLevel.value = expandChild.value
      ? leafNodes.value[0].level!
      : level.value + 1;
    curPath.value = expandChild.value
      ? leafNodes.value[0].nodePath!.map((item) => item.index!)
      : nodePath.value.map((item) => item.index!);
  }
  // 处理点击
  if (isLeafNode.value && type == 'click' && !multiple.value) {
    computedValue.value = pathMode.value
      ? nodePath.value.map((item) => item.value)
      : value.value;
    blur();
  }
};
// 渲染label
const renderLabel = () => {
  return (
    slots.option?.({
      data: props,
    }) ?? label.value
  );
};
</script>

<style lang="less" scoped>
@import './style/option.less';
</style>
