import { Draft } from 'immer';
export declare function assignPropertiesToObject<T extends object>(draft: Draft<T>, dataToAssign: Partial<T>, assignNullable?: boolean): void;
