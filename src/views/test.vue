<template>
  <div class="test">
    <div style="width: 300px">
      <yc-select
        placeholder="请选择"
        :options="[
          {
            label: '1',
            value: 1,
          },
        ]"
      >
        <template #prefix>
          <a-button>提交</a-button>
        </template>
        <!-- <template #header>
          <a-input></a-input>
        </template> -->
        <yc-option v-for="i in 6" :key="i" :value="i" :label="i.toString()">
          <template #icon>
            <icon-align-center />
          </template>
          <template #suffix>
            <icon-align-center />
          </template>
        </yc-option>
        <template #footer>
          <a-button>提交</a-button>
        </template>
      </yc-select>
    </div>

    <div style="width: 300px">
      <a-select placeholder="请选择" allow-search allow-clear>
        <template #prefix>
          <a-button>提交</a-button>
        </template>
        <template #header>
          <a-input></a-input>
        </template>
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
        <template #footer>
          <a-button>提交</a-button>
        </template>
      </a-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import YcScrollbar from '@/components/Scrollbar';
import YcTag from '@/components/Tag/index.vue';
import YcSelect from '@/components/Select/Select.vue';
import YcOption from '@/components/Select/Option.vue';
import YcDropdown, { DOption as YcDoption } from '@/components/Dropdown';
import YcButton, { ButtonGroup } from '@/components/Button';
const total = ref(1);
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
