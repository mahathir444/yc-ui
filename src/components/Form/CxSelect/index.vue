<template>
  <el-select
    :modelValue="modelValue"
    placeholder="请选择"
    popper-class="cx-select-popover"
    class="cx-select"
    v-bind="$attrs"
    @change="handleChange">
    <template
      v-if="showSearch"
      #header>
      <el-input
        v-model="keyword"
        placeholder="搜索">
        <template #prefix>
          <img :src="IconSearch" />
        </template>
      </el-input>
    </template>
    <!-- 搜索选项 -->
    <el-option
      v-for="item in showOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
      <span class="label">{{ item.label }}</span>
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { CxOption } from './typing';
import IconSearch from './icon/search.svg';
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    options?: CxOption[];
    showSearch?: boolean;
  }>(),
  {
    modelValue: '',
    showSearch: true,
    options: () => [],
  }
);
const emits = defineEmits<{
  (e: 'change', value: any): void;
  (e: 'update:modelValue', value: any): void;
}>();
const { options } = toRefs(props);
// 搜索关键字
const keyword = ref<string>('');
// 展示的选项
const showOptions = computed(() => {
  return options.value.filter((item) => item.label.includes(keyword.value));
});
// 处理发生改变
const handleChange = (v: any) => {
  emits('change', v);
  emits('update:modelValue', v);
};
</script>

<style lang="less">
.cx-select {
  width: 100%;
  .el-select__wrapper {
    border-radius: 4px;
    border: 1px solid #dedfe0;
    background: #fff;
    box-shadow: none !important;
    padding: 0 6px 0 10px;
  }
  .el-select__wrapper.is-focused {
    border: 1px solid #006ce2;
    box-shadow: 0px 0px 6px 0px rgba(0, 108, 226, 0.5);
  }
  .el-select__placeholder {
    color: #898989;
    font-family: 'PingFang SC';
    font-size: 14px;
    font-weight: 400;
  }
  .el-select__suffix {
    .el-icon {
      width: 20px;
      height: 20px;
      background-image: url('./icon/arrow-down.svg');
      svg {
        display: none !important;
      }
    }
  }
}
// 修改悬浮窗样式
.el-popper.cx-select-popover {
  border-radius: 4px;
  box-shadow: none !important;
  padding: 0 !important;
  overflow: hidden;
  margin-top: -8px;
  border: 1px solid #dedfe0;
  .el-select-dropdown {
    .el-select-dropdown__header {
      height: 30px;
      border: none;
      padding: 0 10px 0 7px;
      border-bottom: 1px solid #dedfe0;
      overflow: hidden;
      display: flex;
      align-items: center;
      .el-input {
        width: 100%;
        height: 100%;

        .el-input__wrapper {
          padding: 0 !important;
          border: none;
          box-shadow: none;
          .el-input__prefix {
            img {
              margin-right: 2px;
            }
          }
          .el-input__inner {
            font-family: 'PingFang SC';
            font-size: 14px;
            font-weight: 400;
            color: #4d4d4d;
            &::placeholder {
              color: #898989;
            }
          }
        }
      }
    }
    .el-scrollbar {
      height: 150px;
      overflow: auto;
      .el-select-dropdown__wrap {
        height: 100%;
        .el-select-dropdown__list {
          padding: 0 !important;
          .el-select-dropdown__item {
            flex-shrink: 0;
            height: 30px;
            display: flex;
            align-items: center;
            padding: 0;
            .label {
              height: 100%;
              color: #4d4d4d;
              font-family: 'PingFang SC';
              font-size: 14px;
              font-weight: 400;
              line-height: 30px;
              padding: 0 10px;
            }
          }
          .el-select-dropdown__item.is-disabled {
            span {
              color: #898989;
            }
          }
          .el-select-dropdown__item.is-selected {
            background: #e0efff !important;
            span {
              color: #006ce2;
            }
          }
          .el-select-dropdown__item.is-hovering {
            background: #f9f9fa;
          }
        }
      }
    }
  }
  .el-select-dropdown__empty {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-popper__arrow {
    display: none;
  }
}
</style>
