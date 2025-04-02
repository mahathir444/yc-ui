import { ClientStorage } from 'lyc-storage';

const ss = new ClientStorage('session');
const ls = new ClientStorage('local');
window.ls = ls;
window.ss = ss;

declare global {
  export interface Window {
    ls: typeof ls;
    ss: typeof ss;
  }
}
