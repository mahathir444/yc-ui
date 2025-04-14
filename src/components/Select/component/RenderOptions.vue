<template>
  <template v-for="option in renderOptions" :key="option.id">
    <template v-if="(option as ObjectData).isGroup">
      <yc-optgroup :label="option.label">
        <yc-option
          v-for="v in (option as ObjectData).options"
          :key="(v as ObjectData)[fieldKey.value]"
          :value="(v as ObjectData)[fieldKey.value]"
          :label="(v as ObjectData)[fieldKey.label]"
          :disabled="(v as ObjectData)[fieldKey.disabled]"
        />
      </yc-optgroup>
    </template>
    <template v-else>
      <yc-option
        :value="(option as ObjectData)[fieldKey.value]"
        :label="(option as ObjectData)[fieldKey.label]"
        :disabled="(option as ObjectData)[fieldKey.disabled]"
      />
    </template>
  </template>
</template>

<script lang="ts" setup>
import { SelectOptions } from '../type';
import { ObjectData } from '@shared/type';
import YcOption from '../Option.vue';
import YcOptgroup from '../Optgroup.vue';
defineProps<{
  renderOptions: SelectOptions;
  fieldKey: Record<string, string>;
}>();
</script>
