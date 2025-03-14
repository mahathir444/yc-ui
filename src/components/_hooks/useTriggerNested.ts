import { ref, inject, watch } from 'vue';
import { nanoid } from 'nanoid';
import { Fn } from '../_type';
import { ProvideType } from '@/components/Dropdown/type';
import { DROPDOWN_PROVIDE_KEY } from '@/components/_constants';
export default (hideCallback?: Fn) => {
  // 组件标识，用于标识submenu是否处于一个嵌套中
  const groupId = nanoid(32);
  /**
   * @param level 记录组件内部嵌套的层级,当curLevel小于level关闭
   * @param curLevel 记录当前的层级
   * @param groupIds 同一个submenu里面的groupId集合
   */
  const { level, curLevel, groupIds, hide } = inject<ProvideType>(
    DROPDOWN_PROVIDE_KEY,
    {
      level: -1,
      curLevel: ref(0),
      groupIds: ref([]),
      hideOnSelect: ref(false),
      hide: () => {},
      emits: () => {},
    }
  );
  // 设置level
  const selfLevel = level + 1;
  // 设置groupId
  groupIds.value[selfLevel] = groupId;
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
    hide,
    level: selfLevel,
    curLevel,
    groupId,
    groupIds,
    isSameGroup,
  };
};
