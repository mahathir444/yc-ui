import { App } from 'vue';
import _Tab from './Tab.vue';
import _TabPane from './TabPane.vue';

export type TabInstance = InstanceType<typeof _Tab>;
export type TabPaneInstance = InstanceType<typeof _TabPane>;
export * from './type';

const Tab = Object.assign(_Tab, {
  install: (app: App) => {
    app.component('Yc' + _Tab.name, _Tab);
    app.component('Yc' + _TabPane.name, _TabPane);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcTab: typeof Tab;
    YcTabPane: typeof _TabPane;
  }
}

export default Tab;
