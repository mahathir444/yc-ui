<template>
  <div class="arco-upload-wrapper arco-upload-wrapper-type-text">
    <span class="arco-upload">
      <input type="file" style="display: none" />
      <yc-button type="primary">
        <template #icon>
          <icon-upload />
        </template>
        点击上传
      </yc-button>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { UploadProps, UploadEmits, UploadSlots, UploadExpose } from './type';
import { IconUpload } from '@shared/icons';
import YcButton from '@/components/Button';
defineOptions({
  name: 'Upload',
});
defineSlots<UploadSlots>();
const props = withDefaults(defineProps<UploadProps>(), {});
const emits = defineEmits<UploadEmits>();
</script>

<style lang="less" scoped></style>
