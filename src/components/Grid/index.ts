import { App } from 'vue';
import _Col from './Col.vue';
import _Row from './Col.vue';
('Yc');

export type RowInstance = InstanceType<typeof _Row>;
export type ColInstance = InstanceType<typeof _Col>;
export * from './type';

const Grid = Object.assign(_Row, {
  install: (app: App) => {
    // app.component('Yc' + _Row.name, _Row);
    app.component('Yc' + _Col.name, _Col);
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
