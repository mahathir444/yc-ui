<template>
  <div class="test">
    <div style="width: 300px">
      <yc-color-picker />
    </div>
    <!-- <div style="width: 300px">
      <yc-select
        :options="options"
        :max-tag-count="3"
        prefix-text="年纪"
        multiple
      />
    </div>
    <div style="width: 300px">
      <yc-input prefix-text="年纪" :max-length="100" show-word-limit />
      <a-button type="primary">测试</a-button>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import YcColorPicker from '@/components/ColorPicker/index.vue';
import YcSelect from '@/teaching-front/Select/index.vue';
import YcInput from '@/teaching-front/Input/index.vue';

const value = ref('dsadsa');
const options = [
  'Bytedance',
  'Bytedesign',
  'Bytenumner',
  '1',
  '2',
  '3',
  '4',
].map((item) => {
  return {
    label: item,
    value: item,
  };
});
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
</style>
