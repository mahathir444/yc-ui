import { App } from 'vue';
import _Col from './Col.vue';
import _Row from './Col.vue';
import { getComponentPrefix } from '@shared/utils';

export type RowInstance = InstanceType<typeof _Row>;
export type ColInstance = InstanceType<typeof _Col>;
export * from './type';

const Grid = Object.assign(_Row, {
  install: (app: App) => {
    // app.component(getComponentPrefix() + _Row.name, _Row);
    app.component(getComponentPrefix() + _Col.name, _Col);
  },
});

export { _Col as Col, _Row as Row };

declare module 'vue' {
  export interface GlobalComponents {
    YcCol: typeof _Col;
    YcRow: typeof _Row;
  }
}

export default Grid;
