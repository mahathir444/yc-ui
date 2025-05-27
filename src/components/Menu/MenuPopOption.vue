<template>
  <yc-doption
    v-if="treeNode.type == 'menuitem'"
    :value="treeNode.path"
    :is-active="computedSelectedKeys == treeNode.path"
  >
    <component :is="treeNode.label" />
  </yc-doption>
  <yc-dsubmenu
    v-else
    :popup-max-height="popupMaxHeight"
    :trigger-props="{
      popupTranslate: [-4, 0],
      ...triggerProps,
    }"
  >
    <component :is="treeNode.label" />
    <template #content>
      <pop-option
        v-for="v in treeNode.children"
        :key="v.path"
        :tree-node="v"
        :popupMaxHeight="popupMaxHeight"
      />
    </template>
  </yc-dsubmenu>
</template>

<script lang="ts" setup>
import { default as useContext, MenuTreeNode } from './hooks/useContext';
import {
  Doption as YcDoption,
  Dsubmenu as YcDsubmenu,
} from '@/components/Dropdown';
defineOptions({
  name: 'PopOption',
});
defineProps<{
  treeNode: MenuTreeNode;
  popupMaxHeight: number;
}>();
const { inject } = useContext();
const { triggerProps, computedSelectedKeys, mode } = inject();
</script>
