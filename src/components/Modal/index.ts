import { App, h, render } from 'vue';
import { ModalConfig, ModalMethod } from './type';
import _Modal from './Modal.vue';
import _ModalService from './ModalService.vue';

export type ModalInstance = InstanceType<typeof _Modal>;
export * from './type';

// modalcontainer
let container: HTMLDivElement;
const Modal = Object.assign(_Modal, {
  install: (app: App) => {
    app.component('Yc' + _Modal.name, _Modal);
  },
  open(props: ModalConfig) {
    // 挂在容器
    if (!container) {
      container = document.createElement('div');
      container.className = 'yc-overlay yc-overlay-modal';
      document.body.append(container);
    }
    // 关闭函数
    const close = () => {
      render(null, container as HTMLDivElement);
    };
    // 挂在vnode
    const vnode = h(_ModalService, {
      ...props,
      serviceCloseFn: close,
    });
    // 渲染 VNode 到容器
    render(vnode, container);
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
  ) as ModalMethod),
});

declare module 'vue' {
  export interface GlobalComponents {
    YcModal: typeof Modal;
  }
}

export default Modal;
