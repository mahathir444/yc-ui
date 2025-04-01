import { App, h, render } from 'vue';
import { ModalConfig, ModalMethods, ModalServiceData } from './type';
import { getComponentPrefix } from '@shared/utils/global-config';
import _ServiceModal from './component/ServiceModal.vue';
import _Modal from './index.vue';

export type ModalInstance = InstanceType<typeof _Modal>;
export type {
  ModalProps,
  ModalConfig,
  OnBeforeCancel,
  OnBeforeOk,
  ModalType,
  ModalMethod,
} from './type';

const Modal = Object.assign(_Modal, {
  modalConfig: {
    id: 'ycServiceModalContainer',
    container: null,
  },
  install: (app: App) => {
    app.component(getComponentPrefix() + _Modal.name, _Modal);
  },
  open(props: ModalConfig) {
    const modalConfig = this.modalConfig as ModalServiceData;
    if (!modalConfig.container) {
      const container = document.createElement('div');
      container.id = this.modalConfig.id;
      modalConfig.container = container;
      document.body.append(container);
    }
    // 关闭函数
    const close = () => {
      render(null, modalConfig.container as HTMLDivElement);
    };
    const { onOk: _onOk, onCancel: _onCancel } = props;
    const vnode = h(_ServiceModal, {
      ...props,
      async onOk() {
        await _onOk?.();
        close();
      },
      async onCancel() {
        await _onCancel?.();
        close();
      },
    });
    // 渲染 VNode 到容器
    render(vnode, modalConfig.container);
    return {
      close,
    };
  },
  ...(Object.fromEntries(
    ['info', 'warning', 'error', 'success'].map((type) => {
      return [
        type,
        (props: ModalConfig) => {
          return Modal.open({
            ...props,
            type,
          });
        },
      ];
    })
  ) as ModalMethods),
});

declare module 'vue' {
  export interface GlobalComponents {
    YcModal: typeof Modal;
  }
}

export default Modal;
