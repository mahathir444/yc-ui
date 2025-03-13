<template>
  <div class="test">
    <div style="width: 300px">
      <yc-select v-model="value" multiple placeholder="请选择">
        <YcOptionGroup label="分组1">
          <yc-option v-for="i in 20" :key="i" :value="i" :label="`选项${i}`">
          </yc-option>
        </YcOptionGroup>
      </yc-select>
    </div>

    <YcCheckbox> 测试 </YcCheckbox>

    <div style="width: 300px">
      <a-select placeholder="请选择" allow-search allow-clear>
        <a-option
          v-for="i in 6"
          :key="i"
          :value="i"
          :index="6 - i"
          :label="i.toString()"
        >
          <template #icon>
            <icon-align-center />
          </template>
          test{{ i }}
          <template #suffix>
            <icon-align-center />
          </template>
        </a-option>
      </a-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcSelect from '@/components/Select/Select.vue';
import YcOption from '@/components/Select/Option.vue';
import YcOptionGroup from '@/components/Select/Optgroup.vue';
import YcCheckbox from '@/components/Checkbox/index.vue';
const total = ref(1);
const value = ref([]);
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.popover-content {
  width: 200px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
}
</style>
