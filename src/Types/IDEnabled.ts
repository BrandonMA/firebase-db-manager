export interface IDEnabled {
    id: string;
}

export function isIDEnabled(value: unknown): value is IDEnabled {
    const casted = value as IDEnabled;
    return casted.id !== undefined;
}
