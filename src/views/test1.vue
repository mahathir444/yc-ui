<template>
  <div class="test1">
    <a-tag>svg demo</a-tag>
    <svg-icon name="loading" color="blue" :size="20" />
    <a-tag>slot demo</a-tag>
    <demo body="这是body" title="这是header">
      <template #default="record">
        <a-button type="primary" status="danger">哈哈</a-button>
        <a-button type="primary" status="danger">哈哈</a-button>
      </template>
      <template #header="record">
        <div>{{ record }}</div>
      </template>
    </demo>
    <a-button @click="handleClick"> 点击切换插槽 </a-button>
    <!-- <demo body="test2" title="tes3">
      <template v-slot:[slotName]="record">
        <div>
          {{ slotName + ',' + record.toString() }}
        </div>
      </template>
    </demo> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, useSlots } from 'vue';
import Demo from './demo/index.vue';
const slotName = ref<string>('default');

const handleClick = () => {
  slotName.value = slotName.value == 'default' ? 'header' : 'default';
  console.log(slotName.value, 'slotName');
};

const btnRef = ref(null);
const slots = useSlots();
onMounted(() => {
  console.log(btnRef.value);
});
</script>

<style lang="less" scoped>
.test1 {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.loading {
  font-size: 100px;
  color: black;
  &:hover {
    color: #000;
  }
}
</style>
