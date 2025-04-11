import { App } from 'vue';
import _Breadcrumb from './Breadcrumb.vue';
import _BreadcrumbItem from './BreadcrumbItem.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type ButonInstance = InstanceType<typeof _Breadcrumb>;
export type ButonItemInstance = InstanceType<typeof _BreadcrumbItem>;
export * from './type';

const Breadcrumb = Object.assign(_Breadcrumb, {
  Item: _BreadcrumbItem,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Breadcrumb.name, _Breadcrumb);
    app.component(getComponentPrefix() + _BreadcrumbItem.name, _BreadcrumbItem);
  },
});
export { _BreadcrumbItem as BreadcrumbItem };

declare module 'vue' {
  export interface GlobalComponents {
    YcBreadcrumb: typeof Breadcrumb;
    YcBreadcrumbItem: typeof _BreadcrumbItem;
  }
}

export default Breadcrumb;
