<template>
  <yc-optgroup v-if="option.isGroup" :label="option.label">
    <yc-option
      v-for="v in option.options"
      :key="(v as ObjectData)[fieldKey.value]"
      :value="(v as ObjectData)[fieldKey.value]"
      :label="(v as ObjectData)[fieldKey.label]"
      :disabled="(v as ObjectData)[fieldKey.disabled]"
    />
  </yc-optgroup>
  <yc-option
    v-else
    :value="(option as ObjectData)[fieldKey.value]"
    :label="(option as ObjectData)[fieldKey.label]"
    :disabled="(option as ObjectData)[fieldKey.disabled]"
  />
</template>

<script lang="ts" setup>
import { ObjectData } from '@/components/_type';
import YcOption from '../Option.vue';
import YcOptgroup from '../Optgroup.vue';
defineProps<{
  option: ObjectData;
  fieldKey: Record<string, string>;
}>();
</script>
