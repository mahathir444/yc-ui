<template>
  <yc-doption
    v-if="childNode.type == 'menuitem'"
    :value="childNode.path"
    :is-active="computedSelectedKeys == childNode.path"
    :style="{
      minWidth: '182px',
    }"
  >
    {{ childNode.label }}
  </yc-doption>
  <yc-dsubmenu
    v-else
    :option-style="{
      minWidth: '182px',
    }"
    :popup-max-height="popupMaxHeight"
    :trigger-props="triggerProps"
  >
    {{ childNode.label }}
    <template #content>
      <div v-for="v in childNode.children" :key="v.path">
        <pop-option
          :child-node="v"
          :computed-selected-keys="computedSelectedKeys"
          :trigger-props="triggerProps"
          :popupMaxHeight="popupMaxHeight"
        />
      </div>
    </template>
  </yc-dsubmenu>
</template>

<script lang="ts" setup>
import {
  Doption as YcDoption,
  Dsubmenu as YcDsubmenu,
} from '@/components/Dropdown';
import { TriggerProps } from '@/components/Trigger';
import { ChlidTreeNode } from '../type';
defineOptions({
  name: 'PopOption',
});
defineProps<{
  childNode: ChlidTreeNode;
  triggerProps: TriggerProps;
  popupMaxHeight: number;
  computedSelectedKeys: string;
}>();
</script>
