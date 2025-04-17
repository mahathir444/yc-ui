import { App } from 'vue';
import _Col from './GridCol.vue';
import _Row from './GridRow.vue';
import _Grid from './Grid.vue';
export type RowInstance = InstanceType<typeof _Row>;
export type ColInstance = InstanceType<typeof _Col>;
export * from './type';

const Grid = Object.assign(_Grid, {
  install: (app: App) => {
    app.component('Yc' + _Row.name, _Row);
    app.component('Yc' + _Col.name, _Col);
  },
});

export { _Col as GridCol, _Row as GridRow };

declare module 'vue' {
  export interface GlobalComponents {
    YcCol: typeof _Col;
    YcRow: typeof _Row;
  }
}

export default Grid;
