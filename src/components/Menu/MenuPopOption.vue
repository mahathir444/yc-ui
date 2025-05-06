<template>
  <yc-doption
    v-if="childNode.type == 'menuitem'"
    :value="childNode.path"
    :is-active="computedSelectedKeys == childNode.path"
  >
    {{ childNode.label }}
  </yc-doption>
  <yc-dsubmenu
    v-else
    :trigger-props="{
      autoFitPopupMinWidth: true,
      popupTranslate: [-4, 0],
      ...triggerProps,
    }"
    :popup-max-height="popupMaxHeight"
  >
    {{ childNode.label }}
    <template #content>
      <div v-for="v in childNode.children" :key="v.path">
        <pop-option
          :child-node="v"
          :mode="mode"
          :computed-selected-keys="computedSelectedKeys"
          :popupMaxHeight="popupMaxHeight"
          :trigger-props="triggerProps"
        />
      </div>
    </template>
  </yc-dsubmenu>
</template>

<script lang="ts" setup>
import { MenuMode } from './type';
import { TriggerProps } from '@/components/Trigger';
import { ChlidTreeNode } from './hooks/useMenuLevel';
import {
  Doption as YcDoption,
  Dsubmenu as YcDsubmenu,
} from '@/components/Dropdown';

defineOptions({
  name: 'PopOption',
});
defineProps<{
  childNode: ChlidTreeNode;
  triggerProps: TriggerProps;
  popupMaxHeight: number;
  computedSelectedKeys: string;
  mode: MenuMode;
}>();
</script>
