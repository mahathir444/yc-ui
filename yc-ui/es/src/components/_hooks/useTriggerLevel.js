import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { nanoid } from "../../../node_modules/nanoid/index.browser.js";
import { inject, provide, watch } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
const useTriggerLevel = (hideCallback) => {
  const level = inject("level", -1) + 1;
  provide("level", level);
  const curLevel = inject("curLevel", ref(0));
  provide("curLevel", curLevel);
  const groupId = nanoid(32);
  const groupIds = inject("groupIds", ref([]));
  groupIds.value[level] = groupId;
  provide("groupIds", groupIds);
  const isSameGroup = (el) => {
    const groupId2 = el.getAttribute("data-group-id");
    console.log(el, groupIds.value);
    if (groupIds.value.includes(groupId2)) {
      return true;
    } else if (el.tagName == "BODY") {
      return false;
    } else {
      return isSameGroup(el.parentElement);
    }
  };
  watch(curLevel, (v) => {
    if (v >= level)
      return;
    hideCallback && hideCallback();
  });
  return {
    level,
    curLevel,
    groupId,
    groupIds,
    isSameGroup
  };
};
export {
  useTriggerLevel as default
};
