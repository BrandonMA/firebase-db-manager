import { Record } from 'immutable';
export type DataHolder<DataType> = Record<DataType> & Readonly<DataType>;
