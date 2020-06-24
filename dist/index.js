import { decode, encode } from 'base-64';
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}
export * from './Models';
export * from './Types';
//# sourceMappingURL=index.js.map