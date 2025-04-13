<template>
  <div class="yc-transfer-view">
    <div class="yc-transfer-view-header">
      <span class="yc-transfer-view-header-title">
        <yc-checkbox
          :disabled="!data.length"
          :indeterminate="selected.length < data.length"
        >
          <slot name="source-title"> Source </slot>
        </yc-checkbox>
      </span>
      <span class="yc-transfer-view-header-count"
        >{{ selected.length }} /{{ data.length }}
      </span>
    </div>
    <!--v-if-->
    <div class="yc-transfer-view-body">
      <yc-empty v-if="!data.length" />
      <yc-scrollbar v-else auto-fill style="max-height: 180px">
        <div class="yc-list-wrapper yc-transfer-view-list">
          <yc-spin class="yc-list-spin">
            <div role="list" class="yc-list-content">
              <div
                v-for="item in data"
                :key="item.value"
                class="yc-transfer-list-item"
              >
                <yc-checkbox
                  :default-checked="selected.includes(item.value as string)"
                  @change="
                    (isSelected) =>
                      handleChange(isSelected, item.value as string)
                  "
                >
                  {{ item.label }}
                </yc-checkbox>
              </div>
            </div>
          </yc-spin>
        </div>
      </yc-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { TransferItem } from './type';
import YcEmpty from '@/components/Empty';
import YcCheckbox from '@/components/Checkbox';
import YcScrollbar from '@/components/Scrollbar';
import YcSpin from '@/components/Spin';
const props = defineProps<{
  selected: string[];
  data: TransferItem[];
}>();
const emits = defineEmits<{
  (e: 'update:selected', value: string[]): void;
}>();
const { data, selected } = toRefs(props);
// 处理改变
const handleChange = (isSelected: boolean, value: string) => {
  if (isSelected) {
    emits('update:selected', [...selected.value, value]);
  } else {
    emits(
      'update:selected',
      selected.value.filter((v) => v != value)
    );
  }
};
</script>

<style lang="less" scoped>
.yc-transfer-view {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 200px;
  height: 224px;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 2px;

  .yc-transfer-view-header {
    height: 40px;
    padding: 0 10px;
    color: rgb(29, 33, 41);
    font-weight: 500;
    font-size: 14px;
    line-height: 40px;
    background-color: rgb(247, 248, 250);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .yc-transfer-view-header-count {
      color: rgb(134, 144, 156);
      font-size: 12px;
      font-weight: 400;
    }
  }
  .yc-transfer-view-body {
    height: calc(100% - 40px);
    .yc-transfer-view-list {
      height: 100%;
      .yc-list-spin {
        height: 100%;
        width: 100%;
        .yc-list-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          .yc-transfer-list-item {
            padding: 0 12px;
            line-height: 36px;
            font-size: 14px;
            color: rgb(29, 33, 41);
            text-align: left;
            display: flex;
            align-items: center;
            transition: all 0.1s cubic-bezier(0, 0, 1, 1);
            &:hover {
              color: rgb(29, 33, 41);
              background-color: rgb(242, 243, 245);
            }
          }
        }
      }
    }
  }
}
</style>
