<template>
  <div></div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { PageHeaderProp } from './type';
defineOptions({
  name: 'PageHeader',
});
withDefaults(defineProps<PageHeaderProp>(), {
  title: '',
  subtitle: '',
  showBack: true,
});
defineEmits<{
  (e: 'back', ev: Event): void;
}>();
</script>

<style lang="less" scoped></style>
