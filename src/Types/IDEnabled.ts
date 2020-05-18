export type IDEnabled = {
    id: string;
}; // If we make this an interface, eslint complains about the ID.

export function isIDEnabled(value: unknown): value is IDEnabled {
    const casted = value as IDEnabled;
    return casted.id !== undefined;
}
