<template>
  <div class="test">
    <a-typography-title
      :heading="1"
      deletable
      code
      bold
      mark
      underline
      editable
      copyable
      v-model:editText="value"
    >
      H1. The Pragmatic Romanticism
    </a-typography-title>
    <yc-typography-title
      :heading="1"
      deletable
      code
      bold
      mark
      underline
      editable
      copyable
      v-model:editText="value"
    >
      H1. The Pragmatic Romanticism
    </yc-typography-title>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref('312321');
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
