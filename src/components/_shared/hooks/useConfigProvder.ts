import { toRefs, inject, ref, isReactive } from 'vue';
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
  let size;
  let zIndex;
  let updateAtScroll;
  let scrollToClose;
  let popupContainer;
  let exchangeTime;
  if (isReactive(props)) {
    // 接收属性
    const {
      zIndex: _zIndex,
      size: _size,
      updateAtScroll: _updateAtScroll,
      scrollToClose: _scrollToClose,
      exchangeTime: _exchangeTime,
      popupContainer: _popupContainer,
    } = toRefs(props);
    zIndex = _zIndex;
    size = _size;
    updateAtScroll = _updateAtScroll;
    scrollToClose = _scrollToClose;
    exchangeTime = _exchangeTime;
    popupContainer = _popupContainer;
  } else {
    const {
      zIndex: _zIndex,
      size: _size,
      updateAtScroll: _updateAtScroll,
      scrollToClose: _scrollToClose,
      exchangeTime: _exchangeTime,
      popupContainer: _popupContainer,
    } = props;
    zIndex = ref(_zIndex);
    size = ref(_size);
    updateAtScroll = ref(_updateAtScroll);
    scrollToClose = ref(_scrollToClose);
    popupContainer = ref(_popupContainer);
    exchangeTime = ref(_exchangeTime);
  }
  return {
    zIndex: _zIndex,
    size: !isUndefined(size?.value) ? size : _size,
    updateAtScroll: !isUndefined(updateAtScroll?.value)
      ? updateAtScroll
      : _updateAtScroll,
    scrollToClose: !isUndefined(scrollToClose?.value)
      ? updateAtScroll
      : _updateAtScroll,
    popupContainer: !isUndefined(popupContainer?.value)
      ? popupContainer
      : _popupContainer,
    exchangeTime: !isUndefined(exchangeTime?.value)
      ? exchangeTime
      : _exchangeTime,
  };
};
