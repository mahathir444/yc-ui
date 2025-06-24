<template>
  <li
    tabindex="0"
    role="menuitem"
    class=""
    :class="[
      'yc-cascader-option',
      {
        'yc-cascader-option-selected': isSelected,
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
import { toRefs } from 'vue';
import { CascaderOptionProps } from './type';
import { IconArrowRight } from '@shared/icons';
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
  isSelected: false,
  level: -1,
  path: () => [],
  valuePath: () => [],
  labelPath: () => [],
});
const { path, level, children, value, valuePath, disabled } = toRefs(props);
// 接收注入
const { computedValue, computedVisible, pathMode, curLevel, curPath } =
  useContext().inject();
// 处理点击
const handleClick = () => {
  if (disabled.value) {
    return;
  }
  if (children.value.length) {
    const isAtCurLevel =
      curLevel.value == level.value + 1 &&
      curPath.value.join('-') == path.value.join('-');
    curLevel.value = isAtCurLevel ? level.value : level.value + 1;
    curPath.value = isAtCurLevel
      ? path.value.slice(0, path.value.length)
      : path.value;
  } else {
    computedValue.value = pathMode.value ? valuePath.value : value.value;
    computedVisible.value = false;
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
  &:hover {
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
</style>
