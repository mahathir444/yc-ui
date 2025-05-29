<template>
  <yc-option v-if="item.type == 'option'" :value="item.value">
    {{ item.label }}
  </yc-option>
  <yc-dsubmenu v-else>
    {{ item.label }}
    <template #content>
      <template v-for="v in item.children" :key="v.label">
        <yc-doption v-if="v.type == 'option'" :value="v.value">
          {{ item.label }}
        </yc-doption>
        <dropdown-content v-else :item="v" />
      </template>
    </template>
  </yc-dsubmenu>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'DropdownContent',
});
defineProps<{
  item: {
    type: 'option' | 'submenu';
    label: string;
    value: string;
    children?: {
      type: 'option' | 'submenu';
      label: string;
      value: string;
      children?: [];
    }[];
  };
}>();
</script>
