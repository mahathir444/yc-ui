import { toRefs, inject, ref, isReactive, reactive } from 'vue';
import { CONFIG_PROVIDER_PROVIDE_KEY } from '../constants';
import { ConfigProviderProvide } from '@/components/ConfigProvider';
import { isUndefined } from '../utils';

export default (props: Record<string, any> = {}) => {
  // 接收值
  const {
    zIndex: _zIndex,
    size: _size,
    updateAtScroll: _updateAtScroll,
    scrollToClose: _scrollToClose,
    exchangeTime: _exchangeTime,
    popupContainer: _popupContainer,
  } = inject<ConfigProviderProvide>(CONFIG_PROVIDER_PROVIDE_KEY, {
    zIndex: ref(1001),
    size: ref('medium'),
    updateAtScroll: ref(false),
    scrollToClose: ref(false),
    exchangeTime: ref(true),
    popupContainer: ref('body'),
  });
  // 接收属性
  const { size, updateAtScroll, scrollToClose, exchangeTime, popupContainer } =
    toRefs(isReactive(props) ? props : reactive(props));
  console.log(_scrollToClose, 'configProvider');
  console.log(scrollToClose, 'component');
  return {
    zIndex: _zIndex,
    size: !isUndefined(size?.value) ? size : _size,
    updateAtScroll: !isUndefined(updateAtScroll?.value)
      ? updateAtScroll
      : _updateAtScroll,
    scrollToClose: !isUndefined(scrollToClose?.value)
      ? scrollToClose
      : _scrollToClose,
    popupContainer: !isUndefined(popupContainer?.value)
      ? popupContainer
      : _popupContainer,
    exchangeTime: !isUndefined(exchangeTime?.value)
      ? exchangeTime
      : _exchangeTime,
  };
};
