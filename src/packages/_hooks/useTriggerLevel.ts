import { ref, provide, inject } from 'vue';
import { nanoid } from 'nanoid';
export default () => {
  // 记录组件内部嵌套的层级,当curLevel小于level关闭
  const level = inject('level', -1) + 1;
  provide('level', level);
  const curLevel = inject('curLevel', ref(0));
  provide('curLevel', curLevel);
  // 组件标识，用于标识submenu是否处于一个嵌套中
  const groupId = nanoid(32);
  //同一个submenu里面的groupId集合
  const groupIds = inject('groupIds', ref([] as string[]));
  groupIds.value[level] = groupId;
  provide('groupIds', groupIds);
  const isSameGroup = (el: HTMLElement) => {
    const groupId = el.getAttribute('data-group-id') as string;
    console.log(el, groupIds.value);
    if (groupIds.value.includes(groupId)) {
      return true;
    } else if (el.tagName == 'BODY') {
      return false;
    } else {
      return isSameGroup(el.parentElement as HTMLElement);
    }
  };
  return {
    level,
    curLevel,
    groupId,
    groupIds,
    isSameGroup,
  };
};
