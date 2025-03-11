import { ref, provide, inject, watch } from 'vue';
import { nanoid } from 'nanoid';
import { Fn } from '../_type';
export default (hideCallback?: Fn) => {
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
  //   判断是否在一个组内
  const isSameGroup = (el: HTMLElement): boolean => {
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
  // 检测层级的改变自动关闭
  watch(curLevel, (v) => {
    if (v >= level) return;
    hideCallback && hideCallback();
  });
  return {
    level,
    curLevel,
    groupId,
    groupIds,
    isSameGroup,
  };
};
