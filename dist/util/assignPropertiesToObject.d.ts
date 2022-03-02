import { Draft } from 'immer';
export declare function assignPropertiesToObject<T>(draft: Draft<T>, dataToAssign: Partial<T>, assignNullable?: boolean): void;
