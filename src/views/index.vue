<template>
  <div class="main">
    <CxDatePicker />
    <CxDateRange />
    <div class="form-item">
      <CxSelect />
    </div>
    <div class="form-item">
      <CxRadio />
    </div>
    <ByteMd />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import CxDatePicker from '@/components/Form/CxDatePicker/index.vue';
import CxDateRange from '@/components/Form/CxDateRange/index.vue';
import CxSelect from '@/components/Form/CxSelect/index.vue';
import CxRadio from '@/components/Form/CxRadio/index.vue';
import ByteMd from '@/components/Editor/ByteMd/index.vue';
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  .form-item {
    width: 200px;
  }
}
</style>
